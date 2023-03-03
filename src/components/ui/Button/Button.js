import React from 'react';

const Button = props => {
  return (
    <button
      disabled={props.disabled}
      className={`btn-custom ${props.className}`}
      type={!props.type ? 'button' : props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
