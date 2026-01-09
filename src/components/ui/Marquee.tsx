import { IconWarning } from '@/components/ui/Icons';
import styles from './Marquee.module.css';

interface MarqueeProps {
    text?: React.ReactNode;
    repeat?: number;
}

export default function Marquee({
    text = <><IconWarning size={14} /> WARNING: HIGHLY ADDICTIVE SNACKS INSIDE —</>,
    repeat = 8
}: MarqueeProps) {
    const repeatedContent = Array(repeat).fill(null).map((_, i) => (
        <span key={i} style={{ marginRight: '1rem' }}>{text}</span>
    ));

    return (
        <div className={styles.strip}>
            <div className={styles.content}>
                <span style={{ display: 'flex', gap: '1rem' }}>{repeatedContent}</span>
                <span style={{ display: 'flex', gap: '1rem' }}>{repeatedContent}</span>
            </div>
        </div>
    );
}
