// src/components/sections/Hero.tsx
import React, { useState, useEffect, useCallback } from 'react';
import styles from './Hero.module.css';
import { useInView } from 'react-intersection-observer';

const calculateTimeLeft = (targetDate: Date) => {
    const difference = +targetDate - +new Date();
    let timeLeft: { days: number; hours: number; minutes: number; seconds: number } | null = null;
    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    // --- ADD LOG ---
    // console.log("calculateTimeLeft result:", timeLeft); // Uncomment for verbose debugging
    return timeLeft;
};

const Hero: React.FC = () => {
    const targetDate = new Date('2025-04-09T18:00:00+02:00'); // Target: April 9, 2025, 6:00 PM CEST (UTC+2)
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null); // Initialize as null
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        console.log("Hero component mounted."); // <-- ADD LOG
        setHasMounted(true);

        // Initial calculation immediately on mount
        setTimeLeft(calculateTimeLeft(targetDate));

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, []); // Empty dependency array, runs once on mount

    const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: profileRef, inView: profileInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 100 });

    const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value);

    // --- ADD LOG ---
    console.log("Rendering Hero - hasMounted:", hasMounted, "timeLeft:", timeLeft);

    return (
        <section className={styles.hero} id="hero">
            <div className={`container ${styles.heroContainer}`}>
                <div
                    ref={contentRef}
                    className={`${styles.heroContent} ${contentInView ? 'animate fade-up' : 'animate'}`}
                >
                    <p className={styles.startDateAlert}>Starts April 9th, 2025</p>
                    <span className={styles.eyebrow}>8+ Month Immersive Program</span>
                    <h1>2025 Progressive Mediumship Course</h1>
                    <p className={styles.heroSubtitle}>
                        "As a medium, you are not allowed to give away your power — you are in charge of the sitting."
                    </p>

                    {/* --- COUNTDOWN TIMER --- */}
                    {/* Render based on hasMounted AND timeLeft */}
                    {hasMounted && (
                        <div className={styles.countdownTimer}>
                            {timeLeft ? (
                                <>
                                    <div className={styles.timeBlock}><span className={styles.timeValue}>{timeLeft.days}</span><span className={styles.timeLabel}>Days</span></div>
                                    <div className={styles.timeBlock}><span className={styles.timeValue}>{addLeadingZero(timeLeft.hours)}</span><span className={styles.timeLabel}>Hours</span></div>
                                    <div className={styles.timeBlock}><span className={styles.timeValue}>{addLeadingZero(timeLeft.minutes)}</span><span className={styles.timeLabel}>Mins</span></div>
                                    <div className={styles.timeBlock}><span className={styles.timeValue}>{addLeadingZero(timeLeft.seconds)}</span><span className={styles.timeLabel}>Secs</span></div>
                                </>
                            ) : (
                                <span className={styles.timerEnded}>The course may have already started!</span>
                            )}
                        </div>
                    )}
                    {/* --- END COUNTDOWN TIMER --- */}

                    <a href="#about" className={`btn btn-accent btn-large ${styles.heroCta}`}>
                        Discover Your Medium Path
                    </a>
                </div>

                 {/* Profile Container */}
                <div ref={profileRef} className={`${styles.profileContainer} ${profileInView ? 'animate fade-up' : 'animate'}`}>
                    {/* ... profile content ... */}
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