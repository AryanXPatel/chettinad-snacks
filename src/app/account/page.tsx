'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import styles from './page.module.css';

export default function AccountPage() {
    const router = useRouter();
    const { customer, isLoggedIn, isLoading, logout } = useAuth();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push('/login');
        }
    }, [isLoading, isLoggedIn, router]);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    if (isLoading) {
        return (
            <div className={styles.accountPage}>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    if (!customer) {
        return null;
    }

    // Get display name
    const displayName = customer.firstName
        ? `${customer.firstName}${customer.lastName ? ' ' + customer.lastName : ''}`
        : customer.email;

    return (
        <div className={styles.accountPage}>
            <div className="container">
                <motion.div
                    className={styles.accountHeader}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>Welcome, {customer.firstName || 'there'}!</h1>
                    <p>Manage your account and view your orders</p>
                </motion.div>

                <div className={styles.accountGrid}>
                    {/* Profile Card */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2>👤 Profile</h2>
                        <div className={styles.profileInfo}>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Name</span>
                                <span className={styles.value}>{displayName}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Email</span>
                                <span className={styles.value}>{customer.email}</span>
                            </div>
                            {customer.phone && (
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Phone</span>
                                    <span className={styles.value}>{customer.phone}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Orders Card */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2>📦 Recent Orders</h2>
                        {customer.orders && customer.orders.edges.length > 0 ? (
                            <div className={styles.ordersList}>
                                {customer.orders.edges.slice(0, 5).map(({ node: order }) => (
                                    <div key={order.id} className={styles.orderItem}>
                                        <div className={styles.orderHeader}>
                                            <span className={styles.orderNumber}>Order #{order.orderNumber}</span>
                                            <span className={styles.orderDate}>
                                                {new Date(order.processedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className={styles.orderDetails}>
                                            <span className={styles.orderStatus}>{order.fulfillmentStatus || 'Processing'}</span>
                                            <span className={styles.orderTotal}>
                                                ₹{parseFloat(order.totalPrice.amount).toFixed(0)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyOrders}>
                                <p>No orders yet</p>
                                <Link href="/shop" className="btn-pop">Start Shopping</Link>
                            </div>
                        )}
                    </motion.div>

                    {/* Address Card */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2>🏠 Default Address</h2>
                        {customer.defaultAddress ? (
                            <div className={styles.address}>
                                <p>{customer.defaultAddress.address1}</p>
                                {customer.defaultAddress.address2 && (
                                    <p>{customer.defaultAddress.address2}</p>
                                )}
                                <p>
                                    {customer.defaultAddress.city}, {customer.defaultAddress.province} {customer.defaultAddress.zip}
                                </p>
                                <p>{customer.defaultAddress.country}</p>
                            </div>
                        ) : (
                            <p className={styles.noAddress}>No address saved yet</p>
                        )}
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2>⚡ Quick Actions</h2>
                        <div className={styles.actions}>
                            <Link href="/shop" className={styles.actionBtn}>
                                Continue Shopping
                            </Link>
                            <Link href="/cart" className={styles.actionBtn}>
                                View Cart
                            </Link>
                            <button onClick={handleLogout} className={styles.logoutBtn}>
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
