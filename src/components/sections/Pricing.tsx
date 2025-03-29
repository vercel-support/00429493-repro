// src/components/sections/Pricing.tsx
import React from 'react';
import styles from './Pricing.module.css'; // We will create this CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useInView } from 'react-intersection-observer'; // For animations

// Declare fbq for TypeScript
declare global {
    interface Window {
        fbq?: (...args: any[]) => void;
    }
}

const Pricing: React.FC = () => {
    // Refs for scroll animations (add more as needed based on original HTML)
    const { ref: sectionRef, inView: sectionInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: bannerRef, inView: bannerInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: card1Ref, inView: card1InView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: card2Ref, inView: card2InView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: noteRef, inView: noteInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    // --- Function for Pixel event (from Step 12) ---
     const handleButtonClick = (planType: 'full' | 'deposit') => {
      const isFullPayment = planType === 'full';
      const eventData = {
          content_name: `Progressive Mediumship Course 2025 - ${isFullPayment ? 'Full Payment' : 'Payment Plan'}`,
          content_ids: [isFullPayment ? 'PMC2025-FULL' : 'PMC2025-PLAN'], // Example IDs
          content_type: 'product',
          currency: 'EUR',
          value: isFullPayment ? 1295 : 395, // Use full price for full, deposit for plan
      };

      if (window.fbq) {
        console.log('Pixel: Firing InitiateCheckout event', eventData);
        window.fbq('track', 'InitiateCheckout', eventData);
      } else {
        console.warn('Meta Pixel (fbq) not loaded.');
      }
    };

    return (
        // *** TODO: Paste the HTML structure from the ORIGINAL Pricing section here ***
        // Remember to:
        // 1. Change 'class=' to 'className='
        // 2. Replace Font Awesome <i> tags with <FontAwesomeIcon icon={...} />
        // 3. Add 'styles.' before CSS class names (e.g., className={styles.pricingGrid})
        // 4. Add the animation refs (like ref={card1Ref}) and conditional className logic
        // 5. Add the onClick={handleButtonClick} to the <a> tags for the payment links

        <section ref={sectionRef} className={`section ${styles.pricingSection}`} id="pricing">
             <div className="container">
                <div className={`section-heading ${sectionInView ? 'animate fade-up' : 'animate'}`}>
                    {/* ... Section Heading Content ... */}
                     <span className="section-subtitle">Join the 2025 Program</span>
                     <h2>Secure Your Place Today</h2>
                     <p>Choose the payment option that works best for you</p>
                </div>

                <div ref={bannerRef} className={`banner ${styles.pricingBanner} ${bannerInView ? 'animate fade-up' : 'animate'}`}>
                    {/* ... Banner Content ... */}
                    <div className="banner-icon"><FontAwesomeIcon icon={faExclamationCircle} /></div>
                    <div>Only 5 spaces remaining — 9 spots already taken!</div>
                </div>

                <div className={styles.pricingGrid}>
                     {/* Pricing Card 1 */}
                     <div ref={card1Ref} className={`${styles.pricingCard} ${card1InView ? 'animate fade-up' : 'animate'}`}>
                         <div className={styles.pricingHeader}>
                            {/* ... Header Content ... */}
                            <div className={styles.pricingTitle}>FULL PAYMENT</div>
                            <div className={styles.pricingPrice}>€1295</div>
                            <div className={styles.pricingPeriod}>Save €100</div>
                         </div>
                         <div className={styles.pricingBody}>
                             <ul className={styles.pricingFeatures}>
                                {/* ... List items ... */}
                                 <li>All sessions over 8+ months</li>
                                 <li className={styles.premiumFeature}><strong>One 1.5 hour private session with Mia</strong> <span className={styles.premiumValue}>(worth €300)</span></li>
                                 <li>40+ hours of live training</li>
                                 <li>Recordings available for 30 days</li>
                                 <li>BONUS: The Mind-Spirit Connection Masterclass (€297 value)</li>
                                 <li>Early registration savings of €100</li>
                                 <li>Supportive community access</li>
                             </ul>
                             <a
                                href="https://calendly.com/miaottosson/progressive-mediumship-2025/2025-04-09T18:00:00+02:00?month=2025-04&date=2025-04-09"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`btn btn-primary btn-block ${styles.pricingButton}`}
                                onClick={() => handleButtonClick('full')}
                            >
                                Pay in Full
                            </a>
                            <p className={styles.pricingNote}><small>Early registration ends April 8th, 2025</small></p>
                         </div>
                     </div>

                     {/* Pricing Card 2 */}
                     <div ref={card2Ref} className={`${styles.pricingCard} ${card2InView ? 'animate fade-up delay-1' : 'animate'}`}>
                         <div className={styles.pricingHeader}>
                            {/* ... Header Content ... */}
                             <div className={styles.pricingTitle}>PAYMENT PLAN</div>
                             <div className={styles.pricingPrice}>€1395</div>
                             <div className={styles.pricingPeriod}>€395 deposit + 2 x €500</div>
                         </div>
                         <div className={styles.pricingBody}>
                             <ul className={styles.pricingFeatures}>
                                {/* ... List items ... */}
                                 <li>All sessions over 8+ months</li>
                                 <li className={styles.negativeFeature}>One 1.5 hour private session with Mia</li>
                                 <li>40+ hours of live training</li>
                                 <li>Recordings available for 30 days</li>
                                 <li>BONUS: The Mind-Spirit Connection Masterclass (€297 value)</li>
                                 <li>€395 deposit due at registration</li>
                                 <li>2 remaining payments of €500 every 3 months</li>
                             </ul>
                             <a
                                href="https://calendly.com/miaottosson/progressive-mediumship-2025-deposit/2025-04-08T18:00:00+02:00?month=2025-04&date=2025-04-08"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`btn btn-primary btn-block ${styles.pricingButton}`}
                                onClick={() => handleButtonClick('deposit')}
                            >
                                Choose Payment Plan
                            </a>
                            <p className={styles.pricingNote}><small>Please note: No BONUS private sessions for this option</small></p>
                         </div>
                     </div>
                 </div> {/* End pricingGrid */}

                <div ref={noteRef} className={`${styles.refundNote} ${noteInView ? 'animate fade-up delay-2' : 'animate'}`}>
                    {/* ... Refund note content ... */}
                     <p>Please note: Due to the intensive nature of this personalized program and limited spots available, we are unable to offer refunds. By joining, you are committing to your complete development journey.</p>
                </div>
             </div> {/* End container */}
         </section>
    );
};

export default Pricing;