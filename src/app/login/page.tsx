'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
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
                    <h2>Welcome Back</h2>
                    <p>Your cravings are waiting.</p>
                </div>
            </div>

            {/* Form Side */}
            <motion.div
                className={styles.formSide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Log In</h1>
                <p className={styles.subtitle}>Enter your details to access your order history.</p>

                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Email Address</label>
                        <input type="email" placeholder="you@example.com" className="form-input" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" className="form-input" />
                        <Link href="/forgot-password" className={styles.forgotLink}>Forgot Password?</Link>
                    </div>

                    <button type="button" className="btn-pop" style={{ width: '100%', borderRadius: '8px' }}>
                        Sign In
                    </button>
                </form>

                <div className={styles.divider}>OR</div>

                <p className={styles.signupPrompt}>
                    Don't have an account?{' '}
                    <Link href="/signup" className={styles.signupLink}>Create one for free</Link>
                </p>
            </motion.div>
        </div>
    );
}
