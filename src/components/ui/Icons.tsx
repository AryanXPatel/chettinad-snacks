import React from 'react';

interface IconProps {
    size?: number;
    color?: string;
    className?: string;
    style?: React.CSSProperties;
}

// Star filled icon for ratings
export const IconStarFilled: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color || 'currentColor'} className={className} style={style} aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

// Leaf icon for natural/vegan
export const IconLeaf: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
);

// Explosion/starburst icon for "Crunchy!" - improved design
export const IconExplosion: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color || 'currentColor'} className={className} style={style} aria-hidden="true">
        <path d="M12 0L14.59 7.41L22 4.5L17.5 10.5L24 12L17.5 13.5L22 19.5L14.59 16.59L12 24L9.41 16.59L2 19.5L6.5 13.5L0 12L6.5 10.5L2 4.5L9.41 7.41L12 0Z" />
    </svg>
);

// Warning triangle icon
export const IconWarning: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color || 'currentColor'} className={className} style={style} aria-hidden="true">
        <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 4v4h2v-4h-2zm0 6v2h2v-2h-2z" />
    </svg>
);

// Shopping cart icon
export const IconCart: React.FC<IconProps> = ({ size = 20, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

// Gift box icon
export const IconGift: React.FC<IconProps> = ({ size = 18, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13" />
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
);

// Book/story icon
export const IconBook: React.FC<IconProps> = ({ size = 18, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
);

// Chat/message icon
export const IconChat: React.FC<IconProps> = ({ size = 18, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

// Snack/cookie icon
export const IconSnack: React.FC<IconProps> = ({ size = 18, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="8" cy="9" r="1" fill={color || 'currentColor'} />
        <circle cx="15" cy="8" r="1" fill={color || 'currentColor'} />
        <circle cx="10" cy="14" r="1" fill={color || 'currentColor'} />
        <circle cx="16" cy="13" r="1" fill={color || 'currentColor'} />
        <circle cx="12" cy="10" r="1" fill={color || 'currentColor'} />
    </svg>
);

// Heart icon
export const IconHeart: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color || 'currentColor'} className={className} style={style} aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

// Party/celebration icon
export const IconParty: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color || 'currentColor'} className={className} style={style} aria-hidden="true">
        <path d="M5.8 21L1 3l18 4.8L12.3 12l4.2 4.5L5.8 21zM9 10l-4 7.3 7-3.3-3-4z" />
        <circle cx="17" cy="4" r="1.5" />
        <circle cx="20" cy="8" r="1" />
        <circle cx="21" cy="12" r="1.5" />
    </svg>
);

// Lock/secure icon
export const IconLock: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

// Close/X icon
export const IconClose: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// Clock/time icon
export const IconClock: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

// Box/package icon
export const IconBox: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
    </svg>
);

// Calendar icon
export const IconCalendar: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

// Tag/price icon
export const IconTag: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
        <path d="M7 7h.01" />
    </svg>
);

// Oil drop/container icon  
export const IconOil: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <path d="M12 2c0 0-6 6-6 10a6 6 0 0 0 12 0c0-4-6-10-6-10Z" />
        <circle cx="12" cy="14" r="2" fill={color || 'currentColor'} />
    </svg>
);

// Pot/cooking icon
export const IconPot: React.FC<IconProps> = ({ size = 16, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
        <path d="M2 12h20" />
        <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
        <path d="m4 8 2-2" />
        <path d="M10 4v4" />
        <path d="m20 8-2-2" />
    </svg>
);

// Chevron icon for navigation
export const IconChevron: React.FC<IconProps & { direction?: 'up' | 'down' | 'left' | 'right' }> = ({
    size = 16,
    color,
    className,
    style,
    direction = 'right'
}) => {
    const rotations = { up: -90, down: 90, left: 180, right: 0 };
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color || 'currentColor'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            style={{ ...style, transform: `rotate(${rotations[direction]}deg)` }}
            aria-hidden="true"
        >
            <polyline points="9 18 15 12 9 6" />
        </svg>
    );
};

// Stars rating component (5 filled stars)
export const StarRating: React.FC<IconProps> = ({ size = 14, color, className, style }) => (
    <span style={{ display: 'inline-flex', gap: '2px', ...style }} className={className} aria-label="5 out of 5 stars">
        {[...Array(5)].map((_, i) => (
            <IconStarFilled key={i} size={size} color={color || 'var(--color-turmeric, #FFC107)'} />
        ))}
    </span>
);

