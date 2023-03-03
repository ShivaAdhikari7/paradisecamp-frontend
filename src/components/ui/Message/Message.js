import React from 'react';
import ErrorIcon from '../../icons/ErrorIcons';
import SuccessIcon from '../../icons/SuccessIcon';

import styles from './Message.module.css';

const Message = props => {
  return (
    <div className={`${styles['overlay']} ${styles[props.className]}`}>
      <div
        className={`${styles['message-container']} ${
          styles[props.containerName]
        }`}
      >
        {props.state === 'error' ? (
          <ErrorIcon className={`${styles['message-icon']}`} />
        ) : (
          <SuccessIcon className={`${styles['message-icon']}`} />
        )}
        <p className={styles['message']}>{props.message}</p>
        <span onClick={props.onClick} className={styles['cross']}>
          &#9587;
        </span>
      </div>
    </div>
  );
};

export default Message;
