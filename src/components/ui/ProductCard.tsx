'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cart';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
    index?: number;
}

// Truncate description to first sentence or max chars
function truncateDescription(desc: string, maxLength: number = 60): string {
    // Remove HTML-like artifacts and get clean text
    const clean = desc.replace(/<[^>]*>/g, '').trim();
    // Get first sentence
    const firstSentence = clean.split(/[.!?]/)[0];
    if (firstSentence.length <= maxLength) {
        return firstSentence + '.';
    }
    return firstSentence.substring(0, maxLength).trim() + '...';
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product, 1, '250g');

        // Visual feedback
        const button = e.currentTarget as HTMLButtonElement;
        const originalText = button.innerText;
        button.innerText = 'YUM! 😋';
        button.style.background = '#5CB85C';
        button.style.boxShadow = '0 6px 0 #4cae4c';

        setTimeout(() => {
            button.innerText = originalText;
            button.style.background = '';
            button.style.boxShadow = '';
        }, 1500);
    };

    return (
        <motion.article
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
        >
            <Link href={`/product/${product.slug}`} className={styles.link}>
                {product.badge && (
                    <span className={styles.badge}>{product.badge}</span>
                )}

                <div
                    className={styles.imageBg}
                    style={{ backgroundColor: product.bgColor }}
                >
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={200}
                        className={styles.image}
                    />
                </div>

                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.description}>{truncateDescription(product.description)}</p>

                <div className={styles.priceRow}>
                    <span className={styles.price}>₹{product.price}</span>
                    {product.compareAtPrice && (
                        <span className={styles.comparePrice}>₹{product.compareAtPrice}</span>
                    )}
                </div>
            </Link>

            <button
                className={`btn-pop ${styles.addButton}`}
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
        </motion.article>
    );
}
