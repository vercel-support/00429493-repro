// src/components/sections/BonusMasterclass.tsx
import React from 'react';
import styles from './BonusMasterclass.module.css';
import { useInView } from 'react-intersection-observer';

const bonusChecklist = [
  { strong: "Mind as Interpreter", text: "— \"The mind is the greatest tool but it's also the one who messes up for us... When you get it wrong, it might not be wrong. It's just that you don't understand it yet.\"" },
  { strong: "The 50-50 Partnership", text: "— Discover why \"you are not a marionette to the spirit world\" and how to establish yourself as an equal partner in the communication" },
  { strong: "Overcoming Self-Doubt", text: "— Learn how Mia still manages insecurity even after 30+ years: \"Fake it till you make it... I'm faking my nerves, not my mediumship\"" },
  { strong: "Sitting in the Power", text: "— \"When you're sitting in the power, nothing happens and that's where everything happens... make time for that energy\"" },
  { strong: "Sustainable Practice", text: "— \"We need to learn to draw the line where we don't feel guilty for not giving enough\" to preserve your energy" }
];


const BonusMasterclass: React.FC = () => {
   const { ref: sectionRef, inView: sectionInView } = useInView({ triggerOnce: true, threshold: 0.05 });
   const { ref: imageRef, inView: imageInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 100 });
   const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 200 });

    return (
        <section ref={sectionRef} className={styles.bonusSection} id="bonus">
            <div className="container"> {/* Use global container */}
                <div className={styles.bonusContent}>
                    <div className={`text-center mb-4 ${sectionInView ? 'animate fade-up' : 'animate'}`}>
                        <span className={styles.bonusBadge}>Exclusive Bonus</span>
                        <h2>The Mind-Spirit Connection: Secrets to Powerful Mediumship</h2>
                        <p>An intimate 1-hour masterclass revealing Mia's internal process after decades as a professional medium</p>
                    </div>

                    <div className={styles.bonusGrid}>
                        {/* Image Side */}
                        <div ref={imageRef} className={`${styles.bonusImage} ${imageInView ? 'animate fade-up' : 'animate'}`}>
                            <div className={styles.mindSpiritContainer}>
                                <div className={styles.imageGlow}></div>
                                <img src="/images/mind-spirit-connection.jpeg" alt="The Mind-Spirit Connection" className={styles.mindSpiritImage} loading="lazy"/>
                                <div className={styles.bonusValue}>
                                    <span>Value</span>
                                    <span>€297</span>
                                </div>
                            </div>
                            <p className={styles.mindSpiritCaption}>Nurturing the authentic medium within you</p>
                        </div>

                        {/* Content Side - ADDED styles.bonusTextContent here */}
                        <div ref={contentRef} className={`${styles.bonusTextContent} ${contentInView ? 'animate fade-up' : 'animate'}`}>
                            <h3>Beyond Techniques: The Mental Framework of Exceptional Mediumship</h3>
                            <p>In this candid, revelatory session, Mia shares the internal mental processes that truly separate average mediums from exceptional ones. Unlike typical "how-to" classes, this masterclass addresses the deeper psychological aspects of mediumship that few teachers ever discuss.</p>

                            {/* Use global check-list style */}
                            <ul className={`check-list ${styles.bonusChecklist}`}>
                                {bonusChecklist.map((item, index) => (
                                    <li key={index}>
                                        <strong>{item.strong}</strong> {item.text}
                                    </li>
                                ))}
                            </ul>

                            {/* Use global highlight-box */}
                            <div className={`highlight-box ${styles.bonusHighlight}`}>
                                <p>"As soon as you put the intention there to start work with the spirit, everything that pops into your mind is there for a reason. Your mind will do everything in its power to help you, not the opposite."</p>
                            </div>

                            <p><strong>This rare, unfiltered look into a professional medium's mental process is not available separately and is exclusively for program participants.</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BonusMasterclass;