import React, { useEffect, useState } from 'react';
import { FETCH } from '../../services/WeatherService';
import WeatherInfo from '../weather_info';
import './WeatherSummary.scss';

const WeatherSummary = ({ location }) => {
  const [weather, setWeather] = useState(null),
        [forecast, setForecast] = useState(null);

  useEffect(() => {
    (async () => {
      if (location) {
        await Promise.all([
          FETCH(`weather?id=${location.id}&units=metric`)
            .then((data) => {
              setWeather(data);
            }),
          FETCH(`forecast?id=${location.id}&units=metric&cnt=8`)
            .then((data) => {
              setForecast(data.list);
            })
        ]);
      }
    })();
  }, [location])

  if (!location || !weather || !forecast) return null;

  return (
    <>
      <h2>{location.name}</h2>
      <WeatherInfo weather={weather} />

      <h2>Forecast</h2>
      <div>
        <ol>
          {forecast.map((timePoint) => (
            <li key={timePoint.dt}>
              <WeatherInfo weather={timePoint} />
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default WeatherSummary;
