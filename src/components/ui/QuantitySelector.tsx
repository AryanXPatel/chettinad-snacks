'use client';

import { useState } from 'react';
import styles from './QuantitySelector.module.css';

interface QuantitySelectorProps {
    value?: number;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
}

export default function QuantitySelector({
    value = 1,
    min = 1,
    max = 99,
    onChange
}: QuantitySelectorProps) {
    const [quantity, setQuantity] = useState(value);

    const handleChange = (newValue: number) => {
        if (newValue >= min && newValue <= max) {
            setQuantity(newValue);
            onChange?.(newValue);
        }
    };

    return (
        <div className={styles.selector}>
            <button
                className={styles.btn}
                onClick={() => handleChange(quantity - 1)}
                disabled={quantity <= min}
                aria-label="Decrease quantity"
            >
                −
            </button>
            <input
                type="text"
                className={styles.input}
                value={quantity}
                readOnly
                aria-label="Quantity"
            />
            <button
                className={styles.btn}
                onClick={() => handleChange(quantity + 1)}
                disabled={quantity >= max}
                aria-label="Increase quantity"
            >
                +
            </button>
        </div>
    );
}
