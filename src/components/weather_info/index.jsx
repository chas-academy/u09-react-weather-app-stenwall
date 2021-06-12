import React from 'react';
import './WeatherInfo.scss';
import { getIconUrl } from '../../services/WeatherService';

const unixTimeToDate = (unixUTC) => {
  return new Date(unixUTC * 1000);
}

const timeOptions = {
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
};

const sunOptions = {
  hour: '2-digit',
  minute: '2-digit'
};

const WeatherInfo = ({ weather }) => {
  return (
    <>
      <div>
        {unixTimeToDate(weather.dt).toLocaleTimeString([], timeOptions)}
      </div>
      <div>
        <strong>{Math.round(weather.main.temp)}°C</strong>
        <div>
          ({Math.round(weather.main.temp_min)}°C /{' '}
          {Math.round(weather.main.temp_max)}°C)
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
      <div>
        Sunrise:{' '}
        {unixTimeToDate(weather.sys.sunrise).toLocaleTimeString([], sunOptions)}{' '}
        | Sunset:{' '}
        {unixTimeToDate(weather.sys.sunset).toLocaleTimeString([], sunOptions)}
      </div>
    </>
  );
}

export default WeatherInfo;
