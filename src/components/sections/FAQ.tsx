// src/components/sections/FAQ.tsx
import React, { useState } from 'react';
import FAQItem from '../ui/FAQItem'; // Import the item component
import styles from './FAQ.module.css';
import { useInView } from 'react-intersection-observer';

// Define the structure for FAQ data
interface FAQData {
    id: number;
    question: string;
    answer: React.ReactNode; // Can contain JSX
}

// FAQ Content (move to separate file if it gets large)
const faqData: FAQData[] = [
    {
        id: 1,
        question: "Am I experienced enough for this program?",
        answer: (
            <>
                <p>This program is designed for developing mediums with some basic experience—you should have at least attempted to connect with spirit, whether in classes or on your own. You don't need to be "good" at it yet (that's why you're joining the program!), but you should have a basic understanding of what mediumship involves.</p>
                <p>If you're completely new to mediumship, I recommend starting with some foundational classes before joining this comprehensive program.</p>
            </>
        )
    },
    {
        id: 2,
        question: "What if I can't attend all the live sessions?",
        answer: (
             <>
                <p>While live participation offers the most value, I understand that life happens. All sessions are recorded and available for 30 days afterward. For practice sessions, you'll be paired with other students for additional practice between our live meetings.</p>
                <p>I recommend attending at least 75% of the sessions live to get the full benefit of the program, but many students have successfully completed the program while missing some sessions.</p>
            </>
        )
    },
     {
        id: 3,
        question: "Why isn't there a refund policy?",
        answer: (
             <>
                <p>The Progressive Mediumship Course is limited to just 14 students to ensure personalized attention and development. When you secure your spot, you're preventing someone else from joining. Given the limited nature of the program and the extensive preparation involved, we cannot offer refunds.</p>
                <p>This policy ensures that all participants are fully committed to the development journey. If you have questions about whether this program is right for you, please contact me directly before enrolling so we can make sure it's the perfect fit.</p>
            </>
        )
    },
     {
        id: 4,
        question: "How much practice is required outside of the live sessions?",
        answer: (
             <>
                <p>For optimal development, I recommend 2-3 hours per week of practice outside our sessions. This includes sitting in the power (ideally daily, even if just for 5-10 minutes) and practice readings with classmates or friends.</p>
                <p>Students who commit to regular practice see the most dramatic improvement, but the program is designed to be flexible for different schedules and commitments.</p>
            </>
        )
    },
    {
        id: 5,
        question: "What makes your program different from other medium courses?",
        answer: (
             <>
                 <p>Three key differences:</p>
                 <ol>
                     <li><strong>Personalized mentoring</strong> - With a maximum of 14 students, you receive individual guidance tailored to your unique gifts and challenges</li>
                     <li><strong>Open experimentation</strong> - We embrace an exploratory approach that allows your authentic medium style to emerge naturally</li>
                     <li><strong>Progressive structure</strong> - Skills build systematically over 8+ months, creating lasting development rather than temporary inspiration</li>
                 </ol>
                 <p>Most importantly, I teach from my 30+ years of professional experience—sharing not just what works, but what challenges you'll face and how to overcome them.</p>
             </>
        )
    },
    {
        id: 6,
        question: "What is the format of the live sessions?",
        answer: (
             <>
                 <p>Each live session is a blend of teaching, demonstration, and guided practice. The program includes two types of sessions:</p>
                 <ul>
                     <li><strong>Intensive Development Sessions (4 hours)</strong> - Introduction of new concepts, demonstrations, and initial guided practice</li>
                     <li><strong>Practice Sessions (2 hours)</strong> - Focused application of techniques with personalized feedback and refinement</li>
                 </ul>
                 <p>All sessions are interactive and experiential, with significant time devoted to actual mediumship practice.</p>
             </>
        )
    },
];

const FAQ: React.FC = () => {
    const [openFAQId, setOpenFAQId] = useState<number | null>(null);
    const { ref: headingRef, inView: headingInView } = useInView({ triggerOnce: true, threshold: 0.1 });
     const { ref: containerRef, inView: containerInView } = useInView({ triggerOnce: true, threshold: 0.05 }); // Trigger earlier for container

    const handleToggle = (id: number) => {
        setOpenFAQId(prevId => (prevId === id ? null : id));
    };

    return (
        // Use global section classes and ID
        <section className="section section-border" id="faq">
             {/* Use global container */}
            <div className="container">
                {/* Use global section-heading */}
                <div ref={headingRef} className={`section-heading ${headingInView ? 'animate fade-up' : 'animate'}`}>
                    <span className="section-subtitle">FAQs</span>
                    <h2>Common Questions</h2>
                </div>

                {/* Use module style for FAQ container */}
                <div ref={containerRef} className={styles.faqContainer}>
                    {faqData.map((item, index) => (
                        <FAQItem
                            key={item.id}
                            id={item.id}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openFAQId === item.id}
                            onToggle={handleToggle}
                            // Apply animation based on container visibility with delay
                            className={containerInView ? `animate fade-up delay-${index % 4}` : 'animate'}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;