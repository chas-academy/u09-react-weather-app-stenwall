import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

const unixTimeToDate = (unixUTC) => {
  return new Date(unixUTC * 1000);
};

const dateOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
};

const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
};

const ForecastWeekDetails = ({ weather, time, temp, details, tod, units }) => {
  return (
    <div className="details-wrapper">

      <div className="detail-card details-overview">
        <span className="time">{unixTimeToDate(time).toLocaleDateString([], dateOptions)}</span>
        <span className="temp">{Math.round(temp.day)}° {units.deg}</span>
      </div>

      <div className="detail-card weather">
        <i className={`wi wi-owm-${tod}-${details.id} icon`}></i>
        <span>{details.main}</span>
        <span>{details.description}</span>
      </div>

      <div className="detail-card feels-like">
        <i className={`wi wi-thermometer icon wi-fw`}></i>
        <span>Feels like</span>
        <span>{Math.round(weather.feels_like.day)}° {units.deg}</span>
      </div>

      <div className="detail-card humidity">
        <i className={`wi wi-humidity icon wi-fw`}></i>
        <span>Humidity</span>
        <span>{weather.humidity} %</span>
      </div>

      <div className="detail-card wind">
        <i className={`wi wi-wind from-${weather.wind_deg}-deg icon wi-fw`}></i>
        <span>Wind (gust wind)</span>
        <span>
          {Math.round(weather.wind_speed)} ({Math.round(weather.wind_gust)}) 
          {units.speed}
        </span>
      </div>

      <div className="detail-card rain">
        <i className={`wi wi-umbrella icon wi-fw`}></i>
        <span>Rain</span>
        <span>{Math.round(weather.rain) || '0'} mm</span>
      </div>

      <div className="detail-card uv-index">
        <FontAwesomeIcon
          className="icon"
          icon={faSun}
        />
        <span>UV Index</span>
        <span>{weather.uvi}</span>
      </div>

      <div className="detail-card pressure">
        <i className={`wi wi-barometer icon wi-fw`}></i>
        <span>Pressure</span>
        <span>{weather.pressure} hPa</span>
      </div>

      <div className="detail-card sunrise">
        <i className={`wi wi-sunrise icon wi-fw`}></i>
        <span>Sunrise</span>
        <span>{unixTimeToDate(weather.sunrise).toLocaleTimeString([], timeOptions)}
        </span>
      </div>

      <div className="detail-card sunset">
        <i className={`wi wi-sunset icon wi-fw`}></i>
        <span>Sunset</span>
        <span>{unixTimeToDate(weather.sunset).toLocaleTimeString([], timeOptions)}
        </span>
      </div>

    </div>
  );
};

export default ForecastWeekDetails;
