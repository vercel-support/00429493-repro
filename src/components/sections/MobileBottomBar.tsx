// src/components/sections/MobileBottomBar.tsx
import React from 'react';
import styles from './MobileBottomBar.module.css';

const MobileBottomBar: React.FC = () => {
    // Function to handle button click - could add tracking here if needed
    const handleClick = () => {
        if (window.fbq) {
             console.log('Pixel: Firing MobileBottomBar CTA Click (Optional Event)');
             // Example custom event
             // window.fbq('trackCustom', 'MobileCTAClick');
        }
    };

    return (
        <div className={styles.mobileBottomBar}>
             {/* Use global button classes */}
             {/* Link to the full payment option as primary mobile CTA */}
            <a
                href="https://calendly.com/miaottosson/progressive-mediumship-2025/2025-04-09T18:00:00+02:00?month=2025-04&date=2025-04-09"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-primary btn-block ${styles.mobileCtaButton}`}
                onClick={handleClick} // Add optional tracking
            >
                Secure Your Place Now
            </a>
        </div>
    );
};

export default MobileBottomBar;