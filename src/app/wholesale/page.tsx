'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { IconBox, IconCalendar, IconTag } from '@/components/ui/Icons';
import styles from './page.module.css';

const benefits = [
    { icon: <IconBox size={32} style={{ color: 'var(--color-turmeric)' }} />, title: 'Retail Ready', text: 'Beautiful, air-tight packaging that stands out on the shelf.' },
    { icon: <IconCalendar size={32} style={{ color: 'var(--color-chilli)' }} />, title: '30-Day Shelf Life', text: 'Naturally preserved with traditional frying methods.' },
    { icon: <IconTag size={32} style={{ color: '#4CAF50' }} />, title: 'Good Margins', text: 'Competitive wholesale pricing structure for partners.' },
];

export default function WholesalePage() {
    return (
        <>
            {/* Hero */}
            <section className={styles.wholesaleHero}>
                <div className={`container ${styles.heroGrid}`}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1>Delight Your Customers</h1>
                        <p className={styles.heroText}>
                            Authentic Indian snacks with modern shelf appeal. Perfect for boutique grocers,
                            cafes, and corporate gifting.
                        </p>
                        <button
                            className="btn-pop"
                            onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Request Wholesale Catalog
                        </button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Image
                            src="/images/packaging_mockup_1767719821158.png"
                            alt="Packaging"
                            width={500}
                            height={400}
                            className={styles.heroImage}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Benefits */}
            <section className="container section-padding-lg text-center">
                <h2 style={{ marginBottom: '3rem' }}>Why Stock Chettinad Snacks?</h2>
                <div className={styles.benefitsGrid}>
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            className={styles.benefitCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={styles.benefitIcon}>{benefit.icon}</div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Form */}
            <section className={styles.formSection} id="inquiry-form">
                <div className="container" style={{ maxWidth: '600px' }}>
                    <h2 className="text-center" style={{ marginBottom: '1rem' }}>Partner With Us</h2>
                    <p className={styles.formIntro}>
                        Tell us about your business and we'll get back to you within 24 hours.
                    </p>

                    <form className={styles.form}>
                        <div className={styles.formRow}>
                            <input type="text" placeholder="First Name" className="form-input" />
                            <input type="text" placeholder="Last Name" className="form-input" />
                        </div>
                        <input type="text" placeholder="Business Name" className="form-input" />
                        <input type="email" placeholder="Email Address" className="form-input" />
                        <select className="form-input">
                            <option>Business Type</option>
                            <option>Retail Store</option>
                            <option>Cafe / Restaurant</option>
                            <option>Corporate Gifting</option>
                        </select>
                        <textarea placeholder="Tell us what you're looking for..." rows={5} className="form-input" />
                        <button type="button" className="btn-pop" style={{ width: '100%' }}>Send Inquiry</button>
                    </form>
                </div>
            </section>
        </>
    );
}
