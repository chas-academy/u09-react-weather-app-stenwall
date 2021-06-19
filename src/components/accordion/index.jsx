import React, { useState } from 'react';
import './Accordion.scss';

const Accordion = ({ section, content, colSpan, foldKey }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <tr
        className="section-row"
        onClick={() => setIsActive(!isActive)}
      >
        {section}
        {/* <td colspan="1">
          {isActive ? '-' : '+'}
        </td> */}
      </tr>
      {isActive && (
        <tr
          className="fold-row"
          key={foldKey}
        >
          <td colSpan={colSpan}>
            {content}
          </td>
        </tr>
      )}
    </>
  );
};

export default Accordion;
