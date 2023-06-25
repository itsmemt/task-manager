import React from 'react';
import '../styles/button.css';

const buttonTypes = {
  primary: 'primary',
  secondary: 'secondary',
};

function Button({ type, variant, children, ...rest}) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`button--${buttonTypes[variant]} button`}
      {...rest}
    >
      {children}
    </button>
  );
}

function SelectBox({ children, id, ...rest }) {
  return (
    <>
     <select
      id={id}
      className={`button button__select`}
      {...rest}
    >
      {children}
    </select>
    </>
  );
}

export { SelectBox };
export default Button;
