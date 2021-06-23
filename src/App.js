// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FETCH } from '../src/services/WeatherService';
import MessageError from './components/message_error';
import MessageWarning from './components/message_warning';
import LocationList from './components/location_list';
import Main from './components/main';
import Header from './components/header';
import './styling/style.scss';

const App = () => {
  const [locations, setLocations] = useState([]),
        [currentLocation, setCurrentLocation] = useState(''),
        [units, setUnits] = useState({ unit: 'metric', deg: 'C', speed: 'm/s' }),
        [loading, setLoading] = useState(false),
        [error, setError] = useState(null),
        [warning, setWarning] = useState(null);

  const searchLocation = query => {
    setError(null);
    setWarning(null);
    setLoading(true);

    fetchPosition(`q=${query}`);
  };

  const addToList = () => {
    if (locations.find(item => item.id === currentLocation.id)) {
      setWarning(`'${currentLocation.name}' is already in the list`);
    } else {
      setLocations([currentLocation, ...locations]);
      localStorage.setItem(
        'list',
        JSON.stringify([currentLocation, ...locations])
      );
    }
  };

  const fetchPosition = query => {
    FETCH(`weather?${query}`)
      .then(data => {
        setCurrentLocation(data);
        console.log(data.name);
      })
      .catch(error => {
        console.error(`Error fetching data with query: '${error}'`);
        setError(query);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('list')) {
      setLocations(JSON.parse(localStorage.getItem('list')));
    }

    if (!currentLocation) {
      setLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;
            fetchPosition(`lat=${lat}&lon=${lon}`);
            console.log('position updated!');
          },
          error => {
            console.error(`ERROR (${error.code}): ${error.message}`);
          },
          {
            timeout: 6000,
            maximumAge: 600_000,
            enableHighAccuracy: false
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
      {!loading && currentLocation && units && (
        <div>
          {/* <div id='wrapper' className='gradient-day-clear'> */}
          <Header
            onSearch={searchLocation}
            setUnits={setUnits}
            locations={locations}
            current={currentLocation}
            onSelect={location => setCurrentLocation(location)}
          />

          {error && <MessageError messageErr={error} />}

          <Main location={currentLocation} units={units} />
          <button onClick={addToList}>Add to list</button>

          {warning && <MessageWarning messageWarn={warning} />}

          {/* <LocationList
            locations={locations}
            current={currentLocation}
            onSelect={location => setCurrentLocation(location)}
          /> */}
        </div>
      )}
      {loading && <p>Loading...</p>}
    </>
  );
};

export default App;
