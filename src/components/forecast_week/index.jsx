import React from 'react';
import './ForecastWeek.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const unixTimeToDate = (unixUTC) => {
  return new Date(unixUTC * 1000);
};

const options = {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
};

const ForecastWeek = ({ weather, time, temp, details, tod, units }) => {
  return (
    <>
      <td>
        {unixTimeToDate(time).toLocaleDateString([], options)}
      </td>
      <td>
        <strong>
          {Math.round(temp.day)}° {units.deg}
        </strong>
      </td>
      <td>
        <i className={`wi wi-owm-${tod}-${details.id}`}></i>
      </td>
      <td>
        <span>{details.description}</span>
      </td>
      <td>
        <i className={`wi wi-humidity`}></i>
        <span>{weather.humidity} %</span>
      </td>
      <td>
        <i className={`wi wi-umbrella`}></i>
        <span>{Math.round(weather.rain) || '0'} mm</span>
      </td>
      <td>
        <i className={`wi wi-wind from-${weather.wind_deg}-deg`}></i>
        <span>
          {Math.round(weather.wind_speed)} ({Math.round(weather.wind_gust)}) {units.speed}
        </span>
      </td>
      <td>
        <FontAwesomeIcon icon={faAngleDown} />
      </td>
    </>
  );
};

export default ForecastWeek;
