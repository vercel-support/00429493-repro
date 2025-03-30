// src/components/sections/Hero.tsx
import React, { useState, useEffect } from 'react'; // Import hooks
import styles from './Hero.module.css';
import { useInView } from 'react-intersection-observer';

// Helper function to calculate time left
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
    return timeLeft;
};

const Hero: React.FC = () => {
    // Target Date: April 9, 2025, 6:00 PM CEST (UTC+2)
    const targetDate = new Date('2025-04-09T18:00:00+02:00');
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
    const [hasMounted, setHasMounted] = useState(false);

    // Effect for Countdown Timer
    useEffect(() => {
        setHasMounted(true); // Indicate component has mounted on client
        setTimeLeft(calculateTimeLeft(targetDate)); // Initial calculation

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval
    }, []); // Empty dependency array, runs once on mount

    // Animation Refs
    const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: profileRef, inView: profileInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 100 });

    // Helper for leading zeros
    const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value);

    return (
        <section className={styles.hero} id="hero">
            <div className={`container ${styles.heroContainer}`}>
                <div
                    ref={contentRef}
                    className={`${styles.heroContent} ${contentInView ? 'animate fade-up' : 'animate'}`}
                >
                    {/* Start Date Alert */}
                    <p className={styles.startDateAlert}>Starts April 9th, 2025</p>

                    <span className={styles.eyebrow}>8+ Month Immersive Program</span>
                    <h1>2025 Progressive Mediumship Course</h1>
                    <p className={styles.heroSubtitle}>
                        "As a medium, you are not allowed to give away your power — you are in charge of the sitting."
                    </p>

                    {/* Countdown Timer */}
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
                    {/* End Countdown Timer */}

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