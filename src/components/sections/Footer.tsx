// src/components/sections/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

interface FooterProps {
  // Pass navLinks to potentially render them here too
   navLinks: { href: string; label: string }[];
}

const Footer: React.FC<FooterProps> = ({ navLinks }) => {
  const currentYear = new Date().getFullYear();

  // Filter links suitable for footer (optional)
  const footerLinks = navLinks.filter(link =>
     !['Join Now', 'FAQ'].includes(link.label) // Example filter
  );

  return (
    <footer className={styles.footer}>
       {/* Use global container */}
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Column 1: Logo and Social */}
          <div>
            <a href="/" className={styles.footerLogo}>Mia Ottosson</a>
            <p className={styles.footerDescription}>
                Professional Medium & Tutor at the Arthur Findlay College with 30+ years of experience helping mediums develop their unique gifts.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/mia.ottosson" className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Mia Ottosson on Facebook">
                  <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://www.instagram.com/mariamiaottosson/" className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Mia Ottosson on Instagram">
                  <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.youtube.com/@JourneyWithMia" className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Mia Ottosson on YouTube">
                  <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
             {/* Use h4 style from module */}
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <ul className={styles.footerLinks}>
                {/* Render filtered links */}
               {footerLinks.map(link => (
                 <li key={link.href}><a href={link.href}>{link.label}</a></li>
               ))}
              <li><a href="#">Privacy Policy</a></li> {/* Add link if available */}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className={styles.footerHeading}>Contact</h4>
            <ul className={styles.footerLinks}>
              <li><a href="mailto:mia@miaottosson.se">mia@miaottosson.se</a></li>
              {/* Add other contact links if needed */}
              {/* <li><a href="#">Book a Consultation</a></li> */}
            </ul>
          </div>
        </div> {/* End footerGrid */}

        <div className={styles.footerBottom}>
          <p>© {currentYear} Mia Ottosson | Progressive Mediumship Development | All Rights Reserved</p>
        </div>
      </div> {/* End container */}
    </footer>
  );
};

export default Footer;