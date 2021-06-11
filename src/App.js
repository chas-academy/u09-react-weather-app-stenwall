// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import LocationTable from './components/location_table';
import Search from './components/search';

const App = () => {
  const [locations, setLocations] = useState([]);

  const addLocation = (location) => {
    setLocations([location, ...locations]);
  };
  return (
    <>
      <h1>What's the weather like?</h1>

      <Search
        onSearch={addLocation}
      />

      <LocationTable
        locations={locations}
      />

    </>
  );
};

export default App;
