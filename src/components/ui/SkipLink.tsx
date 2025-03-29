// src/components/ui/SkipLink.tsx
import React from 'react';
import styles from './SkipLink.module.css';

interface SkipLinkProps {
  targetId: string;
}

const SkipLink: React.FC<SkipLinkProps> = ({ targetId }) => {
  return (
    <a href={`#${targetId}`} className={styles.skipLink}>
      Skip to main content
    </a>
  );
};

export default SkipLink;