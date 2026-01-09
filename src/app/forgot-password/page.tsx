'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would call an API
        setSubmitted(true);
    };

    return (
        <div className={styles.splitScreen}>
            {/* Visual Side */}
            <div className={styles.visualSide}>
                <Link href="/login" className={styles.backLink}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Login
                </Link>
                <div className={styles.visualContent}>
                    <h2>Forgot Password?</h2>
                    <p>No worries, we{"'"}ll help you reset it.</p>
                </div>
            </div>

            {/* Form Side */}
            <motion.div
                className={styles.formSide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                {!submitted ? (
                    <>
                        <h1>Reset Password</h1>
                        <p className={styles.subtitle}>
                            Enter your email address and we{"'"}ll send you a link to reset your password.
                        </p>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="form-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-pop" style={{ width: '100%', borderRadius: '8px' }}>
                                Send Reset Link
                            </button>
                        </form>

                        <p className={styles.loginPrompt}>
                            Remember your password?{' '}
                            <Link href="/login" className={styles.loginLink}>Log in</Link>
                        </p>
                    </>
                ) : (
                    <motion.div
                        className={styles.successState}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className={styles.successIcon}>✓</div>
                        <h2>Check Your Email</h2>
                        <p className={styles.successText}>
                            We{"'"}ve sent a password reset link to <strong>{email}</strong>.
                            Please check your inbox and follow the instructions.
                        </p>
                        <Link href="/login" className="btn-pop" style={{ marginTop: '2rem' }}>
                            Back to Login
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
