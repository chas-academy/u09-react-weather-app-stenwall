import React from 'react';
import './ForecastDay.scss';
import { getIconUrl } from '../../services/WeatherService';

const unixTimeToDate = (unixUTC) => {
  return new Date(unixUTC * 1000);
};

const options = {
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
};

const ForecastDay = ({ weather }) => {
  return (
    <>
      <div>{unixTimeToDate(weather.dt).toLocaleTimeString([], options)}</div>
      <div>
        <strong>{Math.round(weather.main.temp)}&deg;</strong>
        <div>
          ({Math.round(weather.main.temp_min)}&deg; /{' '}
          {Math.round(weather.main.temp_max)}&deg;)
        </div>
      </div>
      <div>Humidity: {weather.main.humidity}%</div>
      <div>Wind: {weather.wind.speed}m/s</div>
      {weather.weather.map((condition) => (
        <div key={condition.id}>
          <img src={getIconUrl(condition.icon)} alt={condition.main} />
          {condition.main} {condition.description}
        </div>
      ))}
    </>
  );
};

export default ForecastDay;
