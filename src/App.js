// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import Search from './components/search';
import { FETCH } from '../src/services/WeatherService';
import MessageError from './components/message_error';
import MessageWarning from './components/message_warning';
import LocationList from './components/location_list';

const App = () => {
  const [data, setData] = useState(null),
        [locations, setLocations] = useState([]),
        [currentLocation, setCurrentLocation] = useState(''),
        [loading, setLoading] = useState(false),
        [error, setError] = useState(null),
        [warning, setWarning] = useState(null);

  const searchLocation = (query) => {
    setError(null);
    setWarning(null);
    setLoading(true);

    FETCH(query)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setCurrentLocation(data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(`No location found called '${query}'`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addToList = () => {
    locations.find((item) => item.id === currentLocation.id)
      ? setWarning(`'${currentLocation.name}' is already in the list`)
      : setLocations([currentLocation, ...locations]);
  }

  return (
    <>
      <h1>What's the weather like?</h1>

      <Search onSearch={searchLocation} />

      {error ? <MessageError messageErr={error} /> : null}

      {!loading && (
        <>
          <pre>{JSON.stringify(data)}</pre>

          {currentLocation && (
            <>
              <p>Current location: {currentLocation.name}</p>
              <p>Location id: {currentLocation.id}</p>

              <button onClick={addToList}>Add to list</button>
            </>
          )}

          {warning ? <MessageWarning messageWarn={warning} /> : null}

          <LocationList
            locations={locations}
            current={currentLocation}
            onSelect={(location) => setCurrentLocation(location)}
          />
        </>
      )}

      {loading && <p>Loading...</p>}
    </>
  );
};

export default App;
