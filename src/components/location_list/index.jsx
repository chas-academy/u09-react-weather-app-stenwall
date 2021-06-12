import React from 'react'

const LocationList = ({ locations }) => {

  return (
    <>
      <h2>Saved locations</h2>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            {location.name}
          </li>
        ))}
      </ul>
    </>
  );
}
  
export default LocationList;
  