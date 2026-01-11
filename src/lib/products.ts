// Product Types
export interface Product {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    image: string;
    category: 'Murukku' | 'Sweet' | 'Seedai';
    bgColor: string;
    accentColor: string;
    badge?: string;
}

// Static product data extracted from HTML wireframe
export const products: Product[] = [
    // Murukku Category
    {
        id: 'thenkuzhal',
        slug: 'thenkuzhal',
        title: 'Thenkuzhal',
        description: 'The classic honey-coil crunch. Our signature offering.',
        price: 99,
        image: '/images/product_thenkuzhal_1767719548617.png',
        category: 'Murukku',
        bgColor: '#FFE082',
        accentColor: '#F0AD4E',
    },
    {
        id: 'kai-murukku',
        slug: 'kai-murukku',
        title: 'Kai Murukku',
        description: 'Hand-twisted artisan spirals. The crown jewel of Chettinad snacking.',
        price: 189,
        compareAtPrice: 210,
        image: '/images/product_kai_murukku_1767719570423.png',
        category: 'Murukku',
        bgColor: '#FFE0B2',
        accentColor: '#E65100',
        badge: 'Best Seller',
    },
    {
        id: 'manakolam',
        slug: 'manakolam',
        title: 'Manakolam',
        description: 'Featherlight crispy ribbons with perfect texture.',
        price: 149,
        image: '/images/product_manakolam_1767724658933.png',
        category: 'Murukku',
        bgColor: '#FFF9C4',
        accentColor: '#FBC02D',
    },
    {
        id: 'kalyana-murukku',
        slug: 'kalyana-murukku',
        title: 'Kalyana Murukku',
        description: 'Grand wedding special. Perfect for celebrations.',
        price: 399,
        image: '/images/product_kalyana_murukku_1767724483774.png',
        category: 'Murukku',
        bgColor: '#FFCCBC',
        accentColor: '#D84315',
    },
    {
        id: 'design-murukku',
        slug: 'design-murukku',
        title: 'Design Murukku',
        description: 'Artistic handcrafted patterns that delight.',
        price: 229,
        image: '/images/product_design_murukku_1767724503602.png',
        category: 'Murukku',
        bgColor: '#D1C4E9',
        accentColor: '#512DA8',
    },
    {
        id: 'kavuni-rice-murukku',
        slug: 'kavuni-rice-murukku',
        title: 'Kavuni Rice Murukku',
        description: 'Premium black rice antioxidant rich treats.',
        price: 249,
        image: '/images/product_kavuni_rice_1767719858699.png',
        category: 'Murukku',
        bgColor: '#212121',
        accentColor: '#FFFFFF',
    },
    {
        id: 'mini-thenkuzhal',
        slug: 'mini-thenkuzhal',
        title: 'Mini Thenkuzhal',
        description: 'Bite-sized kid friendly version of our classic.',
        price: 89,
        image: '/images/product_mini_thenkulal_1767724553201.png',
        category: 'Murukku',
        bgColor: '#B3E5FC',
        accentColor: '#0277BD',
    },
    {
        id: 'thattai',
        slug: 'thattai',
        title: 'Thattai',
        description: 'Thin & crispy rice crackers with sesame.',
        price: 119,
        image: '/images/product_thattai_1767719591952.png',
        category: 'Murukku',
        bgColor: '#DCEDC8',
        accentColor: '#558B2F',
    },
    // Seedai Category
    {
        id: 'seepu-seedai',
        slug: 'seepu-seedai',
        title: 'Seepu Seedai',
        description: 'Ridged savory rice balls with perfect crunch.',
        price: 149,
        image: '/images/product_seedai_1767719614268.png',
        category: 'Seedai',
        bgColor: '#B2DFDB',
        accentColor: '#00695C',
    },
    {
        id: 'sinna-seedai',
        slug: 'sinna-seedai',
        title: 'Sinna Seedai',
        description: 'Mini savory crunchy balls for snacking.',
        price: 99,
        image: '/images/product_sinna_seedai_1767724677602.png',
        category: 'Seedai',
        bgColor: '#CFD8DC',
        accentColor: '#455A64',
    },
    // Sweet Category
    {
        id: 'athirasam',
        slug: 'athirasam',
        title: 'Athirasam',
        description: 'Soft jaggery sweet delight made with love.',
        price: 199,
        image: '/images/product_athirasam_1767719634660.png',
        category: 'Sweet',
        bgColor: '#E1BEE7',
        accentColor: '#8E24AA',
    },
    {
        id: 'maavu-urundai',
        slug: 'maavu-urundai',
        title: 'Maavu Urundai',
        description: 'Sweet roasted flour balls with jaggery.',
        price: 179,
        image: '/images/product_maavu_urundai_1767724430259.png',
        category: 'Sweet',
        bgColor: '#F8BBD0',
        accentColor: '#AD1457',
    },
    {
        id: 'inippu-seedai',
        slug: 'inippu-seedai',
        title: 'Inippu Seedai',
        description: 'Sweet jaggery rice balls for festive occasions.',
        price: 169,
        image: '/images/product_inippu_seedai_1767724449115.png',
        category: 'Sweet',
        bgColor: '#C5CAE9',
        accentColor: '#283593',
    },
    {
        id: 'sweet-seeyam',
        slug: 'sweet-seeyam',
        title: 'Sweet Seeyam',
        description: 'Stuffed jaggery dumplings. A festive favorite.',
        price: 229,
        image: '/images/product_sweet_seeyam_1767724407196.png',
        category: 'Sweet',
        bgColor: '#D7CCC8',
        accentColor: '#5D4037',
    },

];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: Product['category']): Product[] {
    return products.filter(p => p.category === category);
}

export function getFeaturedProducts(count: number = 4): Product[] {
    return products.slice(0, count);
}

// Categories for navigation
export const categories = [
    { name: 'Murukku', slug: 'murukku', bgColor: '#FFE082', image: '/images/cat_murukku_pop.png' },
    { name: 'Sweets', slug: 'sweets', bgColor: '#FFAB91', image: '/images/cat_sweets_pop.png' },
    { name: 'Seedai', slug: 'seedai', bgColor: '#80CBC4', image: '/images/cat_seedai_pop.png' },
];
