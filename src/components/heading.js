import React from 'react';
import '../styles/heading.css';

function Heading({ children}) {
  return (
    <p className="title">
      {children}
    </p>
  );
}

export default Heading;
