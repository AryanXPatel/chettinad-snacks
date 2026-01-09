'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, products } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { StarRating, IconLeaf, IconHeart, IconClock } from '@/components/ui/Icons';
import QuantitySelector from '@/components/ui/QuantitySelector';
import Accordion, { AccordionItem } from '@/components/ui/Accordion';
import ProductCard from '@/components/ui/ProductCard';
import styles from './page.module.css';

const packSizes = ['250g', '500g', '1kg'];

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
    // Unwrap params using React.use() for Next.js 15
    const { slug } = use(params);

    const [quantity, setQuantity] = useState(1);
    const [selectedPackSize, setSelectedPackSize] = useState('250g');
    const { addItem } = useCart();

    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const handleAddToCart = () => {
        addItem(product, quantity, selectedPackSize);
    };

    // Get related products (same category, excluding current)
    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <>
            {/* Breadcrumb */}
            <div className="container" style={{ paddingTop: '2rem', fontSize: '0.9rem', color: '#888' }}>
                <Link href="/" style={{ color: '#888' }}>Home</Link>
                {' / '}
                <Link href="/shop" style={{ color: '#888' }}>Snacks</Link>
                {' / '}
                <span style={{ color: 'var(--color-coffee)', fontWeight: 600 }}>{product.title}</span>
            </div>

            {/* Product Details */}
            <section className={`container ${styles.productContainer}`}>
                {/* Image Gallery */}
                <motion.div
                    className={styles.productGallery}
                    style={{ backgroundColor: product.bgColor }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {product.badge && (
                        <span className={styles.badge}>{product.badge}</span>
                    )}
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={500}
                        height={500}
                        className={styles.productImage}
                        priority
                    />
                </motion.div>

                {/* Details */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h1 className={styles.title}>{product.title}</h1>

                    <div className={styles.ratingRow}>
                        <StarRating size={14} />
                        <span className={styles.ratingText}>4.9 (84 reviews)</span>
                    </div>

                    <div className={styles.priceRow}>
                        <span className={styles.price}>₹{product.price}</span>
                        {product.compareAtPrice && (
                            <span className={styles.comparePrice}>₹{product.compareAtPrice}</span>
                        )}
                    </div>

                    <p className={styles.description}>{product.description}</p>

                    {/* Pack Size Selection */}
                    <div className={styles.optionGroup}>
                        <span className={styles.optionLabel}>Pack Size</span>
                        <div className="flex gap-2">
                            {packSizes.map(size => (
                                <button
                                    key={size}
                                    className={`${styles.sizeBtn} ${selectedPackSize === size ? styles.sizeBtnActive : ''}`}
                                    onClick={() => setSelectedPackSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Row */}
                    <div className={styles.addToCartRow}>
                        <QuantitySelector value={quantity} onChange={setQuantity} />
                        <button className="btn-pop" onClick={handleAddToCart} style={{ flex: 1 }}>
                            Add to Cart — ₹{product.price * quantity}
                        </button>
                    </div>

                    {/* Trust Points */}
                    <div className={styles.trustPoints}>
                        <div className={styles.trustPoint}>
                            <IconLeaf size={16} style={{ color: '#4CAF50' }} /> 100% Vegan
                        </div>
                        <div className={styles.trustPoint}>
                            <IconHeart size={16} style={{ color: 'var(--color-chilli)' }} /> No Palm Oil
                        </div>
                        <div className={styles.trustPoint}>
                            <IconClock size={16} /> Ships in 24h
                        </div>
                    </div>

                    {/* Accordions */}
                    <Accordion>
                        <AccordionItem title="Ingredients" defaultOpen>
                            <p>
                                Rice Flour, Urad Dal Flour, Roasted Bengal Gram, Pure Gingelly Oil (Sesame Oil),
                                Cumin Seeds, Salt, Asafoetida.
                                <br /><br />
                                <strong>Allergens:</strong> Contains Sesame. Made in a facility that handles nuts.
                            </p>
                        </AccordionItem>
                        <AccordionItem title="Nutrition Scale">
                            <p>
                                Typical values per 100g:<br />
                                Energy: 540 Kcal<br />
                                Protein: 8g<br />
                                Carbs: 60g<br />
                                Fat: 28g (Zero Trans Fat)
                            </p>
                        </AccordionItem>
                    </Accordion>
                </motion.div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="container section-padding-lg">
                    <h2 style={{ marginBottom: '2rem' }}>Perfect Pairs For Your Tea</h2>
                    <div className="product-grid">
                        {relatedProducts.map((p, index) => (
                            <ProductCard key={p.id} product={p} index={index} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
