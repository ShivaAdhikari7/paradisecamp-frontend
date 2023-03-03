import React from 'react';

import styles from './LoadingSpinner.module.css';

const LoadingSpinner = props => {
  return (
    <div className={styles['loading-spinner-overlay']}>
      <div className={styles['loading-spinner']}></div>
    </div>
  );
};

export default LoadingSpinner;
