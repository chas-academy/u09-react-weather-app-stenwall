import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './CurrentWeather.scss';
import Tooltip from '../tooltip';

const CurrentWeather = ({
  weather,
  tod,
  units,
  city,
  country,
  clickSaveLocation
}) => {

  const unixTimeToDate = (UTC, timeZoneOffset) => {
    const dateTime = (UTC * 1000) + timeZoneOffset;
    return new Date(dateTime);
  };  

  const options = {
    time: {
      hour: '2-digit',
      minute: '2-digit'
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
      <Tooltip
        text="Add to list"
        posClassBox="add-list"
        posClassArrow="add-list-arrow"
      >
        <button
          className="save-btn"
          onClick={clickSaveLocation}
          aria-label="Add current location to saved locations list"
        >
          <FontAwesomeIcon className="icon" icon={faHeart} />
        </button>
      </Tooltip>
      
      <p>
        {country} | {unixTimeToDate(weather.dt, weather.timezone).toLocaleDateString([], options.date)} | {unixTimeToDate(weather.dt, weather.timezone).toLocaleTimeString([], options.time)}
      </p>

      <div className="large-info">
        <span className="temp-current">
          {Math.round(weather.main.temp)}°{units.deg}
        </span>
        <i className={`wi icon-wi wi-owm-${tod}-${weather.weather[0].id}`}></i> 
        <div>
          <p>High: {Math.round(weather.main.temp_max)}°{units.deg}</p>
          <p>Low: {Math.round(weather.main.temp_min)}°{units.deg}</p>
        </div>
      </div>

      <p>
        <i>Over here, it's {weather.weather[0].description}!</i>
      </p>

      <div className="card-wrapper">

        <div className="detail-card">
          <i className={`wi wi-thermometer icon wi-fw`}></i>
          <div>
            <span>Feels like</span>
            <span>{Math.round(weather.main.feels_like)}° {units.deg}</span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-humidity icon wi-fw`}></i>
          <div>
            <span>Humidity</span>
            <span>{weather.main.humidity} %</span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-wind from-${weather.wind.deg}-deg icon wi-fw`}></i>
          <div>
            <span>Wind {weather.wind.gust && '(gust wind)'}</span>
            <span>
              {Math.round(weather.wind.speed)} {weather.wind.gust && `(${Math.round(weather.wind.gust)}) `}
              {units.speed}
            </span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-umbrella icon wi-fw`}></i>
          <div>
            <span>Rain</span>
            <span>{(weather.rain && Math.round(weather.rain["1h"])) || '0'} mm</span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-cloud icon wi-fw`}></i>
          <div>
            <span>Cloudiness</span>
            <span>{(weather.clouds && Math.round(weather.clouds.all)) || '0'} %</span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-barometer icon wi-fw`}></i>
          <div>
            <span>Pressure</span>
            <span>{weather.main.pressure} hPa</span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-sunrise icon wi-fw`}></i>
          <div>
            <span>Sunrise</span>
            <span>
              {unixTimeToDate(weather.sys.sunrise, weather.timezone).toLocaleTimeString([], options.sun)}
            </span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-sunset icon wi-fw`}></i>
          <div>
            <span>Sunset</span>
            <span>
              {unixTimeToDate(weather.sys.sunset, weather.timezone).toLocaleTimeString([], options.sun)}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CurrentWeather;
