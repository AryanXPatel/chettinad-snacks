'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { resetCustomerPasswordByUrl } from '@/lib/shopify/auth';
import styles from '../login/page.module.css';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resetUrl, setResetUrl] = useState<string | null>(null);

    useEffect(() => {
        // Get the reset URL from query params
        // The reset link should come as: /reset-password?reset_url=<encoded-shopify-url>
        // Or with individual params: /reset-password?customer_id=xxx&token=yyy
        const resetUrlParam = searchParams.get('reset_url');
        const customerId = searchParams.get('customer_id');
        const token = searchParams.get('token');

        if (resetUrlParam) {
            setResetUrl(decodeURIComponent(resetUrlParam));
        } else if (customerId && token) {
            // Construct the full Shopify reset URL
            const shopifyResetUrl = `https://chettinadsnacks.myshopify.com/account/reset/${customerId}/${token}`;
            setResetUrl(shopifyResetUrl);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 5) {
            setError('Password must be at least 5 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!resetUrl) {
            setError('Invalid reset link. Please request a new password reset.');
            return;
        }

        setIsSubmitting(true);

        const result = await resetCustomerPasswordByUrl(resetUrl, password);

        if (result.success) {
            setSuccess(true);
            // Redirect to login after 3 seconds
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } else {
            setError(result.error || 'Failed to reset password. The link may have expired.');
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            className={styles.authCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.authHeader}>
                <h1>Set New Password</h1>
                <p>Create a new password for your account</p>
            </div>

            {success ? (
                <div className={styles.successBox}>
                    <strong>✅ Password reset successful!</strong>
                    <p style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                        Your password has been updated. Redirecting you to login...
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.authForm}>
                    {error && (
                        <div className={styles.errorBox}>
                            {error}
                        </div>
                    )}

                    {!resetUrl && (
                        <div className={styles.errorBox}>
                            Invalid reset link. Please <Link href="/forgot-password">request a new password reset</Link>.
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="At least 5 characters"
                            required
                            minLength={5}
                            autoComplete="new-password"
                            disabled={!resetUrl}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repeat your password"
                            required
                            minLength={5}
                            autoComplete="new-password"
                            disabled={!resetUrl}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`btn-pop ${styles.submitBtn}`}
                        disabled={isSubmitting || !resetUrl}
                    >
                        {isSubmitting ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            )}

            <div className={styles.authFooter}>
                <p>Remember your password? <Link href="/login">Sign in</Link></p>
            </div>
        </motion.div>
    );
}

function LoadingState() {
    return (
        <div className={styles.authCard}>
            <div className={styles.authHeader}>
                <h1>Set New Password</h1>
                <p>Loading...</p>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className={styles.authPage}>
            <Suspense fallback={<LoadingState />}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}
