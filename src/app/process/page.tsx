'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './page.module.css';

const steps = [
    {
        number: '01',
        title: 'The Blend',
        color: '#FFE082',
        description: 'It starts with locally sourced raw rice, washed and sun-dried for 2 days. We mill it into a fine flour and mix it with roasted Urad Dal, Cumin, and Asafoetida. No ready-mixes. Just raw grains.',
        image: '/images/about_story_image_1767719706890.png',
    },
    {
        number: '02',
        title: 'The Twist',
        color: '#FFAB91',
        description: 'The most critical step. Our artisans take a small ball of dough and twist it between their thumb and forefinger to create 5-7 concentric circles. It requires a rhythm and pressure that machines simply cannot replicate.',
        image: '/images/about_artisan_hands_1767724735570.png',
    },
    {
        number: '03',
        title: 'The Fry',
        color: '#80CBC4',
        description: 'We use 100% pure cold-pressed Gingelly (Sesame) Oil. It has a high smoke point and imparts that signature nutty aroma. We fry until the sizzle stops—the sign of a perfectly crisp Murukku.',
        image: '/images/product_thenkuzhal_1767719548617.png',
    },
];

export default function ProcessPage() {
    return (
        <>
            <div className={styles.processHero}>
                <div className="container text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        The Art of the Twist
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={styles.heroSubtitle}
                    >
                        It takes 3 days and 4 pairs of hands to make one batch of our Kai Murukku. Here is how.
                    </motion.p>
                </div>
            </div>

            <div className="container section-padding">
                {steps.map((step, index) => (
                    <motion.div
                        key={step.number}
                        className={`${styles.stepCard} ${index % 2 === 1 ? styles.reversed : ''}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.stepContent}>
                            <div className={styles.stepNumber} style={{ color: step.color }}>{step.number}</div>
                            <h2>{step.title}</h2>
                            <div className={styles.stepDivider} style={{ background: step.color }} />
                            <p>{step.description}</p>
                        </div>
                        <div className={styles.stepImage}>
                            <Image
                                src={step.image}
                                alt={step.title}
                                width={500}
                                height={400}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </>
    );
}
