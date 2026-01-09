'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';

export default function ShippingPage() {
    return (
        <div className="container section-padding-lg">
            <motion.div
                className={styles.policyHeader}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Shipping Policy</h1>
                <p className={styles.lastUpdated}>Last updated: January 2026</p>
            </motion.div>

            <div className={styles.policyContent}>
                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2>📦 Delivery Zones</h2>
                    <p>We currently ship across India. International shipping is coming soon!</p>

                    <div className={styles.zoneGrid}>
                        <div className={styles.zoneCard}>
                            <h3>South India</h3>
                            <p className={styles.zoneTime}>2-4 Business Days</p>
                            <p>Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana</p>
                        </div>
                        <div className={styles.zoneCard}>
                            <h3>Metro Cities</h3>
                            <p className={styles.zoneTime}>3-5 Business Days</p>
                            <p>Mumbai, Delhi, Kolkata, Pune, Hyderabad, Bangalore</p>
                        </div>
                        <div className={styles.zoneCard}>
                            <h3>Rest of India</h3>
                            <p className={styles.zoneTime}>5-7 Business Days</p>
                            <p>All other states and union territories</p>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2>💰 Shipping Charges</h2>
                    <div className={styles.shippingTable}>
                        <div className={styles.tableRow}>
                            <span>Orders below ₹499</span>
                            <span className={styles.price}>₹49</span>
                        </div>
                        <div className={styles.tableRow}>
                            <span>Orders ₹499 - ₹999</span>
                            <span className={styles.price}>₹29</span>
                        </div>
                        <div className={`${styles.tableRow} ${styles.highlighted}`}>
                            <span>Orders above ₹999</span>
                            <span className={styles.freeTag}>FREE SHIPPING</span>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2>🚚 Order Processing</h2>
                    <ul className={styles.list}>
                        <li>All orders placed before <strong>2 PM IST</strong> are processed the same business day.</li>
                        <li>Orders placed after 2 PM or on weekends/holidays will be processed the next business day.</li>
                        <li>You will receive a tracking number via email once your order ships.</li>
                        <li>During festive seasons, delivery may take an additional 2-3 days.</li>
                    </ul>
                </motion.section>

                <motion.section
                    className={styles.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2>📞 Need Help?</h2>
                    <p>
                        If you have any questions about your delivery, please{' '}
                        <Link href="/contact" className={styles.link}>contact our support team</Link>.
                        We{"'"}re here to help you get your snacks on time!
                    </p>
                </motion.section>
            </div>
        </div>
    );
}
