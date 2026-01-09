'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './page.module.css';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    // Orders & Shipping
    {
        category: 'Orders & Shipping',
        question: 'How long does delivery take?',
        answer: 'Delivery times vary by location: South India (2-4 days), Metro cities (3-5 days), and rest of India (5-7 days). Orders placed before 2 PM IST are processed the same day.'
    },
    {
        category: 'Orders & Shipping',
        question: 'Is there free shipping?',
        answer: 'Yes! We offer free shipping on all orders above ₹999. Orders between ₹499-₹999 have a flat ₹29 shipping fee, and orders below ₹499 have a ₹49 shipping fee.'
    },
    {
        category: 'Orders & Shipping',
        question: 'How can I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking link via email and SMS. You can also track your order by logging into your account on our website.'
    },
    {
        category: 'Orders & Shipping',
        question: 'Do you ship internationally?',
        answer: 'Currently, we only ship within India. International shipping is coming soon! Subscribe to our newsletter to be the first to know when we launch.'
    },

    // Products
    {
        category: 'Products',
        question: 'How long do the snacks stay fresh?',
        answer: 'Our snacks are made fresh and have a shelf life of 30-45 days when stored properly in an airtight container in a cool, dry place. Check the packaging for specific best-before dates.'
    },
    {
        category: 'Products',
        question: 'Are your snacks made with palm oil?',
        answer: 'No! We use only pure cold-pressed groundnut oil and coconut oil in our snacks, just like traditional Chettinad recipes. No palm oil, no shortcuts.'
    },
    {
        category: 'Products',
        question: 'Are your products vegetarian/vegan?',
        answer: 'Most of our products are vegetarian. Some sweets contain dairy (ghee, milk). Look for the vegan symbol on product pages for vegan-friendly options. All our products are 100% egg-free.'
    },
    {
        category: 'Products',
        question: 'Do you use any preservatives?',
        answer: 'Our snacks are made with minimal, natural preservatives. We prioritize freshness and traditional recipes. Some products may contain salt as a natural preservative.'
    },

    // Payment & Returns
    {
        category: 'Payment & Returns',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major payment methods: Credit/Debit cards (Visa, Mastercard, RuPay), UPI (GPay, PhonePe, Paytm), Net Banking, and Cash on Delivery (for eligible locations).'
    },
    {
        category: 'Payment & Returns',
        question: 'What is your return policy?',
        answer: 'We have a 100% Freshness Guarantee. If your snacks arrive damaged, wrong, or with quality issues, contact us within 48 hours with photos and we\'ll arrange a refund or replacement.'
    },
    {
        category: 'Payment & Returns',
        question: 'How long do refunds take?',
        answer: 'Once approved, refunds are processed within 24-48 hours. UPI/wallet refunds appear within 24-48 hours, while bank transfers may take 5-7 business days.'
    },

    // Gifting
    {
        category: 'Gifting',
        question: 'Can I send snacks as a gift?',
        answer: 'Absolutely! We offer beautiful gift boxes and hampers perfect for festivals, weddings, and special occasions. You can add a personalized message at checkout.'
    },
    {
        category: 'Gifting',
        question: 'Do you offer bulk/corporate orders?',
        answer: 'Yes! We cater to corporate gifting and bulk orders for events. Visit our Wholesale page or contact us for custom quotes and special pricing.'
    },
    {
        category: 'Gifting',
        question: 'Can I customize my gift box?',
        answer: 'Yes, for orders above ₹2000, we offer customization options including product selection, packaging, and personalized messages. Contact us to create your perfect gift.'
    },
];

const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))];

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const filteredFAQs = activeCategory === 'All'
        ? faqData
        : faqData.filter(item => item.category === activeCategory);

    return (
        <div className="container section-padding-lg">
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Frequently Asked Questions</h1>
                <p className={styles.subtitle}>
                    Can{"'"}t find what you{"'"}re looking for?{' '}
                    <Link href="/contact" className={styles.link}>Reach out to us</Link>
                </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
                className={styles.categoryFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </motion.div>

            {/* FAQ Accordion */}
            <div className={styles.faqList}>
                {filteredFAQs.map((item, index) => (
                    <motion.div
                        key={index}
                        className={styles.faqItem}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.03 }}
                    >
                        <button
                            className={`${styles.faqQuestion} ${openIndex === index ? styles.faqQuestionOpen : ''}`}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <span>{item.question}</span>
                            <span className={styles.faqIcon}>{openIndex === index ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    className={styles.faqAnswer}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p>{item.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Still Need Help */}
            <motion.div
                className={styles.helpBanner}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <h3>Still Have Questions?</h3>
                <p>Our support team is ready to help you with anything you need.</p>
                <div className={styles.helpActions}>
                    <Link href="/contact" className="btn-pop">Contact Support</Link>
                    <a href="mailto:hello@chettinad-snacks.com" className={styles.emailLink}>
                        Or email us at hello@chettinad-snacks.com
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
