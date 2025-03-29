// src/components/ui/FAQItem.tsx
import React, { useRef, useEffect } from 'react';
import styles from './FAQItem.module.css';

interface FAQItemProps {
    id: number;
    question: string;
    answer: React.ReactNode;
    isOpen: boolean;
    onToggle: (id: number) => void;
    className?: string; // For animation classes passed from parent
}

const FAQItem: React.FC<FAQItemProps> = ({ id, question, answer, isOpen, onToggle, className }) => {
    const answerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null); // Ref for the inner content

    // Set max-height dynamically for smooth animation
    useEffect(() => {
        const answerEl = answerRef.current;
        const contentEl = contentRef.current;
        if (answerEl && contentEl) {
            if (isOpen) {
                // Set max-height to the scrollHeight of the content
                answerEl.style.maxHeight = `${contentEl.scrollHeight}px`;
            } else {
                answerEl.style.maxHeight = '0';
            }
        }
    }, [isOpen]); // Re-run when isOpen changes

    return (
        // Combine module class with animation class from props
        <div className={`${styles.faqItem} ${isOpen ? styles.active : ''} ${className || ''}`}>
            {/* Question Button */}
            <button
                type="button" // Explicitly set type
                className={styles.faqQuestion}
                onClick={() => onToggle(id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${id}`} // Link button to answer panel
            >
                <span className={styles.questionText}>{question}</span>
                <div className={styles.faqToggle} aria-hidden="true"></div> {/* Decorative */}
            </button>

            {/* Answer Panel */}
            <div
                ref={answerRef}
                className={styles.faqAnswer}
                id={`faq-answer-${id}`}
                aria-hidden={!isOpen} // Hide from screen readers when closed
            >
                 {/* Inner div to measure scrollHeight */}
                <div ref={contentRef} className={styles.faqAnswerContent}>
                    {answer}
                </div>
            </div>
        </div>
    );
};

export default FAQItem;