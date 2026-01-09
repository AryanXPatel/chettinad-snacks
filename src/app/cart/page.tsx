'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { IconParty, IconLock } from '@/components/ui/Icons';
import styles from './page.module.css';

export default function CartPage() {
    const { items, updateQuantity, removeItem, total, itemCount } = useCart();

    const shipping = total >= 799 ? 0 : 60;
    const freeShippingThreshold = 799;
    const progressPercentage = Math.min((total / freeShippingThreshold) * 100, 100);
    const amountToFreeShipping = Math.max(freeShippingThreshold - total, 0);

    if (items.length === 0) {
        return (
            <div className="container section-padding-lg text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ marginBottom: '1rem' }}>Your Cart is Empty</h1>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>Looks like you haven't added any cravings yet!</p>
                    <Link href="/shop" className="btn-pop">Start Shopping</Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container section-padding">
            <h1>Your Cart</h1>

            {/* Free Shipping Progress */}
            <div className={styles.shippingProgress}>
                {amountToFreeShipping > 0 ? (
                    <p><strong>Free Shipping:</strong> You're ₹{amountToFreeShipping} away from free shipping!</p>
                ) : (
                    <p><strong><IconParty size={16} style={{ color: 'var(--color-turmeric)' }} /> Congrats!</strong> You've unlocked free shipping!</p>
                )}
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }} />
                </div>
            </div>

            <div className={styles.cartGrid}>
                {/* Cart Items */}
                <div className={styles.cartItems}>
                    {items.map((item, index) => (
                        <motion.div
                            key={`${item.product.id}-${item.packSize}`}
                            className={styles.cartItem}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={styles.itemImage} style={{ backgroundColor: item.product.bgColor }}>
                                <Image
                                    src={item.product.image}
                                    alt={item.product.title}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className={styles.itemDetails}>
                                <div className={styles.itemHeader}>
                                    <h3>{item.product.title}</h3>
                                    <span className={styles.itemPrice}>₹{item.product.price * item.quantity}</span>
                                </div>
                                <p className={styles.itemMeta}>Pack: {item.packSize}</p>
                                <div className={styles.itemActions}>
                                    <div className={styles.quantityControl}>
                                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>−</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeItem(item.product.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <div style={{ marginTop: '2rem' }}>
                        <Link href="/wishlist" className={styles.wishlistLink}>
                            View Your Wishlist →
                        </Link>
                    </div>
                </div>

                {/* Order Summary */}
                <motion.div
                    className={styles.summaryCard}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h3 style={{ marginBottom: '1.5rem' }}>Order Summary</h3>

                    <div className={styles.summaryRow}>
                        <span>Subtotal ({itemCount} items)</span>
                        <span>₹{total}</span>
                    </div>

                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                    </div>

                    <div className={styles.summaryTotal}>
                        <span>Total</span>
                        <span>₹{total + shipping}</span>
                    </div>

                    <button className="btn-pop" style={{ width: '100%' }}>
                        Checkout
                    </button>

                    <div className={styles.secureNote}>
                        <IconLock size={14} /> Secure Checkout
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
