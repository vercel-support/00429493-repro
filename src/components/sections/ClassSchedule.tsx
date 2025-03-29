// src/components/sections/ClassSchedule.tsx
import React from 'react';
import styles from './ClassSchedule.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faClock } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer';

const scheduleData = [
    { date: "Wednesday, April 9th", duration: "4 hours" },
    { date: "Wednesday, April 23rd", duration: "4 hours" },
    { date: "Wednesday, May 7th", duration: "4 hours" },
    { date: "Wednesday, May 28th", duration: "2 hours" },
    { date: "Wednesday, June 11th", duration: "4 hours" },
    { date: "Wednesday, June 25th", duration: "2 hours" },
    { date: "Wednesday, August 20th", duration: "4 hours" },
    { date: "Wednesday, September 3rd", duration: "2 hours" },
    { date: "Wednesday, September 24th", duration: "4 hours" },
    { date: "Wednesday, October 8th", duration: "4 hours" },
    { date: "Wednesday, October 29th", duration: "2 hours" },
    { date: "Wednesday, November 12th", duration: "4 hours" },
];

const ClassSchedule: React.FC = () => {
    const { ref: headingRef, inView: headingInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: scheduleBoxRef, inView: scheduleBoxInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 100 });
    const { ref: alertRef, inView: alertInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 200 });
    const { ref: noteRef, inView: noteInView } = useInView({ triggerOnce: true, threshold: 0.1, delay: 300 });

    return (
        // Use global section class, add ID
        <section className="section" id="schedule">
             {/* Use global container */}
            <div className="container">
                {/* Use global section-heading */}
                <div ref={headingRef} className={`section-heading ${headingInView ? 'animate fade-up' : 'animate'}`}>
                    <span className="section-subtitle">Program Details</span>
                    <h2>2025 Class Schedule</h2>
                    <p>Our journey begins April 9th, 2025 with regular sessions to build your mediumship skills progressively</p>
                </div>

                {/* Use module styles for schedule box and animation */}
                <div ref={scheduleBoxRef} className={`${styles.compactSchedule} ${scheduleBoxInView ? 'animate fade-up' : 'animate'}`}>
                    <div className={styles.scheduleHeader}>
                        <h3>Class Times</h3>
                        {/* Use module style */}
                        <p className={styles.scheduleHeaderSubtitle}>4-hour sessions: 6pm-10pm | 2-hour sessions: 6pm-8pm</p>
                    </div>

                    <div className={styles.scheduleGrid}>
                        {scheduleData.map((item, index) => (
                            <div key={index} className={styles.scheduleItem}>
                                <span className={styles.scheduleDate}>{item.date}</span>
                                <span className={styles.scheduleDuration}>{item.duration}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timezone Alert - use module styles and animation */}
                <div ref={alertRef} className={`${styles.timezoneAlert} ${alertInView ? 'animate fade-up' : 'animate'}`}>
                    <div className={styles.timezoneIcon}>
                        <FontAwesomeIcon icon={faGlobe} />
                    </div>
                    <div className={styles.timezoneContent}>
                        <p>All class times are in Sweden time zone (CET/CEST)</p>
                        <a href="https://dateful.com/time-zone-converter" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faClock} style={{ marginRight: '5px' }}/> Check your local time zone
                        </a>
                    </div>
                </div>

                {/* Schedule Note - use module styles and animation */}
                <div ref={noteRef} className={`${styles.scheduleNote} ${noteInView ? 'animate fade-up' : 'animate'}`}>
                    <p><strong>Important:</strong> While recordings will be available, we strongly encourage live attendance at all sessions as the interactive nature of the training is essential for development. Please review the schedule carefully to ensure you can commit to the program dates before enrolling.</p>
                </div>
            </div>
        </section>
    );
};

export default ClassSchedule;