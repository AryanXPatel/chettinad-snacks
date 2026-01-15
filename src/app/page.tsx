'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { getAllProducts, getProductsByCollection, isShopifyEnabled, TransformedProduct } from '@/lib/shopify';
import { IconStarFilled, IconLeaf, IconExplosion, IconWarning, StarRating } from '@/components/ui/Icons';
import styles from './page.module.css';

// Static fallback products
const staticFeaturedProducts = [
  { id: 'thenkuzhal', slug: 'thenkuzhal-thenkulal', title: 'Thenkuzhal', description: 'The classic honey-coil crunch.', price: 99, image: '/images/product_thenkuzhal_1767719548617.png', bgColor: '#FFFDF5' },
  { id: 'kai-murukku', slug: 'kai-murukku', title: 'Kai Murukku', description: 'Hand-twisted artisan spirals.', price: 189, image: '/images/product_kai_murukku_1767719570423.png', bgColor: '#FFE0B2' },
  { id: 'athirasam', slug: 'athirasam', title: 'Athirasam', description: 'Soft jaggery sweet delight.', price: 199, image: '/images/product_athirasam_1767719634660.png', bgColor: '#E1BEE7' },
  { id: 'seepu-seedai', slug: 'seepu-seedai', title: 'Seepu Seedai', description: 'Ridged crispy rice balls.', price: 149, image: '/images/product_seedai_1767719614268.png', bgColor: '#B2DFDB' },
];

// Truncate description helper
function truncateDesc(desc: string): string {
  const clean = desc.replace(/<[^>]*>/g, '').trim();
  const firstSentence = clean.split(/[.!?]/)[0];
  return firstSentence.length <= 50 ? firstSentence + '.' : firstSentence.substring(0, 50) + '...';
}

