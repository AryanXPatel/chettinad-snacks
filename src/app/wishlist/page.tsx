'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/lib/products';
import Link from 'next/link';

// Mock wishlist data (in real app, this would come from user state)
const wishlistProductIds = ['kai-murukku', 'athirasam', 'seepu-seedai'];
const wishlistProducts = products.filter(p => wishlistProductIds.includes(p.id));

export default function WishlistPage() {
    if (wishlistProducts.length === 0) {
        return (
            <div className="container section-padding-lg text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 style={{ marginBottom: '1rem' }}>Your Wishlist is Empty</h1>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>Start saving your favorite cravings!</p>
                    <Link href="/shop" className="btn-pop">Start Shopping</Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container section-padding">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '2rem' }}
            >
                Your Saved Cravings ({wishlistProducts.length})
            </motion.h1>

            <div className="product-grid">
                {wishlistProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                ))}
            </div>
        </div>
    );
}
