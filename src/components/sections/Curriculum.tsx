// src/components/sections/Curriculum.tsx
import React from 'react';
import styles from './Curriculum.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; // Assuming heart icon usage
import { useInView } from 'react-intersection-observer';

const curriculumItems = [
    "Sitting in the power - The foundation of spiritual charisma",
    "Building compelling evidence that resonates and validates",
    "Developing clairsentience, clairvoyance, claircognizance",
    "Quick connection techniques - establishing links in seconds",
    "Working from the heart as a medium - authentic connection", // Added placeholder for icon
    "Timeline techniques - telling the spirit's complete story",
    "Balancing psychic and mediumistic energies",
    "Finding your unique medium voice and approach",
    "Creating sustainable boundaries and energy management",
];

const Curriculum: React.FC = () => {
    const { ref: headingRef, inView: headingInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: gridRef, inView: gridInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 100 });
    const { ref: imageRef, inView: imageInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 200 }); // Animation for image column

    return (
        // Use global section classes and ID
        <section className="section section-border" id="curriculum">
            {/* Use global container */}
            <div className="container">
                {/* Use global section-heading */}
                <div ref={headingRef} className={`section-heading ${headingInView ? 'animate fade-up' : 'animate'}`}>
                    {/* Removed subtitle span as it's handled differently below */}
                    <h2>Comprehensive Medium Development</h2>
                    <p>This 8+ month journey provides a complete pathway to confident, authentic mediumship. Through live mentoring and experimentation, you'll develop skills that transform your practice.</p>
                </div>

                {/* Use module style for grid */}
                <div ref={gridRef} className={styles.contentGrid}>
                    {/* Left Content Area */}
                    <div className={`${styles.contentLeft} ${gridInView ? 'animate fade-up' : 'animate'}`}>
                        {/* Specific subtitle style */}
                        <span className={`section-subtitle ${styles.curriculumSubtitle}`}>WHAT YOU'LL LEARN</span>

                        {/* Check list */}
                        <ul className={`check-list ${styles.checkList}`}>
                            {curriculumItems.map((item, index) => (
                                <li key={index}>
                                    {item.includes("heart as a medium") ? (
                                         <>
                                            Working from the <span className={`heart-wrapper ${styles.heartWrapper}`}><FontAwesomeIcon icon={faHeart}/></span> as a medium - authentic connection
                                         </>
                                    ) : (
                                        item
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Highlight Box */}
                         {/* Use global highlight-box */}
                        <div className={`highlight-box ${styles.highlightBox}`}>
                            <p>"This isn't another basic course or weekend workshop. This is about discovering your authentic medium voice through consistent practice and personalized guidance."</p>
                        </div>

                         {/* Use global button classes */}
                        <a href="#pricing" className={`btn btn-primary ${styles.curriculumCta}`}>
                            Secure Your Place
                        </a>
                    </div>

                    {/* Right Content Area (Images) - Hidden on mobile via CSS */}
                    <div ref={imageRef} className={`${styles.contentImage} ${imageInView ? 'animate fade-up' : 'animate'}`}>
                         {/* Ensure images are in /public/images */}
                        <img src="/images/spiritual-connection.jpeg" alt="Spiritual Connection" loading="lazy" />
                        <img src="/images/mediumship-balance.jpeg" alt="Mediumship Balance" loading="lazy" />
                        {/* Original CSS had swipe hint ::before for mobile, might not be needed now */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Curriculum;