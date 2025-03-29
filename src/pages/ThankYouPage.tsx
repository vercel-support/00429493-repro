// src/pages/ThankYouPage.tsx
import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarAlt, faClock, faUsers, faGift, faVideo, faCalendarCheck, faPlayCircle, faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import styles from './ThankYouPage.module.css';

// Declare fbq for TypeScript
declare global {
    interface Window {
        fbq?: (...args: any[]) => void;
    }
}

const ThankYouPage: React.FC = () => {
    const confirmationBoxRef = useRef<HTMLDivElement>(null);

    // --- Meta Pixel & Conversions API Tracking ---
    useEffect(() => {
        // --- 1. Client-Side Pixel Event ---
        if (window.fbq) {
            console.log('Firing Meta Pixel Purchase Event (Client-Side)');
            // *** IMPORTANT: Determine the actual value/currency ***
            // This is tricky since payment happened off-site.
            // Simplest approach: Use a default or average value.
            // Better: Pass info in the redirect URL from Calendly/PayPal if possible (but less secure for PII).
            // Best: Use webhooks from PayPal/Calendly to update your backend, then fetch the real value here (complex).
            // For now, we'll use the full payment price as an example.
            const purchaseValue = 1295; // Example: Full Payment Price
            const currency = 'EUR';     // Based on pricing section

            window.fbq('track', 'Purchase', {
                value: purchaseValue,
                currency: currency,
                content_name: 'Progressive Mediumship Course 2025', // Optional
                content_ids: ['PMC2025'], // Optional unique ID for the course
                content_type: 'product' // Optional
            });
        }

        // --- 2. Server-Side Conversions API Trigger ---
        const sendServerEvent = async () => {
            // Same value/currency challenge as above. Use consistent values.
            const purchaseValue = 1295; // Match client-side example
            const currency = 'EUR';     // Match client-side example
            const eventSourceUrl = window.location.href;

            // *** Security/Privacy Note ***
            // Avoid collecting sensitive user data (email, phone) directly on the client for CAPI.
            // The serverless function should ideally get this from a secure source (like a webhook payload or session)
            // or rely on Meta's automatic matching using IP/User Agent.
            // Sending only browser info is safer from the client.
            const browserData = {
                client_user_agent: navigator.userAgent,
                // You could try to read Meta's cookies (_fbc, _fbp) here if needed
                // fbc: getCookie('_fbc'), // Requires a getCookie helper function
                // fbp: getCookie('_fbp'),
            };

            try {
                console.log('Triggering Serverless function for CAPI Purchase event');
                // This fetch call goes to the serverless function we'll create in the 'api' folder
                const response = await fetch('/api/meta-event', { // Relative URL works with Vercel
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        eventName: 'Purchase',
                        eventTime: Math.floor(Date.now() / 1000), // Current time in seconds
                        eventSourceUrl: eventSourceUrl,
                        userData: browserData, // Send only browser data from client
                        customData: {
                            value: purchaseValue,
                            currency: currency,
                            content_name: 'Progressive Mediumship Course 2025',
                            content_ids: ['PMC2025'],
                            content_type: 'product'
                        },
                        actionSource: 'website',
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Serverless function CAPI Error:', errorData);
                } else {
                    const successData = await response.json();
                    console.log('Serverless function CAPI Success:', successData);
                }
            } catch (error) {
                console.error('Failed to trigger serverless CAPI function:', error);
            }
        };

        // Call the function to trigger the CAPI event via the serverless function
        sendServerEvent();

    }, []); // Run only once on component mount

    // --- Confetti Effect ---
    useEffect(() => {
        const isMobile = () => window.innerWidth <= 768;
        const colors = ['#845AFA', '#9D7AFF', '#FAAC5A', '#6C2996', '#FF6B6B']; // Added more theme colors
        const confettiCount = isMobile() ? 40 : 80; // Adjusted count
        const container = confirmationBoxRef.current;
        let confettiElements: HTMLDivElement[] = []; // Keep track of created elements

        if (container) {
            // Clear any previous confetti if effect re-runs (though it shouldn't with [])
            // const existingConfetti = container.querySelectorAll(`.${styles.confetti}`);
            // existingConfetti.forEach(el => el.remove());

            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = styles.confetti; // Use CSS module class
                confetti.style.left = Math.random() * 100 + '%';
                // Start slightly above the box for better effect
                confetti.style.top = (Math.random() * -20) + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                const duration = Math.random() * 3 + 3; // Slightly longer duration
                const delay = Math.random() * 4; // Spread out start times
                // Apply animation using the keyframes defined in the CSS module
                confetti.style.animation = `${styles.confettiAnimation} ${duration}s ${delay}s ease-out forwards`; // Use forwards to keep final state
                container.appendChild(confetti);
                confettiElements.push(confetti); // Add to list for cleanup
            }
        }

        // Cleanup function: Remove confetti when the component unmounts
        return () => {
            confettiElements.forEach(el => el.remove());
        };
    }, []); // Run only once

    // --- VH Fix for Mobile Browsers ---
    useEffect(() => {
        const setVH = () => {
            // Calculate 1% of the window's inner height
            let vh = window.innerHeight * 0.01;
            // Set the value in a CSS custom property (--vh) on the root element
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        setVH(); // Set initially
        // Recalculate on resize
        window.addEventListener('resize', setVH);
        // Cleanup listener when component unmounts
        return () => window.removeEventListener('resize', setVH);
    }, []);

    // --- JSX Structure (Remains the same as previous step) ---
    return (
         <div className={styles.container}>
             <div className={styles.header}>
                 <img src="/images/mia-profile.jpg" className={styles.profileImage} alt="Mia Ottosson" />
                 <h1 className={styles.title}>Thank You for Joining Us!</h1>
                 <p className={styles.subtitle}>Your journey with the 2025 Progressive Mediumship Course begins now</p>
             </div>

             <div className={styles.confirmationBox} ref={confirmationBoxRef}>
                 <h2>Your Spot is Confirmed! 🎉</h2>
                 <p>We're excited to have you join Mia Ottosson's Progressive Mediumship Course for 2025</p>
                 {/* Confetti elements added by useEffect */}
             </div>

             <div className={styles.courseDetails}>
                 <div className={styles.detailBox}>
                     <div className={styles.icon}><FontAwesomeIcon icon={faCalendarAlt} /></div>
                     <h3>Start Date</h3>
                     <p>April 9th, 2025<br />6 PM (Sweden Time)</p>
                 </div>
                 <div className={styles.detailBox}>
                     <div className={styles.icon}><FontAwesomeIcon icon={faClock} /></div>
                     <h3>Duration</h3>
                     <p>8+ Months<br />40+ Hours of Development</p>
                 </div>
                 <div className={styles.detailBox}>
                     <div className={styles.icon}><FontAwesomeIcon icon={faUsers} /></div>
                     <h3>Community</h3>
                     <p>Join our supportive<br />Facebook group</p>
                 </div>
             </div>

             <div className={styles.card}>
                 <h2>Next Steps</h2>
                 <ul className={styles.instructionList}>
                     <li>
                         <div className={styles.icon}><FontAwesomeIcon icon={faGift} /></div>
                         <div>
                             <strong>Claim Your BONUS!</strong> - Watch the "Secrets to Mediumship" 1-hour Masterclass recording that comes with your enrollment
                         </div>
                     </li>
                     <li>
                         <div className={styles.icon}><FontAwesomeIcon icon={faFacebookF} /></div>
                         <div>
                             <strong>Join Our Community</strong> - Connect with fellow students in our private Facebook group for support and practice
                         </div>
                     </li>
                     <li>
                         <div className={styles.icon}><FontAwesomeIcon icon={faVideo} /></div>
                         <div>
                             <strong>Check Your Email</strong> - We've sent you the Zoom link for all upcoming sessions
                         </div>
                     </li>
                     <li>
                         <div className={styles.icon}><FontAwesomeIcon icon={faCalendarCheck} /></div>
                         <div>
                             <strong>Mark Your Calendar</strong> - A reminder will be automatically sent 24 hours before we start
                         </div>
                     </li>
                 </ul>

                 <div className={styles.actions}>
                     <a href="https://vimeo.com/1048248963/79e84ecb1a" target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.primaryButton}`}>
                         <FontAwesomeIcon icon={faPlayCircle} style={{ marginRight: '8px' }} /> Watch Bonus Masterclass
                     </a>
                     <a href="https://www.facebook.com/groups/2976544015978501" target="_blank" rel="noopener noreferrer" className={`${styles.button} ${styles.secondary}`}>
                         <FontAwesomeIcon icon={faFacebookF} style={{ marginRight: '8px' }} /> Join Facebook Group
                     </a>
                 </div>
             </div>

             <div className={styles.importantInfo}>
                 <h3>Important Course Information</h3>
                 <p><strong>Course Start:</strong> 9th April 2025 - 6 PM Sweden time (<a href="https://dateful.com/time-zone-converter" target="_blank" rel="noopener noreferrer">check your timezone here</a>)</p>
                 <p><strong>Prerequisites:</strong> This course is not suitable for absolute beginners. You need to be able to establish a link with the spirit world.</p>
                 <p><strong>Refund Policy:</strong> Please note that Mia has a strict no-refund policy for this course. <a href="/#faq" target="_blank" rel="noopener noreferrer">Read more here</a></p>
             </div>

             <div className={styles.card}>
                 <div className={styles.quote}>
                     "The spirit world is here for us. Not the opposite."
                 </div>
             </div>

             <div className={styles.divider}></div>

             <div className={styles.card}>
                 <h2>Have Questions?</h2>
                 <p>If you have any queries or need assistance, please don't hesitate to reach out to Mia directly.</p>
                 <div className={styles.actions}>
                     <a href="mailto:mia@miaottosson.se" className={`${styles.button} ${styles.primaryButton}`}>
                         <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px' }} /> Contact Mia
                     </a>
                 </div>
             </div>

             <div className={styles.footer}>
                 <p>© {new Date().getFullYear()} Progressive Mediumship Course with Mia Ottosson. All rights reserved.</p>
             </div>
         </div>
    );
};

export default ThankYouPage;