// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import Search from './components/search';
import { FETCH } from '../src/services/WeatherService';
import MessageError from './components/message_error';
import MessageWarning from './components/message_warning';
import LocationList from './components/location_list';
import WeatherSummary from './components/weather_summary';
// import GeoLocation from './components/geo_location';

const App = () => {
  const [locations, setLocations] = useState([]),
        // [searchResult, setSearchResult] = useState([]),
        [currentLocation, setCurrentLocation] = useState(''),
        [loading, setLoading] = useState(false),
        [error, setError] = useState(null),
        [warning, setWarning] = useState(null);

  const searchLocation = (query) => {
    setError(null);
    setWarning(null);
    setLoading(true);

    FETCH(`weather?q=${query}`)
      .then((data) => {
        setCurrentLocation(data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(`No location found called '${query}'`);
      })
      .finally(() => {
        setLoading(false);
      });

    console.log(query);
    console.log(currentLocation);
  };

  const addToList = () => {
    locations.find((item) => item.id === currentLocation.id)
      ? setWarning(`'${currentLocation.name}' is already in the list`)
      : setLocations([currentLocation, ...locations]);
  }

  return (
    <>
      <h1>What's the weather like?</h1>

      {/* <GeoLocation /> */}

      <Search
        id="search-bar"
        placeholder="search for a location..."
        onSearch={searchLocation}
      />

      {error && <MessageError messageErr={error} />}

      {!loading && (
        <>
          {currentLocation && (
            <>
              <WeatherSummary location={currentLocation} />
              <button onClick={addToList}>Add to list</button>
            </>
          )}

          {warning && <MessageWarning messageWarn={warning} />}

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
