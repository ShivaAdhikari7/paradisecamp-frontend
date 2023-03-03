import React from 'react';

import styles from './Select.module.css';

const Select = props => {
  return (
    <div className={styles.control}>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        value={props.value}
        onChange={props.onChanged}
        name="spotTypes"
        id={props.id}
      >
        <option value="picnic">Picnic</option>
        <option value="camping">Camping</option>
      </select>
    </div>
  );
};

export default Select;
