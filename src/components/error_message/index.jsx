import React from 'react';
import './ErrorMessage.scss';

const ErrorMessage = ({ message }) => {
  return <div className='message'>{message}</div>;
};

export default ErrorMessage;
