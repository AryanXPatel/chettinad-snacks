'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading: authLoading, isLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if already logged in
    if (isLoggedIn && !authLoading) {
        router.push('/account');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const result = await login(email, password);

        if (result.success) {
            router.push('/account');
        } else {
            setError(result.error || 'Login failed. Please try again.');
            setIsSubmitting(false);
        }
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
                    <h1>Welcome Back</h1>
                    <p>Sign in to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.authForm}>
                    {error && (
                        <div className={styles.errorBox}>
                            <strong>{error}</strong>
                            {error.toLowerCase().includes('unidentified') ||
                                error.toLowerCase().includes('invalid') ||
                                error.toLowerCase().includes('incorrect') ? (
                                <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.85rem' }}>
                                    Don&apos;t have an account yet? <Link href="/signup" style={{ fontWeight: 600 }}>Create one</Link>
                                    <br />
                                    <Link href="/forgot-password" style={{ fontWeight: 600 }}>Forgot your password?</Link>
                                </p>
                            ) : null}
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

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={5}
                            autoComplete="current-password"
                        />
                    </div>

                    <div className={styles.forgotLink}>
                        <Link href="/forgot-password">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        className={`btn-pop ${styles.submitBtn}`}
                        disabled={isSubmitting || authLoading}
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className={styles.authFooter}>
                    <p>Don&apos;t have an account? <Link href="/signup">Create one</Link></p>
                </div>
            </motion.div>
        </div>
    );
}
