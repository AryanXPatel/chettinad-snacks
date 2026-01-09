'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
    name: string;
    slug: string;
    bgColor: string;
    image: string;
    index?: number;
}

export default function CategoryCard({ name, slug, bgColor, image, index = 0 }: CategoryCardProps) {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link href={`/shop?category=${name}`}>
                <div className={styles.imageWrapper} style={{ backgroundColor: bgColor }}>
                    <Image
                        src={image}
                        alt={name}
                        width={200}
                        height={200}
                        className={styles.image}
                    />
                </div>
                <h3 className={styles.name}>{name}</h3>
            </Link>
        </motion.div>
    );
}
