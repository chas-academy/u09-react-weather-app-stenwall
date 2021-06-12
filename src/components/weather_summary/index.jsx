import React, { useEffect, useState } from 'react';
import { FETCH } from '../../services/WeatherService';
import ForecastDay from '../forecast_day';
import ForecastWeek from '../forecast_week';
import WeatherInfo from '../weather_info';
import './WeatherSummary.scss';

const WeatherSummary = ({ location }) => {
  const [weather, setWeather] = useState(null),
        [forecastDay, setForecastDay] = useState(null),
        [forecastWeek, setForecastWeek] = useState(null),
        [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      if (location) {
        await Promise.all([
          FETCH(`weather?id=${location.id}&units=metric`)
            .then((data) => {
              setWeather(data);
            }),
          FETCH(`forecast?id=${location.id}&units=metric&cnt=8`)
            .then((data) => {
              setForecastDay(data.list);
            }),
          FETCH(`onecall?lat=${location.coord.lat}&lon=${location.coord.lon}&exclude=minutely,hourly&units=metric`)
            .then((data) => {
              setForecastWeek(data.daily);
            }),
        ])
          .finally(() => {
            setLoading(false);
          });
      }
    })();
  }, [location])

  // if (!location || !weather || !forecastDay || !forecastWeek) return null;

  return (
    <>
      {!loading && location && (
        <>
          <h2>{location.name}</h2>
          {weather && <WeatherInfo weather={weather} />}

          <h2>24 hour forecast</h2>
          <ol>
            {forecastDay &&
              forecastDay.map((time) => (
                <li key={time.dt}>
                  <ForecastDay weather={time} />
                </li>
              ))}
          </ol>

          <h2>7 day forecast</h2>
          <ol>
            {forecastWeek &&
              forecastWeek.map((day) => (
                <li key={day.dt}>
                  <ForecastWeek weather={day} />
                </li>
              ))}
          </ol>
        </>
      )}

      {loading && <p>Loading...</p>}
    </>
  );
}

export default WeatherSummary;
