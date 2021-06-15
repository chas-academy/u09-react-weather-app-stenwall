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

const ForecastWeek = ({ weather, time, temp, details, tod, units }) => {
  return (
    <>
      <div>{unixTimeToDate(time).toLocaleDateString([], options)}</div>
      <strong>
        {Math.round(temp.day)}°{units.deg}
      </strong>
      <div>
        <i className={`wi wi-owm-${tod}-${details.id}`}></i>
        <div>{details.main}</div>
        <div>{details.description}</div>
      </div>
      <div>
        <i className={`wi wi-humidity`}></i>
        Humidity: {weather.humidity} %
      </div>
      <div>
        <i className={`wi wi-wind from-${weather.wind_deg}-deg`}></i>
        Wind: {weather.wind_speed} ({weather.wind_gust}) {units.speed}
      </div>
      <div>
        <i className={`wi wi-umbrella`}></i>
        Rain: {weather.rain || '0'} mm
      </div>
    </>
  );
};

export default ForecastWeek;
