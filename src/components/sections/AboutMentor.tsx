// src/components/sections/AboutMentor.tsx
import React from 'react';
import styles from './AboutMentor.module.css';
import { useInView } from 'react-intersection-observer';

const AboutMentor: React.FC = () => {
    const { ref: containerRef, inView: containerInView } = useInView({ triggerOnce: true, threshold: 0.05 });
     const { ref: imageRef, inView: imageInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 100 });
     const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 200 });

    const mentorStats = [
        { number: '30+', label: 'Years Experience' },
        { number: '25+', label: 'Years Teaching' },
        { number: '5000+', label: 'Students Mentored' },
    ];

    return (
         // Use global section class and ID
        <section className="section" id="about-mentor">
             {/* Use global container */}
            <div className="container">
                {/* Use module style for the styled container box */}
                <div ref={containerRef} className={styles.aboutMentorContainer}>
                    {/* Content inside the styled box needs its own container for padding */}
                    <div className={styles.innerContainer}>
                         {/* Use global section-heading */}
                        <div className={`section-heading ${styles.mentorHeading} ${containerInView ? 'animate fade-up' : 'animate'}`}>
                            <span className="section-subtitle">Your Mentor</span>
                            <h2>About Mia Ottosson</h2>
                        </div>

                        {/* Use module style for grid */}
                        <div className={styles.aboutMentorGrid}>
                            {/* Image Side */}
                            <div ref={imageRef} className={`${styles.mentorImageContainer} ${imageInView ? 'animate fade-up' : 'animate'}`}>
                                 {/* Ensure image is in /public/images */}
                                <img src="/images/mia-ottosson.jpeg" alt="Mia Ottosson" className={styles.mentorImage} loading="lazy" />
                                <div className={styles.mentorAccent}></div>
                            </div>

                            {/* Text Content Side */}
                            <div ref={contentRef} className={`${styles.mentorContent} ${contentInView ? 'animate fade-up' : 'animate'}`}>
                                <p>Mia has been working as a professional medium for 30+ years. She is the only one from the Nordic countries who is a Tutor and a Course Organizer at the Arthur Findlay College.</p>

                                 {/* Mentor Stats */}
                                <div className={styles.mentorStats}>
                                    {mentorStats.map((stat, index) => (
                                        <div key={index} className={styles.mentorStatItem}>
                                            <div className={styles.mentorStatNumber}>{stat.number}</div>
                                            <div className={styles.mentorStatLabel}>{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <p>What separates my teaching approach is my commitment to honesty and authenticity. I don't pretend to have all the answers or present myself as a perfect medium. Instead, I share my own challenges, mistakes, and breakthroughs, creating a safe space for genuine exploration and growth.</p>

                                 {/* Mentor Quote */}
                                <div className={styles.mentorQuote}>
                                    "I think everybody who embarks on this journey should give themselves a tap on the shoulder because it takes courage to look into yourself. It takes courage to be yourself."
                                </div>

                                <p>Beyond traditional mediumship, I also work with Psychic and Spiritual Art by creating Spirit Portraits and Soul Pictures, also known as Auragraphs. This multi-dimensional approach helps me connect with spirit in different ways and enhances my ability to provide evidence and insights.</p>

                                <p>I believe that every medium must find their own unique voice and approach. My role is not to create copies of myself but to help you discover and refine your authentic medium gifts in a way that feels true to who you are.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMentor;