'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/AuthContext';
import { IconCart, IconGift, IconBook, IconChat, IconSnack, IconUser } from '@/components/ui/Icons';
import styles from './Header.module.css';

export default function Header() {
    const { itemCount, setIsOpen } = useCart();
    const { customer, isLoggedIn, isLoading: authLoading } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    // Auto-close mobile menu on desktop viewport
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        // Also check on mount in case page loaded with menu open on desktop
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileMenuOpen]);

    const closeMenu = () => setMobileMenuOpen(false);

    // Get display name for logged in user
    const displayName = customer?.firstName || 'Account';

    return (
        <header className={styles.header}>
            <div className="container flex justify-between align-center">
                {/* Logo */}
                <Link href="/" className={`flex align-center gap-2 ${styles.logo}`}>
                    <Image
                        src="/images/chettinad_snacks_logo_1767719406437.png"
                        alt="Chettinad Snacks"
                        width={40}
                        height={40}
                        className={styles.logoImage}
                    />
                    <span className={styles.logoText}>Chettinad</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className={`flex gap-4 ${styles.nav}`}>
                    <Link href="/shop" className="nav-link">Shop Snacks</Link>
                    <Link href="/story" className="nav-link">Our Story</Link>
                    <Link href="/wholesale" className="nav-link">Gifting</Link>
                </nav>

                {/* Desktop Actions */}
                <div className={`flex gap-4 align-center ${styles.desktopActions}`}>
                    {!authLoading && (
                        isLoggedIn ? (
                            <Link href="/account" className={`nav-link ${styles.accountLink}`}>
                                <IconUser size={18} />
                                <span>{displayName}</span>
                            </Link>
                        ) : (
                            <Link href="/login" className="nav-link">Log In</Link>
                        )
                    )}
                    <button
                        className="btn-pop btn-pop--small"
                        onClick={() => setIsOpen(true)}
                    >
                        Cart ({itemCount})
                    </button>
                </div>

                {/* Mobile Actions */}
                <div className={styles.mobileActions}>
                    <button
                        className={styles.cartBtn}
                        onClick={() => setIsOpen(true)}
                    >
                        <IconCart size={22} /> {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
                    </button>
                    <button
                        className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ''}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Backdrop */}
            <div
                className={`${styles.backdrop} ${mobileMenuOpen ? styles.backdropVisible : ''}`}
                onClick={closeMenu}
            />

            {/* Mobile Slide-out Drawer */}
            <nav className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}>
                <div className={styles.drawerHeader}>
                    <span className={styles.drawerTitle}>Menu</span>
                    <button className={styles.closeBtn} onClick={closeMenu}>×</button>
                </div>
                <div className={styles.drawerLinks}>
                    <Link href="/shop" className={styles.drawerLink} onClick={closeMenu}>
                        <span className={styles.linkIcon}><IconSnack size={20} /></span>
                        Shop Snacks
                    </Link>
                    <Link href="/story" className={styles.drawerLink} onClick={closeMenu}>
                        <span className={styles.linkIcon}><IconBook size={20} /></span>
                        Our Story
                    </Link>
                    <Link href="/wholesale" className={styles.drawerLink} onClick={closeMenu}>
                        <span className={styles.linkIcon}><IconGift size={20} /></span>
                        Gifting
                    </Link>
                    <Link href="/contact" className={styles.drawerLink} onClick={closeMenu}>
                        <span className={styles.linkIcon}><IconChat size={20} /></span>
                        Contact
                    </Link>
                </div>
                <div className={styles.drawerFooter}>
                    {!authLoading && (
                        isLoggedIn ? (
                            <Link href="/account" className={styles.drawerLoginBtn} onClick={closeMenu}>
                                <IconUser size={18} /> {displayName}
                            </Link>
                        ) : (
                            <Link href="/login" className={styles.drawerLoginBtn} onClick={closeMenu}>
                                Log In
                            </Link>
                        )
                    )}
                </div>
            </nav>
        </header>
    );
}
