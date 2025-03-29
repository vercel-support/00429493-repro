// src/components/sections/Hero.tsx
import React from 'react';
import styles from './Hero.module.css';
import { useInView } from 'react-intersection-observer';

const Hero: React.FC = () => {
  const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: profileRef, inView: profileInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 100 }); // Shorter delay

  return (
    // Add ID for potential skip links or deep linking
    <section className={styles.hero} id="hero">
      {/* Use global container */}
      <div className={`container ${styles.heroContainer}`}>
        <div
          ref={contentRef}
          // Combine module class with animation classes
          className={`${styles.heroContent} ${contentInView ? 'animate fade-up' : 'animate'}`}
        >
          <span className={styles.eyebrow}>8+ Month Immersive Program</span>
          {/* Heading inherits global styles */}
          <h1>2025 Progressive Mediumship Course</h1>
          <p className={styles.heroSubtitle}>
            "As a medium, you are not allowed to give away your power — you are in charge of the sitting."
          </p>
          {/* Uses global btn classes */}
          <a href="#about" className={`btn btn-accent btn-large ${styles.heroCta}`}>
              Discover Your Medium Path
          </a>
        </div>

        <div
           ref={profileRef}
           className={`${styles.profileContainer} ${profileInView ? 'animate fade-up' : 'animate'}`}
         >
          <div className={styles.profileImageWrapper}>
            <div className={styles.profileGlow}></div>
            {/* Ensure image is in /public/images */}
            <img src="/images/mia-ottosson.jpeg" alt="Mia Ottosson" className={styles.profileImage} loading="eager" fetchPriority="high" />
          </div>
          {/* profileName uses h2 tag, styled by module */}
          <h2 className={styles.profileName}>Mia Ottosson</h2>
          <p className={styles.profileTitle}>
              Professional Medium with 30+ years of experience and Tutor at the Arthur Findlay College
          </p>
          {/* Use global pulse animation class */}
          <span className={`${styles.profileSpots} pulse`}>Last 5 Spots</span>
          {/* profileCta is an <a> styled by module */}
          <a href="#pricing" className={styles.profileCta}>
              Secure Your Place
          </a>
        </div>
      </div>
      {/* Background pattern handled by ::before in CSS */}
    </section>
  );
};

export default Hero;