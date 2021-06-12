import React from 'react'
import './LocationList.scss';

const LocationList = ({ locations, onSelect, current }) => {

  return (
    <>
      <h2>Saved locations</h2>
      <ul>
        {locations.map((location) => (
          <li
            key={location.id}
            className={current?.id === location.id ? 'selected' : ''}
            onClick={() => onSelect(location)}
          >
            {location.name}
          </li>
        ))}
      </ul>
    </>
  );
}
  
export default LocationList;
  