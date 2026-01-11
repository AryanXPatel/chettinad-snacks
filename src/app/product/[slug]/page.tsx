'use client';

import { useState, use, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, products as staticProducts, Product } from '@/lib/products';
import { getProductByHandle, getAllProducts, isShopifyEnabled, TransformedProduct } from '@/lib/shopify';
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
    const [product, setProduct] = useState<Product | TransformedProduct | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<(Product | TransformedProduct)[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>();
    const { addItem, isLoading: cartLoading } = useCart();

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);

            if (isShopifyEnabled()) {
                try {
                    // Fetch from Shopify
                    const shopifyProduct = await getProductByHandle(slug);
                    if (shopifyProduct) {
                        setProduct(shopifyProduct);
                        // Set default variant
                        if (shopifyProduct.variants && shopifyProduct.variants.length > 0) {
                            setSelectedVariantId(shopifyProduct.variants[0].id);
                        }

                        // Fetch related products
                        const allProducts = await getAllProducts();
                        const related = allProducts
                            .filter(p => p.category === shopifyProduct.category && p.id !== shopifyProduct.id)
                            .slice(0, 3);
                        setRelatedProducts(related);
                    } else {
                        // Fall back to static product
                        const staticProduct = getProductBySlug(slug);
                        if (staticProduct) {
                            setProduct(staticProduct);
                            const related = staticProducts
                                .filter(p => p.category === staticProduct.category && p.id !== staticProduct.id)
                                .slice(0, 3);
                            setRelatedProducts(related);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                    // Fall back to static
                    const staticProduct = getProductBySlug(slug);
                    if (staticProduct) {
                        setProduct(staticProduct);
                        const related = staticProducts
                            .filter(p => p.category === staticProduct.category && p.id !== staticProduct.id)
                            .slice(0, 3);
                        setRelatedProducts(related);
                    }
                }
            } else {
                // Use static data
                const staticProduct = getProductBySlug(slug);
                if (staticProduct) {
                    setProduct(staticProduct);
                    const related = staticProducts
                        .filter(p => p.category === staticProduct.category && p.id !== staticProduct.id)
                        .slice(0, 3);
                    setRelatedProducts(related);
                }
            }

            setIsLoading(false);
        };

        fetchProduct();
    }, [slug]);

    const handleAddToCart = async () => {
        if (product) {
            await addItem(product, quantity, selectedPackSize, selectedVariantId);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="container" style={{ padding: '4rem 0' }}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingImage} />
                    <div className={styles.loadingDetails}>
                        <div className={styles.loadingTitle} />
                        <div className={styles.loadingPrice} />
                        <div className={styles.loadingDescription} />
                    </div>
                </div>
            </div>
        );
    }

    // Not found
    if (!product) {
        notFound();
    }

    // Get variants for Shopify products
    const variants = 'variants' in product ? product.variants : [];
    const hasVariants = variants && variants.length > 1;

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

                    {/* Variant Selection (Shopify) */}
                    {hasVariants && (
                        <div className={styles.optionGroup}>
                            <span className={styles.optionLabel}>Option</span>
                            <div className="flex gap-2 flex-wrap">
                                {variants.map(variant => (
                                    <button
                                        key={variant.id}
                                        className={`${styles.sizeBtn} ${selectedVariantId === variant.id ? styles.sizeBtnActive : ''}`}
                                        onClick={() => setSelectedVariantId(variant.id)}
                                        disabled={!variant.available}
                                        style={!variant.available ? { opacity: 0.5 } : undefined}
                                    >
                                        {variant.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Pack Size Selection (Static fallback) */}
                    {!hasVariants && (
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
                    )}

                    {/* Add to Cart Row */}
                    <div className={styles.addToCartRow}>
                        <QuantitySelector value={quantity} onChange={setQuantity} />
                        <button
                            className="btn-pop"
                            onClick={handleAddToCart}
                            style={{ flex: 1 }}
                            disabled={cartLoading}
                        >
                            {cartLoading ? 'Adding...' : `Add to Cart — ₹${product.price * quantity}`}
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
                            <ProductCard key={p.id} product={p as Product} index={index} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
