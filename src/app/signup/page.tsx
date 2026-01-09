'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function SignupPage() {
    return (
        <div className={styles.splitScreen}>
            {/* Visual Side */}
            <div className={styles.visualSide}>
                <Link href="/" className={styles.backLink}>
                    <Image
                        src="/images/chettinad_snacks_logo_1767719406437.png"
                        alt="Logo"
                        width={20}
                        height={20}
                    />
                    Back to Home
                </Link>
                <div className={styles.visualContent}>
                    <h2>Join the Family</h2>
                    <p>Unlock exclusive discounts and early access to new snacks.</p>
                </div>
            </div>

            {/* Form Side */}
            <motion.div
                className={styles.formSide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Create Account</h1>
                <p className={styles.subtitle}>Start your snacking journey with us.</p>

                <form className={styles.form}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>First Name</label>
                            <input type="text" placeholder="Your first name" className="form-input" />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Last Name</label>
                            <input type="text" placeholder="Your last name" className="form-input" />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email Address</label>
                        <input type="email" placeholder="you@example.com" className="form-input" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Phone Number</label>
                        <input type="tel" placeholder="+91 98765 43210" className="form-input" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input type="password" placeholder="Create a strong password" className="form-input" />
                        <span className={styles.passwordHint}>Must be at least 8 characters</span>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm your password" className="form-input" />
                    </div>

                    <label className={styles.checkbox}>
                        <input type="checkbox" />
                        <span>I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link></span>
                    </label>

                    <button type="button" className="btn-pop" style={{ width: '100%', borderRadius: '8px' }}>
                        Create Account
                    </button>
                </form>

                <div className={styles.divider}>OR</div>

                <p className={styles.loginPrompt}>
                    Already have an account?{' '}
                    <Link href="/login" className={styles.loginLink}>Log In</Link>
                </p>
            </motion.div>
        </div>
    );
}
