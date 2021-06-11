// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import Search from './components/search';
import { FETCH } from '../src/services/WeatherService';
import ErrorMessage from './components/error_message';

const App = () => {
  const [data, setData] = useState(null),
        [locationName, setLocationName] = useState(null),
        [locationId, setLocationId] = useState(null),
        [error, setError] = useState('');

  const addLocation = (query) => {
    setError('');

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
      // .finally(() => {
      //   setLoading(false);
      // });

    // const data = searchLocation(term);
    // console.log(data);
    // if (!data) {
    //   setError(`No location found called '${term}'`);
    // // } else if (locations.find((item) => item.id === location.id)) {
    // //   setWarning(`Location '${term}' is already in the list.`);
    // } else {
    //   setLocationId(data.id);
    //   setLocationName(data.name);
    //   console.log(data.name);
    // }
  };

  return (
    <>
      <h1>What's the weather like?</h1>

      <Search onSearch={addLocation} />

      {error ? <ErrorMessage message={error} /> : null}

      <pre>{JSON.stringify(data)}</pre>

      {locationId && <p>Location id: {locationId}</p>}
      {locationName && <p>Location name: {locationName}</p>}

    </>
  );
};

export default App;
