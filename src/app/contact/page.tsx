'use client';

import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function ContactPage() {
    return (
        <div className="container section-padding-lg">
            <h1 className="text-center" style={{ marginBottom: '1rem' }}>Say Hello</h1>
            <p className={styles.intro}>
                Have a question about your order or just want to tell us how much you loved the murukku? We're all ears.
            </p>

            <div className={styles.contactGrid}>
                {/* Contact Info */}
                <motion.div
                    className={styles.infoCard}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h3 style={{ marginBottom: '1.5rem' }}>Get in Touch</h3>

                    <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Email Us</div>
                        <a href="mailto:hello@chettinad-snacks.com" className={styles.infoLink}>
                            hello@chettinad-snacks.com
                        </a>
                    </div>

                    <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Call Us</div>
                        <div className={styles.infoValue}>+91 98765 43210</div>
                        <div className={styles.infoMeta}>Mon-Fri, 9am - 6pm IST</div>
                    </div>

                    <div className={styles.infoItem}>
                        <div className={styles.infoLabel}>Visit</div>
                        <div className={styles.infoValue}>
                            12, Temple Street,<br />
                            Karaikudi, Tamil Nadu,<br />
                            India - 630001
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <form className={styles.form}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Name</label>
                                <input type="text" className="form-input" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Order # (Optional)</label>
                                <input type="text" className="form-input" />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Email</label>
                            <input type="email" className="form-input" />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Message</label>
                            <textarea rows={6} className="form-input" />
                        </div>

                        <button type="button" className="btn-pop">Send Message</button>
                    </form>
                </motion.div>
            </div>

            {/* Map Placeholder */}
            <div className={styles.mapPlaceholder}>
                (Interactive Map of Karaikudi)
            </div>
        </div>
    );
}
