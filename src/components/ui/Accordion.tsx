'use client';

import { useState } from 'react';
import styles from './Accordion.module.css';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`${styles.item} ${isOpen ? styles.active : ''}`}>
            <button
                className={styles.header}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                {title}
                <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
                <div className={styles.content}>
                    {children}
                </div>
            )}
        </div>
    );
}

interface AccordionProps {
    children: React.ReactNode;
}

export default function Accordion({ children }: AccordionProps) {
    return (
        <div className={styles.accordion}>
            {children}
        </div>
    );
}
