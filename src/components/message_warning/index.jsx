import React from 'react';
import './MessageWarning.scss';

const MessageWarning = ({ messageWarn }) => {
  return (
    <div className="warning">
      {messageWarn}
    </div>
  )    
};

export default MessageWarning;