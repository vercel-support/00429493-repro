// src/components/sections/Header.tsx
import React from 'react';
import styles from './Header.module.css'; // Ensure this CSS module exists and is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  onMenuToggle: () => void;
  navLinks: { href: string; label: string }[]; // Keep prop for potential future use
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, navLinks }) => {
  // navLinks prop is currently unused here but passed down from App.tsx
  // Could be used later to build a desktop navigation menu if desired

  return (
    <header className={styles.header} role="banner">
      {/* Use global container */}
      <div className={`container ${styles.headerContainer}`}>
        <a href="/" className={styles.logo} aria-label="Mia Ottosson Home">
          Mia Ottosson
        </a>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuBtn}
          aria-label="Open menu"
          aria-expanded="false" // State managed in App.tsx
          aria-controls="mobile-menu"
          onClick={onMenuToggle} // Calls function passed from App.tsx
        >
          <FontAwesomeIcon icon={faBars} aria-hidden="true" />
        </button>

        {/* Desktop Enroll Button - Uses global btn classes too */}
        <a href="#pricing" className={`btn btn-light ${styles.desktopEnrollBtn}`} aria-label="Enroll Now">
          Enroll Now
        </a>
      </div>
    </header>
  );
};

export default Header;