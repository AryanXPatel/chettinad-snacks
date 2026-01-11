'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { recoverCustomer } from '@/lib/shopify/auth';
import { isShopifyEnabled } from '@/lib/shopify';
import styles from '../login/page.module.css';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        if (!isShopifyEnabled()) {
            setError('Password recovery is not available at this time.');
            setIsSubmitting(false);
            return;
        }

        const result = await recoverCustomer(email);

        if (result.success) {
            setSuccess(true);
        } else {
            setError(result.error || 'Failed to send recovery email. Please try again.');
        }

        setIsSubmitting(false);
    };

    return (
        <div className={styles.authPage}>
            <motion.div
                className={styles.authCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className={styles.authHeader}>
                    <h1>Reset Password</h1>
                    <p>We&apos;ll send you a reset link</p>
                </div>

                {success ? (
                    <div className={styles.successBox}>
                        <strong>✅ Check your email!</strong>
                        <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                            We&apos;ve sent a password reset link to <strong>{email}</strong>.
                        </p>
                        <p style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '0.9rem', color: '#047857' }}>
                            📧 Open the email and click the reset link to create a new password.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.authForm}>
                        {error && (
                            <div className={styles.errorBox}>
                                {error}
                            </div>
                        )}

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                autoComplete="email"
                            />
                        </div>

                        <button
                            type="submit"
                            className={`btn-pop ${styles.submitBtn}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                )}

                <div className={styles.authFooter}>
                    <p>Remember your password? <Link href="/login">Sign in</Link></p>
                </div>
            </motion.div>
        </div>
    );
}
