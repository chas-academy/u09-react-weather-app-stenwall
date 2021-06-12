import React from 'react';
import './MessageError.scss';

const MessageError = ({ messageErr }) => {
  return (
    <div className="error">
      {messageErr}
    </div>
  )    
};

export default MessageError;
