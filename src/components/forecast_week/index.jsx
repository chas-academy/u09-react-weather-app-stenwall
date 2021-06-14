import React from 'react';
import './ForecastWeek.scss';

const unixTimeToDate = (unixUTC) => {
  return new Date(unixUTC * 1000);
};

const options = {
  weekday: 'long',
  day: 'numeric',
  month: 'short'
};

const ForecastWeek = ({ weather, time, temp, details, tod }) => {
  return (
    <>
      <div>{unixTimeToDate(time).toLocaleDateString([], options)}</div>
      <strong>{Math.round(temp.day)}°C</strong>
      <div>
        <i className={`wi wi-owm-${tod}-${details.id}`}></i>
        <p>{details.main}</p>
        <p>{details.description}</p>
      </div>
      <div>Humidity: {weather.humidity} %</div>
      <div>
        Wind: {weather.wind_speed} ({weather.wind_gust}) m/s
      </div>
      <div>Rain: {weather.rain} mm</div>
    </>
  );
};

export default ForecastWeek;
