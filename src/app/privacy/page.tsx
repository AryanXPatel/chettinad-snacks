'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';

export default function PrivacyPage() {
    return (
        <div className="container section-padding-lg">
            <motion.div
                className={styles.policyHeader}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Privacy Policy</h1>
                <p className={styles.lastUpdated}>Effective Date: January 1, 2026</p>
            </motion.div>

            <div className={styles.policyContent}>
                <section className={styles.section}>
                    <h2>1. Introduction</h2>
                    <p>
                        At Chettinad Snacks, we respect your privacy and are committed to protecting
                        your personal data. This privacy policy explains how we collect, use, and
                        safeguard your information when you visit our website or make a purchase.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Information We Collect</h2>
                    <p>We collect information that you provide directly to us:</p>
                    <ul className={styles.list}>
                        <li><strong>Account Information:</strong> Name, email, phone number, password</li>
                        <li><strong>Order Information:</strong> Shipping address, billing address, payment details</li>
                        <li><strong>Communication:</strong> Messages you send us, reviews, feedback</li>
                        <li><strong>Preferences:</strong> Product preferences, communication preferences</li>
                    </ul>
                    <p>We also collect information automatically:</p>
                    <ul className={styles.list}>
                        <li>Device information (browser type, operating system)</li>
                        <li>Usage data (pages visited, time spent, clicks)</li>
                        <li>IP address and location data</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>3. How We Use Your Information</h2>
                    <p>We use your information to:</p>
                    <ul className={styles.list}>
                        <li>Process and fulfill your orders</li>
                        <li>Send order confirmations and shipping updates</li>
                        <li>Respond to your inquiries and provide customer support</li>
                        <li>Send promotional emails (with your consent)</li>
                        <li>Improve our website and services</li>
                        <li>Prevent fraud and ensure security</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>4. Information Sharing</h2>
                    <p>We do not sell your personal information. We may share your data with:</p>
                    <ul className={styles.list}>
                        <li><strong>Service Providers:</strong> Payment processors, shipping carriers, analytics providers</li>
                        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                        <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>5. Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your
                        personal data against unauthorized access, alteration, disclosure, or destruction.
                        This includes encryption, secure servers, and regular security assessments.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>6. Cookies</h2>
                    <p>
                        We use cookies and similar technologies to enhance your experience, analyze site
                        usage, and assist in marketing efforts. You can control cookie preferences through
                        your browser settings.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>7. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul className={styles.list}>
                        <li>Access your personal data</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Object to processing of your data</li>
                        <li>Withdraw consent for marketing communications</li>
                        <li>Request data portability</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>8. Data Retention</h2>
                    <p>
                        We retain your personal data for as long as necessary to fulfill the purposes
                        for which it was collected, comply with legal obligations, resolve disputes,
                        and enforce our agreements. Generally, order data is retained for 7 years for
                        tax and accounting purposes.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>9. Children{"'"}s Privacy</h2>
                    <p>
                        Our services are not directed to individuals under 18. We do not knowingly
                        collect personal information from children. If you believe we have collected
                        information from a child, please contact us immediately.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>10. Updates to This Policy</h2>
                    <p>
                        We may update this privacy policy from time to time. We will notify you of
                        any changes by posting the new policy on this page and updating the effective date.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>11. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy or our data practices,
                        please <Link href="/contact" className={styles.link}>contact us</Link> or
                        email us at <a href="mailto:privacy@chettinad-snacks.com" className={styles.link}>privacy@chettinad-snacks.com</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
