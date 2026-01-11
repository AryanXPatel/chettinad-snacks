// Shopify Storefront API Client

// Re-export types for convenience
export type { TransformedProduct, ShopifyCart, ShopifyCollection, CartLine } from './types';

import { GraphQLClient } from 'graphql-request';
import {
    ShopifyProduct,
    ShopifyCollection,
    ShopifyCart,
    TransformedProduct,
    ProductsResponse,
    ProductByHandleResponse,
    CollectionsResponse,
    CollectionByHandleResponse,
    CartCreateResponse,
    CartLinesAddResponse,
    CartLinesUpdateResponse,
    CartLinesRemoveResponse,
    CartResponse,
} from './types';
import {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_HANDLE,
    GET_PRODUCTS_BY_COLLECTION,
    GET_ALL_COLLECTIONS,
    CREATE_CART,
    ADD_TO_CART,
    UPDATE_CART_LINES,
    REMOVE_FROM_CART,
    GET_CART,
} from './queries';

// Environment variables
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2025-10';

// Validate environment
if (!domain) {
    console.warn('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not set');
}
if (!storefrontAccessToken) {
    console.warn('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not set');
}

// Clean domain (remove https:// if present)
const cleanDomain = domain?.replace(/^https?:\/\//, '').replace(/\/$/, '');

// GraphQL endpoint
const endpoint = cleanDomain
    ? `https://${cleanDomain}/api/${apiVersion}/graphql.json`
    : '';

// Create GraphQL client
export const shopifyClient = endpoint && storefrontAccessToken
    ? new GraphQLClient(endpoint, {
        headers: {
            'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
            'Content-Type': 'application/json',
        },
    })
    : null;

// Category color mapping based on product type
const categoryColorMap: Record<string, { bgColor: string; accentColor: string }> = {
    'Murukku': { bgColor: '#FFE082', accentColor: '#F0AD4E' },
    'Sweet': { bgColor: '#E1BEE7', accentColor: '#8E24AA' },
    'Seedai': { bgColor: '#B2DFDB', accentColor: '#00695C' },
    'Thattai': { bgColor: '#DCEDC8', accentColor: '#558B2F' },
    'Mixer': { bgColor: '#FFECB3', accentColor: '#FF6F00' },
};

// Transform Shopify product to internal format
export function transformProduct(product: ShopifyProduct): TransformedProduct {
    const productType = product.productType || 'Murukku';
    const colors = categoryColorMap[productType] || { bgColor: '#FFE082', accentColor: '#F0AD4E' };

    // Determine category from product type
    let category: 'Murukku' | 'Sweet' | 'Seedai' = 'Murukku';
    if (productType.toLowerCase().includes('sweet') || productType === 'Sweet') {
        category = 'Sweet';
    } else if (productType.toLowerCase().includes('seedai') || productType === 'Seedai') {
        category = 'Seedai';
    }

    // Check for badges from tags
    let badge: string | undefined;
    if (product.tags.includes('best-seller')) badge = 'Best Seller';
    else if (product.tags.includes('new')) badge = 'New';
    else if (product.tags.includes('premium')) badge = 'Premium';

    const firstVariant = product.variants.edges[0]?.node;
    const price = parseFloat(firstVariant?.price.amount || product.priceRange.minVariantPrice.amount);
    const compareAtPrice = firstVariant?.compareAtPrice
        ? parseFloat(firstVariant.compareAtPrice.amount)
        : undefined;

    return {
        id: product.handle,
        shopifyId: product.id,
        slug: product.handle,
        title: product.title,
        description: product.description,
        descriptionHtml: product.descriptionHtml,
        price,
        compareAtPrice: compareAtPrice && compareAtPrice > price ? compareAtPrice : undefined,
        image: product.featuredImage?.url || '/images/placeholder.png',
        images: product.images.edges.map(edge => edge.node.url),
        category,
        bgColor: colors.bgColor,
        accentColor: colors.accentColor,
        badge,
        availableForSale: product.availableForSale,
        variants: product.variants.edges.map(edge => ({
            id: edge.node.id,
            title: edge.node.title,
            price: parseFloat(edge.node.price.amount),
            available: edge.node.availableForSale,
        })),
        tags: product.tags,
    };
}

// API Functions

export async function getAllProducts(): Promise<TransformedProduct[]> {
    if (!shopifyClient) {
        console.warn('Shopify client not initialized, returning empty products');
        return [];
    }

    try {
        const data = await shopifyClient.request<ProductsResponse>(GET_ALL_PRODUCTS, { first: 50 });
        return data.products.edges.map(edge => transformProduct(edge.node));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function getProductByHandle(handle: string): Promise<TransformedProduct | null> {
    if (!shopifyClient) {
        console.warn('Shopify client not initialized');
        return null;
    }

    try {
        const data = await shopifyClient.request<ProductByHandleResponse>(GET_PRODUCT_BY_HANDLE, { handle });
        return data.product ? transformProduct(data.product) : null;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export async function getProductsByCollection(collectionHandle: string): Promise<TransformedProduct[]> {
    if (!shopifyClient) {
        console.warn('Shopify client not initialized');
        return [];
    }

    try {
        const data = await shopifyClient.request<CollectionByHandleResponse>(GET_PRODUCTS_BY_COLLECTION, {
            handle: collectionHandle,
            first: 50
        });
        if (!data.collection) return [];
        return data.collection.products.edges.map(edge => transformProduct(edge.node));
    } catch (error) {
        console.error('Error fetching collection products:', error);
        return [];
    }
}

export async function getAllCollections(): Promise<ShopifyCollection[]> {
    if (!shopifyClient) {
        console.warn('Shopify client not initialized');
        return [];
    }

    try {
        const data = await shopifyClient.request<CollectionsResponse>(GET_ALL_COLLECTIONS, { first: 20 });
        return data.collections.edges.map(edge => edge.node);
    } catch (error) {
        console.error('Error fetching collections:', error);
        return [];
    }
}

// Cart Functions

export async function createCart(variantId?: string, quantity: number = 1): Promise<ShopifyCart | null> {
    if (!shopifyClient) {
        console.warn('Shopify client not initialized');
        return null;
    }

    try {
        const input = variantId ? {
            lines: [{ merchandiseId: variantId, quantity }]
        } : {};

        const data = await shopifyClient.request<CartCreateResponse>(CREATE_CART, { input });

        if (data.cartCreate.userErrors.length > 0) {
            console.error('Cart creation errors:', data.cartCreate.userErrors);
            return null;
        }

        return data.cartCreate.cart;
    } catch (error) {
        console.error('Error creating cart:', error);
        return null;
    }
}

export async function addToCart(
    cartId: string,
    variantId: string,
    quantity: number = 1
): Promise<ShopifyCart | null> {
    if (!shopifyClient) {
        console.warn('Shopify client not initialized');
        return null;
    }

    try {
        const data = await shopifyClient.request<CartLinesAddResponse>(ADD_TO_CART, {
            cartId,
            lines: [{ merchandiseId: variantId, quantity }]
        });

        if (data.cartLinesAdd.userErrors.length > 0) {
            console.error('Add to cart errors:', data.cartLinesAdd.userErrors);
            return null;
        }

        return data.cartLinesAdd.cart;
    } catch (error) {
        console.error('Error adding to cart:', error);
        return null;
    }
}

export async function updateCartLine(
    cartId: string,
    lineId: string,
    quantity: number
): Promise<ShopifyCart | null> {
    if (!shopifyClient) {
        console.warn('Shopify client not initialized');
        return null;
    }

    try {
        const data = await shopifyClient.request<CartLinesUpdateResponse>(UPDATE_CART_LINES, {
            cartId,
            lines: [{ id: lineId, quantity }]
        });

        if (data.cartLinesUpdate.userErrors.length > 0) {
            console.error('Update cart errors:', data.cartLinesUpdate.userErrors);
            return null;
        }

        return data.cartLinesUpdate.cart;
    } catch (error) {
        console.error('Error updating cart:', error);
        return null;
    }
}

export async function removeFromCart(
    cartId: string,
    lineIds: string[]
): Promise<ShopifyCart | null> {
    if (!shopifyClient) {
        console.warn('Shopify client not initialized');
        return null;
    }

    try {
        const data = await shopifyClient.request<CartLinesRemoveResponse>(REMOVE_FROM_CART, {
            cartId,
            lineIds
        });

        if (data.cartLinesRemove.userErrors.length > 0) {
            console.error('Remove from cart errors:', data.cartLinesRemove.userErrors);
            return null;
        }

        return data.cartLinesRemove.cart;
    } catch (error) {
        console.error('Error removing from cart:', error);
        return null;
    }
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
    if (!shopifyClient) {
        console.warn('Shopify client not initialized');
        return null;
    }

    try {
        const data = await shopifyClient.request<CartResponse>(GET_CART, { cartId });
        return data.cart;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return null;
    }
}

// Export a check for Shopify availability
export function isShopifyEnabled(): boolean {
    return process.env.NEXT_PUBLIC_USE_SHOPIFY === 'true' && !!shopifyClient;
}
