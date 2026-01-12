'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import {
    createCart,
    addToCart as shopifyAddToCart,
    updateCartLine,
    removeFromCart as shopifyRemoveFromCart,
    getCart,
    isShopifyEnabled,
    ShopifyCart,
    CartLine,
    TransformedProduct
} from './shopify';
import { Product } from './products';

// Cart item that works with both static and Shopify data
export interface CartItem {
    product: Product | TransformedProduct;
    quantity: number;
    packSize: string;
    lineId?: string; // Shopify line item ID
    variantId?: string; // Shopify variant ID
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product | TransformedProduct, quantity?: number, packSize?: string, variantId?: string) => Promise<void>;
    removeItem: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    clearCart: () => void;
    total: number;
    itemCount: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    checkoutUrl: string | null;
    isLoading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_ID_KEY = 'chettinad-cart-id';
const CART_ITEMS_KEY = 'chettinad-cart';

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [cartId, setCartId] = useState<string | null>(null);
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Load cart on mount
    useEffect(() => {
        const loadCart = async () => {
            if (isShopifyEnabled()) {
                // Load Shopify cart
                const savedCartId = localStorage.getItem(CART_ID_KEY);
                if (savedCartId) {
                    try {
                        const cart = await getCart(savedCartId);
                        if (cart) {
                            setCartId(cart.id);
                            setCheckoutUrl(cart.checkoutUrl);
                            syncCartItems(cart);
                        } else {
                            // Cart expired or invalid
                            localStorage.removeItem(CART_ID_KEY);
                        }
                    } catch (error) {
                        console.error('Error loading cart:', error);
                        localStorage.removeItem(CART_ID_KEY);
                    }
                }
            } else {
                // Load from localStorage (fallback)
                const saved = localStorage.getItem(CART_ITEMS_KEY);
                if (saved) {
                    try {
                        setItems(JSON.parse(saved));
                    } catch {
                        localStorage.removeItem(CART_ITEMS_KEY);
                    }
                }
            }
        };
        loadCart();
    }, []);

    // Sync cart items from Shopify cart
    const syncCartItems = (cart: ShopifyCart) => {
        const newItems: CartItem[] = cart.lines.edges.map(edge => {
            const line = edge.node;
            return {
                product: {
                    id: line.merchandise.product.handle,
                    slug: line.merchandise.product.handle,
                    title: line.merchandise.product.title,
                    description: '',
                    price: parseFloat(line.merchandise.price.amount),
                    image: line.merchandise.image?.url || line.merchandise.product.featuredImage?.url || '/images/placeholder.png',
                    category: 'Murukku' as const,
                    bgColor: '#FFE082',
                    accentColor: '#F0AD4E',
                },
                quantity: line.quantity,
                packSize: line.merchandise.title || 'Default',
                lineId: line.id,
                variantId: line.merchandise.id,
            };
        });
        setItems(newItems);
    };

    // Save cart to localStorage when not using Shopify
    useEffect(() => {
        if (!isShopifyEnabled()) {
            localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
        }
    }, [items]);

    const addItem = useCallback(async (
        product: Product | TransformedProduct,
        quantity = 1,
        packSize = '250g',
        variantId?: string
    ) => {
        setIsLoading(true);
        try {
            // Auto-detect variantId from product if not provided
            let effectiveVariantId = variantId;
            if (!effectiveVariantId && 'variants' in product && product.variants?.length > 0) {
                effectiveVariantId = product.variants[0].id;
            }

            if (isShopifyEnabled() && effectiveVariantId) {
                // Use Shopify Cart API
                let cart: ShopifyCart | null;

                if (!cartId) {
                    // Create new cart
                    cart = await createCart(effectiveVariantId, quantity);
                    if (cart) {
                        setCartId(cart.id);
                        localStorage.setItem(CART_ID_KEY, cart.id);
                        setCheckoutUrl(cart.checkoutUrl);
                        syncCartItems(cart);
                    }
                } else {
                    // Add to existing cart
                    cart = await shopifyAddToCart(cartId, effectiveVariantId, quantity);
                    if (cart) {
                        setCheckoutUrl(cart.checkoutUrl);
                        syncCartItems(cart);
                    }
                }
            } else {
                // Fallback to local state
                setItems(prev => {
                    const existingIndex = prev.findIndex(
                        item => item.product.id === product.id && item.packSize === packSize
                    );

                    if (existingIndex > -1) {
                        const updated = [...prev];
                        updated[existingIndex].quantity += quantity;
                        return updated;
                    }

                    return [...prev, { product, quantity, packSize, variantId: effectiveVariantId }];
                });
            }
        } catch (error) {
            console.error('Error adding item:', error);
        } finally {
            setIsLoading(false);
        }
    }, [cartId]);

    const removeItem = useCallback(async (productId: string) => {
        setIsLoading(true);
        try {
            const item = items.find(i => i.product.id === productId);

            if (isShopifyEnabled() && cartId && item?.lineId) {
                const cart = await shopifyRemoveFromCart(cartId, [item.lineId]);
                if (cart) {
                    setCheckoutUrl(cart.checkoutUrl);
                    syncCartItems(cart);
                }
            } else {
                setItems(prev => prev.filter(item => item.product.id !== productId));
            }
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setIsLoading(false);
        }
    }, [cartId, items]);

    const updateQuantity = useCallback(async (productId: string, quantity: number) => {
        if (quantity <= 0) {
            await removeItem(productId);
            return;
        }

        setIsLoading(true);
        try {
            const item = items.find(i => i.product.id === productId);

            if (isShopifyEnabled() && cartId && item?.lineId) {
                const cart = await updateCartLine(cartId, item.lineId, quantity);
                if (cart) {
                    setCheckoutUrl(cart.checkoutUrl);
                    syncCartItems(cart);
                }
            } else {
                setItems(prev =>
                    prev.map(item =>
                        item.product.id === productId
                            ? { ...item, quantity }
                            : item
                    )
                );
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            setIsLoading(false);
        }
    }, [cartId, items, removeItem]);

    const clearCart = useCallback(() => {
        setItems([]);
        setCartId(null);
        setCheckoutUrl(null);
        localStorage.removeItem(CART_ID_KEY);
        localStorage.removeItem(CART_ITEMS_KEY);
    }, []);

    const total = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                total,
                itemCount,
                isOpen,
                setIsOpen,
                checkoutUrl,
                isLoading,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