export default function Home() {
  const { addItem } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState(staticFeaturedProducts);

  // Fetch bestsellers from Shopify best-sellers collection
  useEffect(() => {
    const fetchBestsellers = async () => {
      if (isShopifyEnabled()) {
        try {
          // Fetch directly from the best-sellers collection
          const bestsellers = await getProductsByCollection('best-sellers');

          if (bestsellers.length > 0) {
            setFeaturedProducts(bestsellers.map((p: TransformedProduct) => ({
              id: p.id,
              slug: p.slug,
              title: p.title.split(' - ')[0], // Get short title before dash
              description: p.description,
              price: p.price,
              image: p.image,
              bgColor: p.bgColor || '#FFFDF5',
            })));
          } else {
            // Fallback: try getting products with best-seller tag
            const allProducts = await getAllProducts();
            const taggedBestsellers = allProducts.filter((p: TransformedProduct) =>
              p.tags?.includes('best-seller')
            );

            if (taggedBestsellers.length > 0) {
              setFeaturedProducts(taggedBestsellers.map((p: TransformedProduct) => ({
                id: p.id,
                slug: p.slug,
                title: p.title.split(' - ')[0],
                description: p.description,
                price: p.price,
                image: p.image,
                bgColor: p.bgColor || '#FFFDF5',
              })));
            }
          }
        } catch (error) {
          console.error('Error fetching bestsellers:', error);
        }
      }
    };
    fetchBestsellers();
  }, []);

  const handleAddToCart = (product: typeof staticFeaturedProducts[0], e: React.MouseEvent) => {
    addItem({
      id: product.id,
      slug: product.slug || product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      category: 'Murukku',
      bgColor: product.bgColor,
      accentColor: '#F0AD4E',
    }, 1, '250g');

    const button = e.currentTarget as HTMLButtonElement;
    const originalText = button.innerText;
    button.innerText = 'YUM! 😋';
    button.style.background = '#5CB85C';
    button.style.boxShadow = '0 6px 0 #4cae4c';
    setTimeout(() => {
      button.innerText = originalText;
      button.style.background = '';
      button.style.boxShadow = '';
    }, 1500);
  };

  return (
    <>
      {/* Hero Section - Exact match */}
      <section className={`container ${styles.heroSplit}`}>
        <div style={{ zIndex: 10 }}>
          <div className={styles.tagline}>Grandma's recipe. Modern crunch.</div>
          <h1 className={styles.heroTitle}>
            Don't Just Snack.<br />
            <span style={{ color: 'var(--color-chilli)' }}>Celebrate.</span>
          </h1>
          <p className={styles.heroDescription}>
            Authentic Chettinad treats handmade with zero preservatives and 100% pure gingelly oil. The taste you remember, delivered to your door.
          </p>
          <div className={styles.heroCta}>
            <Link href="/shop" className="btn-pop">Shop Best Sellers</Link>
            <div className={styles.trustPill}>
              <IconStarFilled size={18} style={{ color: 'var(--color-turmeric)' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>4.9/5 from 10k+ Fans</span>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div className={styles.heroCircle}></div>
          <Image
            src="/images/product_thenkuzhal_1767719548617.png"
            alt="Thenkuzhal Murukku"
            width={500}
            height={500}
            className={styles.heroImage}
            priority
          />
          <div className={`${styles.floatie} ${styles.floatieLeft}`}><IconExplosion size={16} style={{ color: 'var(--color-chilli)' }} /> Crunchy!</div>
          <div className={`${styles.floatie} ${styles.floatieRight}`}>No Palm Oil <IconLeaf size={16} style={{ color: '#4CAF50' }} /></div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="container" style={{ padding: '4rem 0' }}>
        <h2 className="text-center" style={{ marginBottom: '3rem' }}>Shop Your Cravings</h2>
        <div className={styles.categoryGrid}>
          {[
            { name: 'Murukku', bg: '#FFE082', image: '/images/cat_murukku_pop.png' },
            { name: 'Sweets', bg: '#FFAB91', image: '/images/cat_sweets_pop.png' },
            { name: 'Seedai', bg: '#80CBC4', image: '/images/cat_seedai_pop.png' },
          ].map((cat) => (
            <Link href={`/shop?category=${cat.name}`} key={cat.name} className={styles.categoryCard}>
              <div className={styles.categoryImageWrapper} style={{ background: cat.bg }}>
                <Image src={cat.image} alt={cat.name} width={200} height={200} className={styles.categoryImage} />
              </div>
              <h3>{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Warning Marquee */}
      <div className={styles.marqueeStrip} style={{ marginBottom: '4rem' }}>
        <div className={styles.marqueeContent}>
          <span><IconWarning size={14} /> WARNING: HIGHLY ADDICTIVE SNACKS INSIDE — <IconWarning size={14} /> WARNING: HIGHLY ADDICTIVE SNACKS INSIDE — <IconWarning size={14} /> WARNING: HIGHLY ADDICTIVE SNACKS INSIDE — <IconWarning size={14} /> WARNING: HIGHLY ADDICTIVE SNACKS INSIDE — </span>
          <span><IconWarning size={14} /> WARNING: HIGHLY ADDICTIVE SNACKS INSIDE — <IconWarning size={14} /> WARNING: HIGHLY ADDICTIVE SNACKS INSIDE — <IconWarning size={14} /> WARNING: HIGHLY ADDICTIVE SNACKS INSIDE — <IconWarning size={14} /> WARNING: HIGHLY ADDICTIVE SNACKS INSIDE — </span>
        </div>
      </div>

      {/* Featured Products - Exact match */}
      <section className="container" style={{ paddingBottom: '6rem' }}>
        <h2 className="text-center" style={{ marginBottom: '3rem' }}>Bestsellers</h2>
        <div className={styles.productGrid}>
          {featuredProducts.map((product) => (
            <article key={product.id} className={styles.productCard}>
              <Link href={`/product/${product.slug || product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.cardImgBg} style={{ background: product.bgColor }}>
                  <Image src={product.image} alt={product.title} width={200} height={200} />
                </div>
                <h3>{product.title}</h3>
                <p className={styles.productDesc}>{truncateDesc(product.description)}</p>
                <div className={styles.priceTag}>₹{product.price}</div>
              </Link>
              <button className={`btn-pop ${styles.addBtn}`} onClick={(e) => handleAddToCart(product, e)}>Add to Cart</button>
            </article>
          ))}
        </div>
        <div className={styles.viewAllWrapper}>
          <Link href="/shop" className="btn-pop btn-pop--gold">View All Snacks</Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className={styles.trustSection}>
        <div className={`container ${styles.trustGrid}`}>
          <div className={styles.trustBadge}>
            <div className={styles.trustIcon}>
              <Image src="/images/icon_clean.png" alt="Clean Label" width={100} height={100} />
            </div>
            <h3 style={{ color: 'var(--color-chilli)', marginBottom: '0.5rem' }}>Clean Label</h3>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '1rem', lineHeight: 1.4 }}>
              Zero preservatives.<br />100% Pure Gingelly Oil.
            </p>
          </div>
          <div className={styles.trustBadge}>
            <div className={styles.trustIcon}>
              <Image src="/images/icon_handmade.png" alt="Hand-Twisted" width={100} height={100} />
            </div>
            <h3 style={{ color: 'var(--color-turmeric)', marginBottom: '0.5rem' }}>Hand-Twisted</h3>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '1rem', lineHeight: 1.4 }}>
              Made by skilled artisans<br />in Karaikudi daily.
            </p>
          </div>
          <div className={styles.trustBadge}>
            <div className={styles.trustIcon}>
              <Image src="/images/icon_shipping.png" alt="Fresh Drops" width={100} height={100} />
            </div>
            <h3 style={{ color: 'var(--color-chilli)', marginBottom: '0.5rem' }}>Fresh Drops</h3>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '1rem', lineHeight: 1.4 }}>
              Shipped within 24hrs<br />of making.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>How We Craft The Crunch</h2>
        <div className={styles.processGrid}>
          <div className={styles.processStep}>
            <div className={styles.stepNumber} style={{ color: '#FFE082' }}>01</div>
            <h3 style={{ margin: '1rem 0' }}>Rice & Spice</h3>
            <p className={styles.stepText}>We grind our own rice flour and mix it with roasted spices.</p>
          </div>
          <div className={styles.processArrow}>→</div>
          <div className={styles.processStep}>
            <div className={styles.stepNumber} style={{ color: '#FFAB91' }}>02</div>
            <h3 style={{ margin: '1rem 0' }}>The Twist</h3>
            <p className={styles.stepText}>Artisans hand-squeeze the dough into perfect spirals.</p>
          </div>
          <div className={styles.processArrow}>→</div>
          <div className={styles.processStep}>
            <div className={styles.stepNumber} style={{ color: '#80CBC4' }}>03</div>
            <h3 style={{ margin: '1rem 0' }}>Golden Fry</h3>
            <p className={styles.stepText}>Deep fried in pure gingelly oil until golden perfect.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialSection}>
        <div className="container text-center">
          <h2 style={{ color: 'var(--color-coffee)', marginBottom: '3rem' }}>Love Letters</h2>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <StarRating size={16} />
              <p className={styles.testimonialText}>"I haven't had Kai Murukku this authentic since my grandmother passed. The twist is perfect."</p>
              <div className={styles.author}>— Priya R.</div>
            </div>
            <div className={styles.testimonialCard}>
              <StarRating size={16} />
              <p className={styles.testimonialText}>"That gingelly oil aroma when you open the pack... instant nostalgia. 10/10."</p>
              <div className={styles.author}>— Karthik S.</div>
            </div>
            <div className={styles.testimonialCard}>
              <StarRating size={16} />
              <p className={styles.testimonialText}>"Shipped to California in 3 days. Fresh as if it was made yesterday. Unbelievable."</p>
              <div className={styles.author}>— Sarah J.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container" style={{ padding: '4rem 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Common Cravings (FAQs)</h2>
        <div className={styles.faqContainer}>
          <details className={styles.faqItem}>
            <summary>Is this really made in Chettinad?</summary>
            <p>Yes! Our kitchen is located in the heart of Karaikudi. We use local rice and established family recipes.</p>
          </details>
          <details className={styles.faqItem}>
            <summary>Do you use Palm Oil?</summary>
            <p>Never. We only use 100% pure cold-pressed Gingelly (Sesame) oil for the authentic aroma and taste.</p>
          </details>
          <details className={styles.faqItem}>
            <summary>How long does it stay fresh?</summary>
            <p>Our snacks stay crisp for 30 days if kept air-tight. But they usually get eaten way before that!</p>
          </details>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container" style={{ padding: '4rem 0' }}>
        <div className={styles.newsletter}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Join The Crunch Club</h2>
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem', opacity: 0.9 }}>Get 15% OFF your first order + early access to new batches.</p>
            <div className={styles.newsletterForm}>
              <input type="email" placeholder="Enter your email" className={styles.newsletterInput} />
              <button className="btn-pop" style={{ background: 'var(--color-turmeric)', color: 'var(--color-coffee)', boxShadow: '0 4px 0 #F57F17' }}>Sign Me Up</button>
            </div>
          </div>
        </div>

        <div className={styles.instaHeader}>
          <h2>Fresh From The Gram</h2>
          <a href="https://instagram.com/chettinad_snacks" target="_blank" rel="noopener noreferrer" className="btn-pop" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>@chettinad_snacks</a>
        </div>
        <div className={styles.instaGrid}>
          <div className={styles.instaItem}><Image src="/images/instagram_post_template_1767719785089.png" alt="Instagram" width={300} height={300} /></div>
          <div className={styles.instaItem}><Image src="/images/lifestyle_teatime_1767719728352.png" alt="Instagram" width={300} height={300} /></div>
          <div className={styles.instaItem}><Image src="/images/lifestyle_festival_1767719748275.png" alt="Instagram" width={300} height={300} /></div>
          <div className={styles.instaItem}><Image src="/images/lifestyle_packaging_1767724627065.png" alt="Instagram" width={300} height={300} /></div>
        </div>
      </section>
    </>
  );
}
