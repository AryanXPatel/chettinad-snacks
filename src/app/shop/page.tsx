'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import { products, Product } from '@/lib/products';
import styles from './page.module.css';

type CategoryFilter = 'all' | Product['category'];

export default function ShopPage() {
    const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

    const filteredProducts = useMemo(() => {
        if (activeFilter === 'all') return products;
        return products.filter(p => p.category === activeFilter);
    }, [activeFilter]);

    const filters: { label: string; value: CategoryFilter }[] = [
        { label: 'All Snacks', value: 'all' },
        { label: 'Murukkus', value: 'Murukku' },
        { label: 'Sweets', value: 'Sweet' },
        { label: 'Seedai', value: 'Seedai' },
        { label: 'Gifting', value: 'Gift' },
    ];

    return (
        <>
            {/* Hero Banner */}
            <section className={styles.shopHero}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ color: 'var(--color-coffee)', marginBottom: '0.5rem' }}
                    >
                        Cravings Await
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={styles.heroSubtitle}
                    >
                        Handmade treasures from Karaikudi.
                    </motion.p>
                </div>
                <div className={styles.decorCircle1} />
                <div className={styles.decorCircle2} />
            </section>

            {/* Sticky Filter Bar */}
            <div className={styles.filterBar}>
                <div className={`container ${styles.filterContainer}`}>
                    {filters.map(filter => (
                        <button
                            key={filter.value}
                            className={`filter-pill ${activeFilter === filter.value ? 'filter-pill--active' : ''}`}
                            onClick={() => setActiveFilter(filter.value)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <section className="container section-padding-lg">
                <motion.div
                    className="product-grid"
                    layout
                >
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className={styles.emptyState}>
                        <p>No products found in this category.</p>
                    </div>
                )}
            </section>
        </>
    );
}
