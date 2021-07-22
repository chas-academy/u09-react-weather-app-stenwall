import React, { useState, useEffect} from 'react';
import './MessageWarning.scss';

const MessageWarning = ({ messageWarn }) => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHidden(true), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [])

  return (
    <div className={`warning ${isHidden ? 'hidden' : null}`}>
      {messageWarn}
    </div>
  )
};

export default MessageWarning;