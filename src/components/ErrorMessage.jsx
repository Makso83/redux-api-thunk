import React from 'react';

function ErrorMessage({ children }) {
  return (
    <div className="Error_container">
      <p>{children}</p>
    </div>
  );
}

export default ErrorMessage;
