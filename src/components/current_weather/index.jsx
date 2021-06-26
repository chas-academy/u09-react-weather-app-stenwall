import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './CurrentWeather.scss';

const CurrentWeather = ({
  time,
  weather,
  details,
  wind,
  sun,
  tod,
  units,
  city,
  country,
  clickSaveLocation
}) => {
  const unixTimeToDate = unixUTC => {
    return new Date(unixUTC * 1000);
  };

  const options = {
    time: {
      hour: '2-digit',
      minute: '2-digit'
    },
    timeZone: {
      timeZoneName: 'short'
    },
    date: {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    },
    sun: {
      hour: '2-digit',
      minute: '2-digit'
    }
  };

  return (
    <div className="current-weather">
      <h2>{city.toUpperCase()}</h2>
      <button className="save-btn" onClick={clickSaveLocation} aria-label="Add current location to saved locations list">
        <FontAwesomeIcon className="icon" icon={faHeart} />
      </button>
      <p>
        {country} | {unixTimeToDate(time).toLocaleDateString([], options.date)} | {unixTimeToDate(time).toLocaleTimeString([], options.time)}
      </p>

      <div className="temp">
      {Math.round(weather.temp)}°{units.deg}
      </div>
          
        <div>
          ({Math.round(weather.temp_min)}°{units.deg} |{' '}
          {Math.round(weather.temp_max)}°{units.deg})
        </div>

      <div>Humidity: {weather.humidity}%</div>

      <div>
        <i className={`wi wi-wind from-${wind.deg}-deg`}></i>
        Wind: {wind.speed} ({wind.gust}) {units.speed}
      </div>

      <div>
        <i className={`wi icon-wi wi-owm-${tod}-${details.id}`}></i>
        {details.main}
        {details.description}
      </div>

      <div>
        Sunrise:{' '}
        {unixTimeToDate(sun.sunrise).toLocaleTimeString([], options.sun)} |
        Sunset: {unixTimeToDate(sun.sunset).toLocaleTimeString([], options.sun)}
      </div>
    </div>
  );
};

export default CurrentWeather;
