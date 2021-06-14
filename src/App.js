// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Search from './components/search';
import { FETCH } from '../src/services/WeatherService';
import MessageError from './components/message_error';
import MessageWarning from './components/message_warning';
import LocationList from './components/location_list';
import WeatherSummary from './components/weather_summary';

const App = () => {
  const [locations, setLocations] = useState([]),
        [currentLocation, setCurrentLocation] = useState(''),
        [loading, setLoading] = useState(false),
        [error, setError] = useState(null),
        [warning, setWarning] = useState(null);

  const searchLocation = (query) => {
    setError(null);
    setWarning(null);
    setLoading(true);

    fetchPosition(`q=${query}`)
  };

  const addToList = () => {
    if (locations.find((item) => item.id === currentLocation.id)) {
      setWarning(`'${currentLocation.name}' is already in the list`)
    } else {
      setLocations([currentLocation, ...locations]);
      localStorage.setItem('list', JSON.stringify([currentLocation, ...locations])); 
    }
  }

  const fetchPosition = (query) => {
    FETCH(`weather?${query}`)
      .then((data) => {
        setCurrentLocation(data);
        console.log(data.name);
      })
      .catch((error) => {
        console.error(`Error fetching data with query: '${error}'`);
        setError(query);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLocations(JSON.parse(localStorage.getItem('list') || null));
    if (!currentLocation) {
      setLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;
            fetchPosition(`lat=${lat}&lon=${lon}`)
            console.log('position updated!');
          },
          (error) => {
            console.error(`ERROR (${error.code}): ${error.message}`);
          },
          {
            timeout: 500,
            maximumAge: 600_000,
            enableHighAccuracy: false,
          }
        );
      } else {
        alert(
          'GeoLocation not available, please select your location manually with the search function'
        );
        setLoading(false);
      }
    }
  }, [loading, currentLocation]);

  return (
    <>
      <h1>What's the weather like?</h1>

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
