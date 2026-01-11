'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import { products as staticProducts, Product } from '@/lib/products';
import { getAllProducts, isShopifyEnabled, TransformedProduct } from '@/lib/shopify';
import styles from './page.module.css';

type CategoryFilter = 'all' | Product['category'];
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export default function ShopPage() {
    const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
    const [sortBy, setSortBy] = useState<SortOption>('featured');
    const [products, setProducts] = useState<(Product | TransformedProduct)[]>(staticProducts);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch products from Shopify if enabled
    useEffect(() => {
        const fetchProducts = async () => {
            if (isShopifyEnabled()) {
                try {
                    const shopifyProducts = await getAllProducts();
                    if (shopifyProducts.length > 0) {
                        setProducts(shopifyProducts);
                    }
                } catch (error) {
                    console.error('Error fetching Shopify products:', error);
                    // Fall back to static products
                }
            }
            setIsLoading(false);
        };
        fetchProducts();
    }, []);

    // Filter and Sort products
    const filteredAndSortedProducts = useMemo(() => {
        let result = activeFilter === 'all'
            ? [...products]
            : products.filter(p => p.category === activeFilter);

        // Apply sorting
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                result.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'featured':
            default:
                // Keep original order (featured/bestsellers first)
                break;
        }

        return result;
    }, [activeFilter, sortBy, products]);

    const filters: { label: string; value: CategoryFilter }[] = [
        { label: 'All Snacks', value: 'all' },
        { label: 'Murukkus', value: 'Murukku' },
        { label: 'Sweets', value: 'Sweet' },
        { label: 'Seedai', value: 'Seedai' },
    ];

    const sortOptions: { label: string; value: SortOption }[] = [
        { label: 'Featured', value: 'featured' },
        { label: 'Price: Low to High', value: 'price-asc' },
        { label: 'Price: High to Low', value: 'price-desc' },
        { label: 'Name: A to Z', value: 'name-asc' },
        { label: 'Name: Z to A', value: 'name-desc' },
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

            {/* Filter & Sort Bar */}
            <div className={styles.filterBar}>
                <div className={`container ${styles.filterContainer}`}>
                    {/* Category Filters */}
                    <div className={styles.categoryFilters}>
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

                    {/* Sort Dropdown */}
                    <div className={styles.sortWrapper}>
                        <label htmlFor="sortBy" className={styles.sortLabel}>Sort by:</label>
                        <select
                            id="sortBy"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className={styles.sortSelect}
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Product Count & Grid */}
            <section className="container section-padding-lg">
                {/* Results Count */}
                {!isLoading && (
                    <div className={styles.resultsBar}>
                        <span className={styles.resultsCount}>
                            Showing {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'}
                        </span>
                    </div>
                )}

                {isLoading ? (
                    <div className={styles.loadingGrid}>
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={styles.skeletonCard}>
                                <div className={styles.skeletonImage} />
                                <div className={styles.skeletonText} />
                                <div className={styles.skeletonPrice} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="product-grid"
                        layout
                    >
                        {filteredAndSortedProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product as Product} index={index} />
                        ))}
                    </motion.div>
                )}

                {!isLoading && filteredAndSortedProducts.length === 0 && (
                    <div className={styles.emptyState}>
                        <p>No products found in this category.</p>
                    </div>
                )}
            </section>
        </>
    );
}
