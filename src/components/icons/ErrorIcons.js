import React from 'react';

import './Icon.css';

const ErrorIcon = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      fill="#f03e3e"
      viewBox="0 0 256 256"
      className={`icon ${props.className}`}
    >
      <rect width="256" height="256" fill="none"></rect>
      <path d="M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm37.7,130.3a8.1,8.1,0,0,1,0,11.4,8.2,8.2,0,0,1-11.4,0L128,139.3l-26.3,26.4a8.2,8.2,0,0,1-11.4,0,8.1,8.1,0,0,1,0-11.4L116.7,128,90.3,101.7a8.1,8.1,0,0,1,11.4-11.4L128,116.7l26.3-26.4a8.1,8.1,0,0,1,11.4,11.4L139.3,128Z"></path>
    </svg>
  );
};

export default ErrorIcon;
