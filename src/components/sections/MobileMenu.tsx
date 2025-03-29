// src/components/sections/MobileMenu.tsx
import React, { useEffect, useRef } from 'react';
import styles from './MobileMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableElementRef = useRef<HTMLAnchorElement>(null); // Ref for the logo link

  // Focus trap and Escape key handling
  useEffect(() => {
    const menuElement = menuRef.current;
    if (!menuElement || !isOpen) return;

    // Focus first focusable element (logo) when menu opens
    firstFocusableElementRef.current?.focus();

    const focusableElements = menuElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab') {
        if (event.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={menuRef}
      className={`${styles.mobileMenu} ${isOpen ? styles.active : ''}`}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      style={{ visibility: isOpen ? 'visible' : 'hidden' }}
    >
       {/* Inner container helps with potential scrollbars and padding */}
      <div className={styles.menuContentWrapper}>
          <div className={styles.mobileMenuHeader}>
             {/* Add ref to the logo link */}
            <a ref={firstFocusableElementRef} href="/" className={styles.logo} aria-label="Mia Ottosson Home" onClick={onClose}>
                Mia Ottosson
            </a>
            <button
              ref={closeButtonRef}
              className={styles.mobileMenuClose}
              aria-label="Close menu"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
            </button>
          </div>

          <nav role="navigation" aria-label="Mobile navigation">
            <ul className={styles.mobileMenuLinks}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={onClose}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#pricing"
            className={`${styles.mobileNavCta} btn`} // Use global btn
            aria-label="Secure your place now"
            onClick={onClose}
          >
            Secure Your Place Now
          </a>
      </div>
    </div>
  );
};

export default MobileMenu;