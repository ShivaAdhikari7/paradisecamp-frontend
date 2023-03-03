import React from 'react';

import Card from '../Card/Card';

import styles from './Form.module.css';

const Form = props => {
  return (
    <Card className={`${styles['form-container']} ${props.className}`}>
      <img className={styles['form-img']} src={props.img} alt="Campfire" />
      <h2>{props.heading}</h2>
      <form onSubmit={props.onSubmit} className={styles['form']}>
        {props.children}
      </form>
    </Card>
  );
};

export default Form;
