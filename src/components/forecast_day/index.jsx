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

const ForecastDay = ({ weather, time, wind, details, tod, units }) => {
  return (
    <>
      <div>{unixTimeToDate(time).toLocaleTimeString([], options)}</div>
      <strong>
        {Math.round(weather.temp)}&deg;{units.deg}
      </strong>
      <div>Humidity: {weather.humidity}%</div>
      <div>
        <i className={`wi wi-wind from-${wind.deg}-deg`}></i>
        Wind: {wind.speed} ({wind.gust}) {units.speed}
      </div>
      <div>
        <i className={`wi wi-owm-${tod}-${details.id}`}></i>
        <div>{details.main}</div>
        <div>{details.description}</div>
      </div>
    </>
  );
};

export default ForecastDay;
