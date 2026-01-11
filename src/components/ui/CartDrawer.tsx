'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart';
import { IconClose, IconParty, IconLock } from '@/components/ui/Icons';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
    const { items, updateQuantity, removeItem, total, itemCount, isOpen, setIsOpen, checkoutUrl } = useCart();

    const shipping = total >= 799 ? 0 : 60;
    const freeShippingThreshold = 799;
    const progressPercentage = Math.min((total / freeShippingThreshold) * 100, 100);
    const amountToFreeShipping = Math.max(freeShippingThreshold - total, 0);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, setIsOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer */}
                    <motion.div
                        className={styles.drawer}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        {/* Header */}
                        <div className={styles.header}>
                            <h2>Your Cart ({itemCount})</h2>
                            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                                <IconClose size={24} />
                            </button>
                        </div>

                        {/* Free Shipping Progress */}
                        <div className={styles.shippingProgress}>
                            {amountToFreeShipping > 0 ? (
                                <p>Add ₹{amountToFreeShipping} more for <strong>FREE shipping!</strong></p>
                            ) : (
                                <p><IconParty size={14} style={{ color: 'var(--color-turmeric)' }} /> <strong>You've unlocked free shipping!</strong></p>
                            )}
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }} />
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className={styles.items}>
                            {items.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <p>Your cart is empty</p>
                                    <Link href="/shop" className="btn-pop btn-pop--small" onClick={() => setIsOpen(false)}>
                                        Start Shopping
                                    </Link>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={`${item.product.id}-${item.packSize}`} className={styles.item}>
                                        <div className={styles.itemImage} style={{ backgroundColor: item.product.bgColor }}>
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.title}
                                                width={70}
                                                height={70}
                                            />
                                        </div>
                                        <div className={styles.itemDetails}>
                                            <h4>{item.product.title}</h4>
                                            <p className={styles.itemMeta}>{item.packSize}</p>
                                            <div className={styles.itemActions}>
                                                <div className={styles.quantityControl}>
                                                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>−</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                                                </div>
                                                <span className={styles.itemPrice}>₹{item.product.price * item.quantity}</span>
                                            </div>
                                        </div>
                                        <button className={styles.removeBtn} onClick={() => removeItem(item.product.id)}>×</button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className={styles.footer}>
                                <div className={styles.subtotal}>
                                    <span>Subtotal</span>
                                    <span>₹{total}</span>
                                </div>
                                <div className={styles.shippingRow}>
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                                </div>
                                <div className={styles.totalRow}>
                                    <span>Total</span>
                                    <span>₹{total + shipping}</span>
                                </div>
                                <button
                                    className="btn-pop"
                                    style={{ width: '100%', marginTop: '1rem' }}
                                    onClick={() => {
                                        setIsOpen(false);
                                        if (checkoutUrl) {
                                            // Go directly to Shopify checkout
                                            window.location.href = checkoutUrl;
                                        } else {
                                            // Fallback to cart page
                                            window.location.href = '/cart';
                                        }
                                    }}
                                >
                                    Checkout
                                </button>
                                <Link
                                    href="/cart"
                                    className={styles.viewCartLink}
                                    onClick={() => setIsOpen(false)}
                                >
                                    View Full Cart
                                </Link>
                                <div className={styles.secure}>
                                    <IconLock size={12} /> Secure Checkout
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
