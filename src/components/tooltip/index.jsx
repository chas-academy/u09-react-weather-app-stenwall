import React, { useState } from 'react';
import './Tooltip.scss';

const Tooltip = ({ posClassBox, posClassArrow, children, text, ...rest }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="tooltip-container">
      <div
        className={show ? `tooltip-box ${posClassBox} visible` : `tooltip-box ${posClassBox}`}
      >
        {text}
        <span
          className={`tooltip-arrow ${posClassArrow}`}
        />
      </div>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
}

export default Tooltip;

// source tooltip component + scss
//------------------------------------------------------------------------
// https://www.30secondsofcode.org/react/s/tooltip
