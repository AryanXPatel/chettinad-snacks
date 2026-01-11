import Link from 'next/link';
import Image from 'next/image';
import { IconHeart } from '@/components/ui/Icons';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContent}`}>
                {/* Brand Column */}
                <div className={styles.column}>
                    <Image
                        src="/images/chettinad_snacks_logo_1767719406437.png"
                        alt="Chettinad Snacks"
                        width={50}
                        height={50}
                        className={styles.logo}
                    />
                    <p className={styles.tagline}>
                        Preserving the art of Karaikudi snacking, one twist at a time. Handmade. Authentic. Addictive.
                    </p>
                </div>

                {/* Shop Links */}
                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>Shop</h3>
                    <nav className={styles.linkList}>
                        <Link href="/shop">All Snacks</Link>
                        <Link href="/shop?category=Murukku">Murukku</Link>
                        <Link href="/shop?category=Sweet">Sweets</Link>
                        <Link href="/shop?category=Seedai">Seedai</Link>
                    </nav>
                </div>

                {/* Company Links */}
                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>Company</h3>
                    <nav className={styles.linkList}>
                        <Link href="/story">Our Story</Link>
                        <Link href="/process">Process</Link>
                        <Link href="/wholesale">Wholesale</Link>
                        <Link href="/contact">Contact</Link>
                    </nav>
                </div>

                {/* Help Links */}
                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>Help</h3>
                    <nav className={styles.linkList}>
                        <Link href="/shipping">Shipping Policy</Link>
                        <Link href="/returns">Returns</Link>
                        <Link href="/faq">FAQ</Link>
                    </nav>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={`container ${styles.bottomBar}`}>
                <div className={styles.copyright}>
                    © 2026 Chettinad Snacks. Handcrafted with <IconHeart size={14} style={{ color: 'var(--color-chilli)', verticalAlign: 'middle' }} />.
                </div>
                <div className={styles.payments}>
                    <span className={styles.paymentBadge}>VISA</span>
                    <span className={styles.paymentBadge}>Mastercard</span>
                    <span className={styles.paymentBadge}>UPI</span>
                </div>
            </div>
        </footer>
    );
}
