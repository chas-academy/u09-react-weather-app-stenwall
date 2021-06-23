import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LocationList.scss';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const LocationList = ({ locations, onSelect, current }) => {
// const LocationList = () => {
  const listRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const openList = () => setIsActive(!isActive);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (listRef.current !== null && !listRef.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => window.removeEventListener('click', pageClickEvent);
  }, [isActive]);

  return (
    <>
      <div className="list-container">
        <button onClick={openList} className="list-btn" aria-label="List of saved locations">
          <FontAwesomeIcon className="icon" icon={faHeart} />
        </button>
        <ul
          ref={listRef}
          className={`list ${isActive ? 'active' : null}`}
        >
          {locations.map(location => (
            <li
              key={location.id}
              className={current?.id === location.id ? 'selected' : null}
              onClick={() => onSelect(location)}
            >
              {location.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LocationList;

// source dropdown list:
// ------------------------------------------------
// https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
