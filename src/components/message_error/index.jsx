import React, { useState, useEffect} from 'react';
import './MessageError.scss';

const MessageError = ({ messageErr }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHidden(true), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [])

  return (
    <div className={`error ${isHidden ? 'hidden' : null}`}>
      {messageErr}
    </div>
  )  
};

export default MessageError;
