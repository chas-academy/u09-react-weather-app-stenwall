import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

const unixTimeToDate = (unixUTC) => {
  return new Date(unixUTC * 1000);
};

const dateOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
};

const timeOptions = {
  hour: '2-digit',
  minute: '2-digit'
};

const ForecastWeekDetails = ({ weather, time, temp, details, tod, units }) => {
  return (
    <div className="details-wrapper">

      <span>{unixTimeToDate(time).toLocaleDateString([], dateOptions)} - {details.description}</span>

      <div className="details-overview">    
        <span className="temp">{Math.round(temp.day)}° {units.deg}</span>
        <i className={`wi wi-owm-${tod}-${details.id} icon`}></i>
        <div>
          <p>High: {Math.round(temp.max)}° {units.deg}</p>
          <p>Low: {Math.round(temp.min)}° {units.deg}</p>
        </div>
      </div>

      <div className="card-wrapper">

        <div className="detail-card">
          <i className={`wi wi-thermometer icon wi-fw`}></i>
          <div>
            <span>Feels like</span>
            <span>{Math.round(weather.feels_like.day)}° {units.deg}</span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-humidity icon wi-fw`}></i>
          <div>
            <span>Humidity</span>
            <span>{weather.humidity} %</span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-wind from-${weather.wind_deg}-deg icon wi-fw`}></i>
          <div>
            <span>Wind {weather.wind_gust && '(gust wind)'}</span>
            <span>
              {Math.round(weather.wind_speed)} {weather.wind_gust && `(${Math.round(weather.wind_gust)}) `}
              {units.speed}
            </span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-umbrella icon wi-fw`}></i>
          <div>
            <span>Rain</span>
            <span>{(weather.rain && Math.round(weather.rain)) || '0'} mm</span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-cloud icon wi-fw`}></i>
          <div>
            <span>Cloudiness</span>
            <span>{Math.round(weather.clouds) || '0'} %</span>
          </div>
        </div>

        <div className="detail-card">
          <FontAwesomeIcon
            className="icon uv-icon"
            icon={faSun}
          />
          <div>
            <span>UV Index</span>
            <span>{Math.round(weather.uvi)} of 10</span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-barometer icon wi-fw`}></i>
          <div>
            <span>Pressure</span>
            <span>{weather.pressure} hPa</span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-sunrise icon wi-fw`}></i>
          <div>
            <span>Sunrise</span>
            <span>
              {unixTimeToDate(weather.sunrise).toLocaleTimeString([], timeOptions)}
            </span>
          </div>
        </div>

        <div className="detail-card">
          <i className={`wi wi-sunset icon wi-fw`}></i>
          <div>
            <span>Sunset</span>
            <span>
              {unixTimeToDate(weather.sunset).toLocaleTimeString([], timeOptions)}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ForecastWeekDetails;
