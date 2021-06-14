import React from 'react';
import './ForecastDay.scss';

const unixTimeToDate = (unixUTC) => {
  return new Date(unixUTC * 1000);
};

const options = {
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
};

const ForecastDay = ({ weather, time, wind, details, tod }) => {
  return (
    <>
      <div>{unixTimeToDate(time).toLocaleTimeString([], options)}</div>
      <strong>{Math.round(weather.main.temp)}&deg;</strong>
      <div>Humidity: {weather.humidity}%</div>
      <div>Wind: {wind.speed}m/s</div>
      <div>
        <i className={`wi wi-owm-${tod}-${details.id}`}></i>
        <p>{details.main}</p>
        <p>{details.description}</p>
      </div>
    </>
  );
};

export default ForecastDay;
