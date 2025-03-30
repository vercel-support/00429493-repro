// src/components/sections/Header.tsx
import React from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// REMOVE navLinks from interface
interface HeaderProps {
  onMenuToggle: () => void;
  // navLinks: { href: string; label: string }[]; <--- REMOVE THIS LINE
}

// REMOVE navLinks from function arguments
const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => { // <--- REMOVE navLinks HERE
  return (
    <header className={styles.header} role="banner">
      <div className={`container ${styles.headerContainer}`}>
        <a href="/" className={styles.logo} aria-label="Mia Ottosson Home">
          Mia Ottosson
        </a>
        <button
          className={styles.mobileMenuBtn}
          aria-label="Open menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
          onClick={onMenuToggle}
        >
          <FontAwesomeIcon icon={faBars} aria-hidden="true" />
        </button>
        <a href="#pricing" className={`btn btn-light ${styles.desktopEnrollBtn}`} aria-label="Enroll Now">
          Enroll Now
        </a>
      </div>
    </header>
  );
};

export default Header;