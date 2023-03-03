import React from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';

import styles from './WarningCard.module.css';

const WarningCard = props => {
  return (
    <div className={styles['overlay']}>
      <Card className={styles['warning-card']}>
        <p className={styles['warning-question']}>
          Are you sure want to perform the action?
        </p>
        <div className={styles['warning-controls']}>
          <Button className={styles['btn--yes']} onClick={props.onClick}>
            Yes
          </Button>
          <Button className={styles['btn--no']} onClick={props.onClose}>
            No
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WarningCard;
