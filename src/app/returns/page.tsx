'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';

export default function ReturnsPage() {
    return (
        <div className="container section-padding-lg">
            <motion.div
                className={styles.policyHeader}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Returns & Refunds</h1>
                <p className={styles.lastUpdated}>Last updated: January 2026</p>
            </motion.div>

            <div className={styles.policyContent}>
                <motion.div
                    className={styles.guaranteeBanner}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <span className={styles.guaranteeIcon}>🛡️</span>
                    <div>
                        <h3>100% Freshness Guarantee</h3>
                        <p>If your snacks arrive anything less than perfect, we{"'"}ll make it right.</p>
                    </div>
                </motion.div>

                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2>📋 Return Eligibility</h2>
                    <p>We accept returns in the following situations:</p>
                    <ul className={styles.list}>
                        <li><strong>Damaged Products:</strong> If your package arrives damaged or tampered with</li>
                        <li><strong>Wrong Items:</strong> If you received products different from what you ordered</li>
                        <li><strong>Quality Issues:</strong> If the snacks are stale, have off-flavors, or quality concerns</li>
                        <li><strong>Missing Items:</strong> If items are missing from your order</li>
                    </ul>
                </motion.section>

                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2>⏱️ Time Frame</h2>
                    <div className={styles.timelineCard}>
                        <div className={styles.timelineItem}>
                            <span className={styles.timelineDot}></span>
                            <div>
                                <h4>Report Within 48 Hours</h4>
                                <p>Contact us within 48 hours of delivery with photos of the issue</p>
                            </div>
                        </div>
                        <div className={styles.timelineItem}>
                            <span className={styles.timelineDot}></span>
                            <div>
                                <h4>Quick Review</h4>
                                <p>Our team will review your request within 24 hours</p>
                            </div>
                        </div>
                        <div className={styles.timelineItem}>
                            <span className={styles.timelineDot}></span>
                            <div>
                                <h4>Refund or Replacement</h4>
                                <p>Once approved, choose a full refund or free replacement</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2>💳 Refund Process</h2>
                    <ul className={styles.list}>
                        <li>Refunds are processed to the original payment method</li>
                        <li>Bank transfers may take 5-7 business days to reflect</li>
                        <li>UPI/Digital wallet refunds typically appear within 24-48 hours</li>
                        <li>You{"'"}ll receive an email confirmation once the refund is initiated</li>
                    </ul>
                </motion.section>

                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2>🚫 Non-Returnable Items</h2>
                    <p>Due to the nature of food products, we cannot accept returns for:</p>
                    <ul className={styles.listWarning}>
                        <li>Products opened or consumed beyond a reasonable taste test</li>
                        <li>Change of mind or preference after purchase</li>
                        <li>Products stored improperly after delivery</li>
                    </ul>
                </motion.section>

                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h2>📞 How to Request a Return</h2>
                    <p>
                        Simply <Link href="/contact" className={styles.link}>contact us</Link> with your order number
                        and photos of the issue. Our team will guide you through the process and ensure you{"'"}re
                        satisfied with your Chettinad Snacks experience.
                    </p>
                </motion.section>
            </div>
        </div>
    );
}
