import React from 'react'

const LocationTable = ({locations}) => {
  return (
    <>
      <div>
        <h2>Locations</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr key={index}>
                <td>
                  {location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
  }
  
  export default LocationTable;
  