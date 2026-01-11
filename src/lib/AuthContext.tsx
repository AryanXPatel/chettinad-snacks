'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
    ShopifyCustomer,
    CustomerAccessToken,
    loginCustomer as apiLogin,
    logoutCustomer as apiLogout,
    createCustomer as apiCreateCustomer,
    getCustomer,
    renewAccessToken,
} from './shopify/auth';
import { isShopifyEnabled } from './shopify';

// Storage keys
const TOKEN_KEY = 'shopify_customer_token';
const TOKEN_EXPIRY_KEY = 'shopify_customer_token_expiry';

interface AuthContextType {
    customer: ShopifyCustomer | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    accessToken: string | null;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    signup: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ success: boolean; error?: string }>;
    refreshCustomer: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [customer, setCustomer] = useState<ShopifyCustomer | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Save token to localStorage
    const saveToken = useCallback((token: CustomerAccessToken) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_KEY, token.accessToken);
            localStorage.setItem(TOKEN_EXPIRY_KEY, token.expiresAt);
        }
        setAccessToken(token.accessToken);
    }, []);

    // Clear token from localStorage
    const clearToken = useCallback(() => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(TOKEN_EXPIRY_KEY);
        }
        setAccessToken(null);
        setCustomer(null);
    }, []);

    // Check if token is expired
    const isTokenExpired = useCallback((expiresAt: string): boolean => {
        const expiry = new Date(expiresAt);
        const now = new Date();
        // Consider expired if less than 5 minutes left
        return expiry.getTime() - now.getTime() < 5 * 60 * 1000;
    }, []);

    // Load customer on mount
    useEffect(() => {
        const loadCustomer = async () => {
            if (!isShopifyEnabled()) {
                setIsLoading(false);
                return;
            }

            const storedToken = localStorage.getItem(TOKEN_KEY);
            const storedExpiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

            if (!storedToken || !storedExpiry) {
                setIsLoading(false);
                return;
            }

            // Check if token is expired
            if (isTokenExpired(storedExpiry)) {
                // Try to renew
                const renewedToken = await renewAccessToken(storedToken);
                if (!renewedToken) {
                    clearToken();
                    setIsLoading(false);
                    return;
                }
                saveToken(renewedToken);
            } else {
                setAccessToken(storedToken);
            }

            // Fetch customer data
            const customerData = await getCustomer(storedToken);
            if (customerData) {
                setCustomer(customerData);
            } else {
                // Token might be invalid
                clearToken();
            }

            setIsLoading(false);
        };

        loadCustomer();
    }, [clearToken, saveToken, isTokenExpired]);

    // Login function
    const login = useCallback(async (email: string, password: string) => {
        if (!isShopifyEnabled()) {
            return { success: false, error: 'Shopify not configured' };
        }

        const result = await apiLogin(email, password);

        if (result.success && result.accessToken) {
            saveToken(result.accessToken);
            if (result.customer) {
                setCustomer(result.customer);
            }
            return { success: true };
        }

        return { success: false, error: result.error || 'Login failed' };
    }, [saveToken]);

    // Logout function
    const logout = useCallback(async () => {
        if (accessToken) {
            await apiLogout(accessToken);
        }
        clearToken();
    }, [accessToken, clearToken]);

    // Signup function
    const signup = useCallback(async (
        email: string,
        password: string,
        firstName?: string,
        lastName?: string
    ) => {
        if (!isShopifyEnabled()) {
            return { success: false, error: 'Shopify not configured' };
        }

        // Create the customer
        const createResult = await apiCreateCustomer(email, password, firstName, lastName);

        if (!createResult.success) {
            return { success: false, error: createResult.error };
        }

        // Auto-login after signup
        const loginResult = await apiLogin(email, password);

        if (loginResult.success && loginResult.accessToken) {
            saveToken(loginResult.accessToken);
            if (loginResult.customer) {
                setCustomer(loginResult.customer);
            }
            return { success: true };
        }

        // Customer created but login failed - still a success
        return { success: true };
    }, [saveToken]);

    // Refresh customer data
    const refreshCustomer = useCallback(async () => {
        if (!accessToken) return;

        const customerData = await getCustomer(accessToken);
        if (customerData) {
            setCustomer(customerData);
        }
    }, [accessToken]);

    const value: AuthContextType = {
        customer,
        isLoggedIn: !!customer,
        isLoading,
        accessToken,
        login,
        logout,
        signup,
        refreshCustomer,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
