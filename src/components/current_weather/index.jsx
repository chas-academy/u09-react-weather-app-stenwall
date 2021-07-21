import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSun } from '@fortawesome/free-solid-svg-icons';
import './CurrentWeather.scss';

const CurrentWeather = ({
  time,
  weather,
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
          {Math.round(weather.wind.speed)} {weather.wind.gust && Math.round(weather.wind.gust)}
          {units.speed}
        </span>
        </div>
      </div>

      {/* <div>
        <i className={`wi wi-wind from-${wind.deg}-deg`}></i>
        Wind: {wind.speed} ({wind.gust}) {units.speed}
      </div> */}

      <div className="detail-card ">
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

      {/* <div className="detail-card uv-index">
        <FontAwesomeIcon
          className="icon"
          icon={faSun}
        />
        <div>
        <span>UV Index</span>
        <span>{weather.uvi}</span>
        </div>
      </div> */}

      <div className="detail-card pressure">
        <i className={`wi wi-barometer icon wi-fw`}></i>
        <div>
        <span>Pressure</span>
        <span>{weather.main.pressure} hPa</span>
        </div>
      </div>

      <div className="detail-card sunrise">
        <i className={`wi wi-sunrise icon wi-fw`}></i>
        <div>
        <span>Sunrise</span>
        <span>{unixTimeToDate(weather.sys.sunrise).toLocaleTimeString([], options.sun)}
        </span>
        </div>
      </div>

      <div className="detail-card sunset">
        <i className={`wi wi-sunset icon wi-fw`}></i>
        <div>
        <span>Sunset</span>
        <span>{unixTimeToDate(weather.sys.sunset).toLocaleTimeString([], options.sun)}
        </span>
        </div>
      </div>

      </div>

      {/* <div>Humidity: {weather.humidity}%</div>

      <div>
        <i className={`wi wi-wind from-${wind.deg}-deg`}></i>
        Wind: {wind.speed} ({wind.gust}) {units.speed}
      </div>

      <div>
        Sunrise:{' '}
        {unixTimeToDate(sun.sunrise).toLocaleTimeString([], options.sun)} |
        Sunset: {unixTimeToDate(sun.sunset).toLocaleTimeString([], options.sun)}
      </div> */}
    </div>
  );
};

export default CurrentWeather;
