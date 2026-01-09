'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';

export default function TermsPage() {
    return (
        <div className="container section-padding-lg">
            <motion.div
                className={styles.policyHeader}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Terms of Service</h1>
                <p className={styles.lastUpdated}>Effective Date: January 1, 2026</p>
            </motion.div>

            <div className={styles.policyContent}>
                <section className={styles.section}>
                    <h2>1. Agreement to Terms</h2>
                    <p>
                        Welcome to Chettinad Snacks! By accessing or using our website and services,
                        you agree to be bound by these Terms of Service. If you disagree with any part
                        of the terms, you may not access our services.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Use of Our Services</h2>
                    <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                    <ul className={styles.list}>
                        <li>Use the service for any unlawful purpose</li>
                        <li>Attempt to gain unauthorized access to any part of our systems</li>
                        <li>Interfere with or disrupt the service</li>
                        <li>Reproduce, duplicate, or resell any part of our service</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>3. Products and Pricing</h2>
                    <p>
                        All products are subject to availability. We reserve the right to discontinue
                        any product at any time. Prices are subject to change without notice. We make
                        every effort to display accurate pricing, but errors may occur.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>4. Orders and Payment</h2>
                    <ul className={styles.list}>
                        <li>By placing an order, you warrant that you are legally capable of entering into binding contracts</li>
                        <li>We reserve the right to refuse or cancel any order for any reason</li>
                        <li>Payment must be received before order fulfillment</li>
                        <li>All payments are processed securely through our payment partners</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>5. Shipping and Delivery</h2>
                    <p>
                        Delivery times are estimates only. We are not responsible for delays caused by
                        shipping carriers, weather, or other factors beyond our control. Please review
                        our <Link href="/shipping" className={styles.link}>Shipping Policy</Link> for
                        complete details.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>6. Returns and Refunds</h2>
                    <p>
                        Our return policy is designed to ensure your satisfaction. Please review our
                        <Link href="/returns" className={styles.link}> Returns Policy</Link> for
                        eligibility and procedures.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>7. Intellectual Property</h2>
                    <p>
                        All content on this website, including text, graphics, logos, images, and software,
                        is the property of Chettinad Snacks and is protected by intellectual property laws.
                        You may not use, reproduce, or distribute any content without our written permission.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>8. Limitation of Liability</h2>
                    <p>
                        To the fullest extent permitted by law, Chettinad Snacks shall not be liable for
                        any indirect, incidental, special, consequential, or punitive damages arising from
                        your use of our services.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>9. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. Changes will be effective
                        immediately upon posting. Your continued use of our services constitutes acceptance
                        of the modified terms.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>10. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms of Service, please{' '}
                        <Link href="/contact" className={styles.link}>contact us</Link>.
                    </p>
                </section>
            </div>
        </div>
    );
}
