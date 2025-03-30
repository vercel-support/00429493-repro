// src/components/sections/Hero.tsx
import React from 'react'; // Removed useState, useEffect
import styles from './Hero.module.css';
import { useInView } from 'react-intersection-observer';

const Hero: React.FC = () => {
    // Timer state and effect REMOVED

    // Animation Refs
    const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: profileRef, inView: profileInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 100 });

    return (
        <section className={styles.hero} id="hero">
            <div className={`container ${styles.heroContainer}`}>
                {/* Hero Content */}
                <div
                    ref={contentRef}
                    className={`${styles.heroContent} ${contentInView ? 'animate fade-up' : 'animate'}`}
                >
                    {/* Container for top badges */}
                    <div className={styles.topBadgesContainer}>
                        {/* Alert Kept */}
                        <p className={styles.startDateAlert}>Starts April 9th, 2025</p>
                        {/* Eyebrow Kept */}
                        <span className={styles.eyebrow}>8+ Month Immersive Program</span>
                    </div>

                    <h1>2025 Progressive Mediumship Course</h1>
                    <p className={styles.heroSubtitle}>
                        "As a medium, you are not allowed to give away your power — you are in charge of the sitting."
                    </p>

                    {/* Countdown Timer JSX block COMPLETELY REMOVED */}

                    <a href="#about" className={`btn btn-accent btn-large ${styles.heroCta}`}>
                        Discover Your Medium Path
                    </a>
                </div>

                 {/* Profile Container */}
                <div ref={profileRef} className={`${styles.profileContainer} ${profileInView ? 'animate fade-up' : 'animate'}`}>
                     <div className={styles.profileImageWrapper}>
                         <div className={styles.profileGlow}></div>
                         <img src="/images/mia-ottosson.jpeg" alt="Mia Ottosson" className={styles.profileImage} loading="eager" fetchPriority="high" />
                     </div>
                     <h2 className={styles.profileName}>Mia Ottosson</h2>
                     <p className={styles.profileTitle}>
                         Professional Medium with 30+ years of experience and Tutor at the Arthur Findlay College
                     </p>
                     <span className={`${styles.profileSpots} pulse`}>Last 5 Spots</span>
                     <a href="#pricing" className={styles.profileCta}>
                         Secure Your Place
                     </a>
                 </div>
            </div>
        </section>
    );
};

export default Hero;