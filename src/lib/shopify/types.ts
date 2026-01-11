// Shopify Storefront API Types

export interface ShopifyImage {
    url: string;
    altText: string | null;
    width?: number;
    height?: number;
}

export interface Money {
    amount: string;
    currencyCode: string;
}

export interface PriceRange {
    minVariantPrice: Money;
    maxVariantPrice: Money;
}

export interface ProductVariant {
    id: string;
    title: string;
    availableForSale: boolean;
    quantityAvailable?: number;
    price: Money;
    compareAtPrice: Money | null;
    image?: ShopifyImage;
    selectedOptions: {
        name: string;
        value: string;
    }[];
}

export interface ShopifyProduct {
    id: string;
    handle: string;
    title: string;
    description: string;
    descriptionHtml: string;
    vendor: string;
    productType: string;
    tags: string[];
    availableForSale: boolean;
    priceRange: PriceRange;
    compareAtPriceRange: PriceRange;
    featuredImage: ShopifyImage | null;
    images: {
        edges: { node: ShopifyImage }[];
    };
    variants: {
        edges: { node: ProductVariant }[];
    };
    options: {
        id: string;
        name: string;
        values: string[];
    }[];
}

export interface ShopifyCollection {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: ShopifyImage | null;
    products: {
        edges: { node: ShopifyProduct }[];
    };
}

// Cart Types
export interface CartLine {
    id: string;
    quantity: number;
    merchandise: {
        id: string;
        title: string;
        product: {
            id: string;
            handle: string;
            title: string;
            featuredImage: ShopifyImage | null;
        };
        price: Money;
        image?: ShopifyImage;
    };
}

export interface ShopifyCart {
    id: string;
    checkoutUrl: string;
    cost: {
        subtotalAmount: Money;
        totalAmount: Money;
        totalTaxAmount: Money | null;
    };
    lines: {
        edges: { node: CartLine }[];
    };
    totalQuantity: number;
}

// API Response Types
export interface ProductsResponse {
    products: {
        edges: { node: ShopifyProduct }[];
        pageInfo: {
            hasNextPage: boolean;
            endCursor: string | null;
        };
    };
}

export interface ProductByHandleResponse {
    product: ShopifyProduct | null;
}

export interface CollectionsResponse {
    collections: {
        edges: { node: ShopifyCollection }[];
    };
}

export interface CollectionByHandleResponse {
    collection: ShopifyCollection | null;
}

export interface CartCreateResponse {
    cartCreate: {
        cart: ShopifyCart;
        userErrors: { field: string[]; message: string }[];
    };
}

export interface CartLinesAddResponse {
    cartLinesAdd: {
        cart: ShopifyCart;
        userErrors: { field: string[]; message: string }[];
    };
}

export interface CartLinesUpdateResponse {
    cartLinesUpdate: {
        cart: ShopifyCart;
        userErrors: { field: string[]; message: string }[];
    };
}

export interface CartLinesRemoveResponse {
    cartLinesRemove: {
        cart: ShopifyCart;
        userErrors: { field: string[]; message: string }[];
    };
}

export interface CartResponse {
    cart: ShopifyCart | null;
}

// Transformed types for internal use (matching existing Product interface pattern)
export interface TransformedProduct {
    id: string;
    shopifyId: string;
    slug: string;
    title: string;
    description: string;
    descriptionHtml: string;
    price: number;
    compareAtPrice?: number;
    image: string;
    images: string[];
    category: 'Murukku' | 'Sweet' | 'Seedai';
    bgColor: string;
    accentColor: string;
    badge?: string;
    availableForSale: boolean;
    variants: {
        id: string;
        title: string;
        price: number;
        available: boolean;
    }[];
    tags: string[];
}
