import React, { useEffect, useState } from 'react';
import { FETCH } from '../src/services/WeatherService';
// import ApiCaller from './components/api_caller';
import MessageError from './components/message_error';
import MessageWarning from './components/message_warning';
import Main from './components/main';
import Header from './components/header';
import Loading from './components/loading';
import './styling/style.scss';

const App = () => {
  const [locations, setLocations] = useState([]),
        [currentLocation, setCurrentLocation] = useState(''),
        [units, setUnits] = useState({ unit: 'metric', deg: 'C', speed: 'm/s' }),
        [weather, setWeather] = useState(null),
        [country, setCountry] = useState(null),
        [forecastDay, setForecastDay] = useState(null),
        [forecastWeek, setForecastWeek] = useState(null),
        [loading, setLoading] = useState(false),
        [error, setError] = useState(null),
        [warning, setWarning] = useState(null);

  const searchLocation = query => {
    setError(null);
    setWarning(null);
    setLoading(true);

    fetchPositionData(`q=${query}`);
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

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lon = position.coords.longitude;
          const lat = position.coords.latitude;
          fetchPositionData(`lat=${lat}&lon=${lon}`);
          console.log('position updated!');
        },
        error => {
          console.error(`ERROR (${error.code}): ${error.message}`);
        },
        {
          timeout: 10000,
          maximumAge: 600_000,
          enableHighAccuracy: false
        }
      );
    } else {
      alert(
        'GeoLocation not available'
      );
    }
  };

  const fetchPositionData = query => {
    FETCH(`weather?${query}`)
      .then(data => {
        setCurrentLocation(data);
        console.log(data.name);
      })
      .catch(error => {
        console.error(`Error fetching data with query: '${error}'`);
        setError(query);
      })
  };

  const fetchWeatherData = (location, units) => {
    const countryCodes = require('i18n-iso-countries');
    countryCodes.registerLocale(require('i18n-iso-countries/langs/en.json'));

    (async () => {
      if (location && units) {
        await Promise.all([
          FETCH(`weather?id=${location.id}&units=${units.unit}`)
          .then(data => {
            setWeather(data);
            setCountry(
              countryCodes.getName(data.sys.country, 'en', {
                select: 'official'
              })
            );
          }),
          FETCH(`forecast?id=${location.id}&units=${units.unit}&cnt=8`)
          .then(data => {
            setForecastDay(data.list);
          }),
          FETCH(
            `onecall?lat=${location.coord.lat}&lon=${location.coord.lon}&exclude=minutely,hourly&units=${units.unit}`)
          .then(data => {
            setForecastWeek(data.daily);
          })
        ])
      }
    })();
  }

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem('list')) {
      setLocations(JSON.parse(localStorage.getItem('list')));
    }

    if (!currentLocation) {
      getPosition();
    }

    setLoading(false);
  }, [loading, currentLocation]);

  useEffect(() => {
    if (currentLocation) {
      fetchWeatherData(currentLocation, units);
    }
  }, [currentLocation, units])

  if (loading || !currentLocation || !units || !weather || !forecastDay || !forecastWeek) return <Loading />

  return (
    <>
      {!loading && currentLocation && units && (
        <>
          <Header
            onSearch={searchLocation}
            setUnits={setUnits}
            locations={locations}
            current={currentLocation}
            onSelect={location => setCurrentLocation(location)}
            clickShowCurrPos={getPosition}
            weather={weather}
          />

          {error && <MessageError messageErr={error} />}

          {!loading && currentLocation && weather && units && forecastDay && forecastWeek && (
          <Main
            location={currentLocation}
            units={units}
            addToList={addToList}
            setWeather={setWeather}
            weather={weather}
            country={country}
            forecastDay={forecastDay}
            forecastWeek={forecastWeek}
          />
          )}

          {warning && <MessageWarning messageWarn={warning} />}

        </>
      )}
      {loading && <Loading />}
    </>
  );
};

export default App;
