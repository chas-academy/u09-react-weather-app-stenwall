import React from 'react';
import './WeatherInfo.scss';
import { getIconUrl } from '../../services/WeatherService';

const convertUnixTimeToDate = (unixUtc) => {
  return new Date(unixUtc * 1000);
}

const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
};

const WeatherInfo = ({ weather }) => {
  return (
    <>
      <div>
        {convertUnixTimeToDate(weather.dt).toLocaleTimeString([], timeOptions)}
      </div>
      <div>
        <strong>{weather.main.temp}°C</strong>
        <div>
          ({weather.main.temp_min}°C / {weather.main.temp_max}°C)
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
}

export default WeatherInfo;
