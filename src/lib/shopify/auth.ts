// Shopify Customer Authentication Functions
import { shopifyClient } from './index';
import {
    CUSTOMER_CREATE,
    CUSTOMER_ACCESS_TOKEN_CREATE,
    CUSTOMER_ACCESS_TOKEN_DELETE,
    CUSTOMER_RECOVER,
    CUSTOMER_QUERY,
    CUSTOMER_UPDATE,
    CUSTOMER_ACCESS_TOKEN_RENEW,
    CUSTOMER_RESET_BY_URL,
} from './auth-queries';

// Types
export interface ShopifyCustomer {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    acceptsMarketing: boolean;
    createdAt?: string;
    defaultAddress?: {
        id: string;
        address1: string;
        address2: string | null;
        city: string;
        province: string;
        country: string;
        zip: string;
        phone: string | null;
    } | null;
    orders?: {
        edges: Array<{
            node: {
                id: string;
                orderNumber: number;
                processedAt: string;
                financialStatus: string;
                fulfillmentStatus: string;
                totalPrice: {
                    amount: string;
                    currencyCode: string;
                };
                lineItems: {
                    edges: Array<{
                        node: {
                            title: string;
                            quantity: number;
                        };
                    }>;
                };
            };
        }>;
    };
}

export interface CustomerAccessToken {
    accessToken: string;
    expiresAt: string;
}

export interface AuthResult {
    success: boolean;
    customer?: ShopifyCustomer;
    accessToken?: CustomerAccessToken;
    error?: string;
}

// Create a new customer (signup)
export async function createCustomer(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    acceptsMarketing: boolean = false
): Promise<AuthResult> {
    if (!shopifyClient) {
        return { success: false, error: 'Shopify client not configured' };
    }

    try {
        const response = await shopifyClient.request<{
            customerCreate: {
                customer: ShopifyCustomer | null;
                customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
            };
        }>(CUSTOMER_CREATE, {
            input: {
                email,
                password,
                firstName: firstName || null,
                lastName: lastName || null,
                acceptsMarketing,
            },
        });

        const { customer, customerUserErrors } = response.customerCreate;

        if (customerUserErrors.length > 0) {
            const errorMessage = customerUserErrors.map(e => e.message).join(', ');
            return { success: false, error: errorMessage };
        }

        if (!customer) {
            return { success: false, error: 'Failed to create customer' };
        }

        return { success: true, customer };
    } catch (error) {
        console.error('Error creating customer:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

// Login customer and get access token
export async function loginCustomer(
    email: string,
    password: string
): Promise<AuthResult> {
    if (!shopifyClient) {
        return { success: false, error: 'Shopify client not configured' };
    }

    try {
        const response = await shopifyClient.request<{
            customerAccessTokenCreate: {
                customerAccessToken: CustomerAccessToken | null;
                customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
            };
        }>(CUSTOMER_ACCESS_TOKEN_CREATE, {
            input: {
                email,
                password,
            },
        });

        const { customerAccessToken, customerUserErrors } = response.customerAccessTokenCreate;

        if (customerUserErrors.length > 0) {
            const errorMessage = customerUserErrors.map(e => e.message).join(', ');
            return { success: false, error: errorMessage };
        }

        if (!customerAccessToken) {
            return { success: false, error: 'Invalid email or password' };
        }

        // Get customer details
        const customer = await getCustomer(customerAccessToken.accessToken);

        return {
            success: true,
            accessToken: customerAccessToken,
            customer: customer || undefined,
        };
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

// Logout - Delete access token
export async function logoutCustomer(accessToken: string): Promise<boolean> {
    if (!shopifyClient) return false;

    try {
        await shopifyClient.request(CUSTOMER_ACCESS_TOKEN_DELETE, {
            customerAccessToken: accessToken,
        });
        return true;
    } catch (error) {
        console.error('Error logging out:', error);
        return false;
    }
}

// Send password recovery email
export async function recoverCustomer(email: string): Promise<AuthResult> {
    if (!shopifyClient) {
        return { success: false, error: 'Shopify client not configured' };
    }

    try {
        const response = await shopifyClient.request<{
            customerRecover: {
                customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
            };
        }>(CUSTOMER_RECOVER, {
            email,
        });

        const { customerUserErrors } = response.customerRecover;

        if (customerUserErrors.length > 0) {
            const errorMessage = customerUserErrors.map(e => e.message).join(', ');
            return { success: false, error: errorMessage };
        }

        return { success: true };
    } catch (error) {
        console.error('Error sending recovery email:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

// Get customer details with access token
export async function getCustomer(accessToken: string): Promise<ShopifyCustomer | null> {
    if (!shopifyClient) return null;

    try {
        const response = await shopifyClient.request<{
            customer: ShopifyCustomer | null;
        }>(CUSTOMER_QUERY, {
            customerAccessToken: accessToken,
        });

        return response.customer;
    } catch (error) {
        console.error('Error fetching customer:', error);
        return null;
    }
}

// Update customer details
export async function updateCustomer(
    accessToken: string,
    updates: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        acceptsMarketing?: boolean;
    }
): Promise<AuthResult> {
    if (!shopifyClient) {
        return { success: false, error: 'Shopify client not configured' };
    }

    try {
        const response = await shopifyClient.request<{
            customerUpdate: {
                customer: ShopifyCustomer | null;
                customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
            };
        }>(CUSTOMER_UPDATE, {
            customerAccessToken: accessToken,
            customer: updates,
        });

        const { customer, customerUserErrors } = response.customerUpdate;

        if (customerUserErrors.length > 0) {
            const errorMessage = customerUserErrors.map(e => e.message).join(', ');
            return { success: false, error: errorMessage };
        }

        return { success: true, customer: customer || undefined };
    } catch (error) {
        console.error('Error updating customer:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

// Renew access token to extend session
export async function renewAccessToken(accessToken: string): Promise<CustomerAccessToken | null> {
    if (!shopifyClient) return null;

    try {
        const response = await shopifyClient.request<{
            customerAccessTokenRenew: {
                customerAccessToken: CustomerAccessToken | null;
                userErrors: Array<{ field: string; message: string }>;
            };
        }>(CUSTOMER_ACCESS_TOKEN_RENEW, {
            customerAccessToken: accessToken,
        });

        return response.customerAccessTokenRenew.customerAccessToken;
    } catch (error) {
        console.error('Error renewing token:', error);
        return null;
    }
}

// Reset password using URL from email link
export async function resetCustomerPasswordByUrl(
    resetUrl: string,
    password: string
): Promise<AuthResult> {
    if (!shopifyClient) {
        return { success: false, error: 'Shopify client not configured' };
    }

    try {
        const response = await shopifyClient.request<{
            customerResetByUrl: {
                customer: ShopifyCustomer | null;
                customerAccessToken: CustomerAccessToken | null;
                customerUserErrors: Array<{ code: string; field: string[]; message: string }>;
            };
        }>(CUSTOMER_RESET_BY_URL, {
            resetUrl,
            password,
        });

        const { customer, customerAccessToken, customerUserErrors } = response.customerResetByUrl;

        if (customerUserErrors.length > 0) {
            const errorMessage = customerUserErrors.map(e => e.message).join(', ');
            return { success: false, error: errorMessage };
        }

        if (!customer) {
            return { success: false, error: 'Failed to reset password. The reset link may have expired.' };
        }

        return {
            success: true,
            customer,
            accessToken: customerAccessToken || undefined,
        };
    } catch (error) {
        console.error('Error resetting password:', error);
        return { success: false, error: 'An unexpected error occurred. Please try again.' };
    }
}
