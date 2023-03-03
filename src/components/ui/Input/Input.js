import React from 'react';

import styles from './Input.module.css';

const Input = props => {
  return (
    <div className={styles.control}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        value={props.value}
        className={
          props.isValid !== undefined && !props.isValid ? styles.invalid : ''
        }
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChanged}
      />
    </div>
  );
};

export default Input;
