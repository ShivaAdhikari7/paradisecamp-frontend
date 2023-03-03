import React from 'react';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <p className={styles['footer-text']}>
        Copyright &copy; {new Date().getFullYear()} ParadiseCamp. All Rights
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;
