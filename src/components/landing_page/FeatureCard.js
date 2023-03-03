import React from 'react';

import styles from './FeatureCard.module.css';

const FeatureCard = props => {
  return (
    <div className={styles['feature-card']}>
      {props.icon}
      <h3 className={styles['feature-heading']}>{props.title}</h3>
      <p className={styles['feature-para']}>{props.description}</p>
    </div>
  );
};

export default FeatureCard;
