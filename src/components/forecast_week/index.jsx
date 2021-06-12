import React from 'react';
import './ForecastWeek.scss';
import { getIconUrl } from '../../services/WeatherService';

const unixTimeToDate = (unixUTC) => {
  return new Date(unixUTC * 1000);
};

const options = {
  weekday: 'long',
  day: 'numeric',
  month: 'short'
};

const ForecastWeek = ({ weather }) => {
  return (
    <>
      <div>{unixTimeToDate(weather.dt).toLocaleDateString([], options)}</div>
      <div>{Math.round(weather.temp.day)}°C</div>
      {weather.weather.map((condition) => (
        <div key={condition.id}>
          <img src={getIconUrl(condition.icon)} alt={condition.main} />
          {condition.description}
        </div>
      ))}
      <div>Humidity: {weather.humidity} %</div>
      <div>
        Wind: {weather.wind_speed} ({weather.wind_gust}) m/s
      </div>
      <div>
        Rain: {weather.rain} mm
      </div>
    </>
  );
};

export default ForecastWeek;
