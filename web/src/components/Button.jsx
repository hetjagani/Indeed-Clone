/* eslint-disable react/button-has-type */
import React from 'react';
import './css/Button.css';

function Button({ label, type, ...props }) {
  return (
    <button className="LRbutton" type={type} {...props}>
      {label}
    </button>
  );
}

export default Button;
