'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { IconLeaf, IconOil, IconPot, IconHeart } from '@/components/ui/Icons';
import styles from './page.module.css';

export default function StoryPage() {
    return (
        <>
            {/* Hero */}
            <section className={styles.storyHero}>
                <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.heroTitle}
                    >
                        More Than A Snack.<br />
                        <span style={{ color: 'var(--color-turmeric)' }}>It's A Heritage.</span>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={styles.heroSubtitle}
                    >
                        Using recipes passed down through 3 generations, we bring the authentic taste of Karaikudi to the modern world.
                    </motion.p>
                </div>
                <div className={styles.decorCircle1} />
                <div className={styles.decorCircle2} />
            </section>

            {/* Content */}
            <section className="container section-padding-lg">
                {/* Feature 1 */}
                <div className={styles.splitFeature}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.featureLabel} style={{ color: 'var(--color-chilli)' }}>The Beginning</div>
                        <h2 className={styles.featureTitle}>It started in a small kitchen in Karaikudi.</h2>
                        <p className={styles.featureText}>
                            Decades ago, our grandmother (Aachi) became a local legend for her 'Thenkuzhal'.
                            She didn't use scales or timers—she used her senses. The sputter of the oil,
                            the golden hue of the flour, the aroma of the roasted udad dal.
                        </p>
                        <p className={styles.featureText}>
                            Today, we simply scale what she perfected. No shortcuts. No machines replacing
                            hands where it matters. Just the same honest ingredients and patience.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/images/about_story_image_1767719706890.png"
                            alt="Vintage kitchen"
                            width={500}
                            height={400}
                            className={styles.featureImage}
                        />
                    </motion.div>
                </div>

                {/* Feature 2 - Reversed */}
                <div className={`${styles.splitFeature} ${styles.reversed}`}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/images/about_artisan_hands_1767724735570.png"
                            alt="Artisan hands"
                            width={500}
                            height={400}
                            className={styles.featureImage}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.featureLabel} style={{ color: 'var(--color-turmeric)' }}>The Philosophy</div>
                        <h2 className={styles.featureTitle}>Refusing to Automate the "Twist".</h2>
                        <p className={styles.featureText}>
                            In a world of factory-extruded snacks, our Kai Murukku is an outlier.
                            "Kai" means hand. It takes years to master the art of twisting rice dough
                            into perfect spirals without breaking the strand.
                        </p>
                        <p className={styles.featureText}>
                            We employ local artisans in Karaikudi, keeping this dying culinary art alive.
                            Every pack you buy supports a livelihood and a legacy.
                        </p>
                    </motion.div>
                </div>

                {/* Values Grid */}
                <h2 className="text-center" style={{ marginTop: '6rem', marginBottom: '3rem' }}>The Chettinad Promise</h2>
                <div className={styles.valueGrid}>
                    {[
                        { icon: <IconLeaf size={32} style={{ color: '#4CAF50' }} />, title: '100% Natural', text: 'Absolutely no artificial colors, preservatives, or soda.' },
                        { icon: <IconOil size={32} style={{ color: 'var(--color-turmeric)' }} />, title: 'Pure Gingelly Oil', text: 'Cold-pressed sesame oil. No cheap palm oil blends.' },
                        { icon: <IconPot size={32} style={{ color: 'var(--color-chilli)' }} />, title: 'Small Batch', text: 'Made fresh daily in limited quantities.' },
                        { icon: <IconHeart size={32} style={{ color: 'var(--color-chilli)' }} />, title: 'Community First', text: 'Sourced from local farmers and artisans.' },
                    ].map((value, index) => (
                        <motion.div
                            key={value.title}
                            className={styles.valueCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={styles.valueIcon}>{value.icon}</div>
                            <h3>{value.title}</h3>
                            <p>{value.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className={styles.ctaSection}>
                <div className="container text-center">
                    <h2 style={{ marginBottom: '1.5rem' }}>Taste the Difference Tradition Makes</h2>
                    <Link href="/shop" className="btn-pop" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                        Shop The Legacy
                    </Link>
                </div>
            </section>
        </>
    );
}
