// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import Search from './components/search';
import { FETCH } from '../src/services/WeatherService';
import ErrorMessage from './components/error_message';

const App = () => {
  const [data, setData] = useState(null),
        [locationName, setLocationName] = useState(''),
        [locationId, setLocationId] = useState(''),
        [loading, setLoading] = useState(false),
        [error, setError] = useState('');

  const addLocation = (query) => {
    setError(null);
    setLoading(true);

    FETCH(query)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setData(data);
        setLocationName(JSON.stringify(data.name));
        setLocationId(JSON.stringify(data.id));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(`No location found called '${query}'`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <h1>What's the weather like?</h1>

      <Search onSearch={addLocation} />

      {error ? <ErrorMessage message={error} /> : null}

      {!loading && (
        <>
          <pre>{JSON.stringify(data)}</pre>

          {locationId && <p>Location id: {locationId}</p>}
          {locationName && <p>Location name: {locationName}</p>}
        </>
      )}
      
      {loading && (
        <p>Loading...</p>
      )}

    </>
  );
};

export default App;
