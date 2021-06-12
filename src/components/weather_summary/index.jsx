import React, { useEffect, useState } from 'react';
import { FETCH } from '../../services/WeatherService';
import ForecastDay from '../forecast_day';
import ForecastWeek from '../forecast_week';
import WeatherInfo from '../weather_info';
import './WeatherSummary.scss';

const WeatherSummary = ({ location }) => {
  const [weather, setWeather] = useState(null),
        [forecastDay, setForecastDay] = useState(null),
        [forecastWeek, setForecastWeek] = useState(null);

  useEffect(() => {
    (async () => {
      if (location) {
        await Promise.all([
          FETCH(`weather?id=${location.id}&units=metric`).then((data) => {
            setWeather(data);
          }),
          FETCH(`forecast?id=${location.id}&units=metric&cnt=8`).then(
            (data) => {
              setForecastDay(data.list);
            }
          ),
          FETCH(
            `onecall?lat=${location.coord.lat}&lon=${location.coord.lon}&exclude=minutely,hourly&units=metric`
          ).then((data) => {
            setForecastWeek(data.daily);
            console.log(data);
            console.log(data.daily);
          }),
        ]);
      }
    })();
  }, [location])

  if (!location || !weather || !forecastDay || !forecastWeek) return null;

  return (
    <>
      <h2>{location.name}</h2>
      <WeatherInfo weather={weather} />

      <h2>24 hour forecast</h2>
      <div>
        <ol>
          {forecastDay.map((time) => (
            <li key={time.dt}>
              <ForecastDay weather={time} />
            </li>
          ))}
        </ol>
      </div>

      <h2>7 day forecast</h2>
      {forecastWeek.map((day) => (
        <ForecastWeek weather={day} />
      ))}
    </>
  );
}

export default WeatherSummary;
