import React from 'react';

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
      <div className="details-overview">
        <span className="time">{unixTimeToDate(time).toLocaleDateString([], dateOptions)}</span>
        <span className="temp">{Math.round(temp.day)}° {units.deg}</span>
      </div>
      <div className="weather">
        <i className={`wi wi-owm-${tod}-${details.id}`}></i>
        <span>{details.main}</span>
        <span>{details.description}</span>
      </div>
      <div className="humidity">
        <i className={`wi wi-humidity`}></i>
        <span>Humidity</span>
        <span>{weather.humidity} %</span>
      </div>
      <div className="rain">
        <i className={`wi wi-umbrella`}></i>
        <span>Rain</span>
        <span>{Math.round(weather.rain) || '0'} mm</span>
      </div>
      <div className="wind">
        <i className={`wi wi-wind from-${weather.wind_deg}-deg`}></i>
        <span>
          Wind (gust wind)
        </span>
        <span>
          {Math.round(weather.wind_speed)} ({Math.round(weather.wind_gust)}){' '}
          {units.speed}
        </span>
      </div>
      <div className="sunrise">
        <i className={`wi wi-sunrise`}></i>
        <span>Sunrise</span>
        <span>{unixTimeToDate(weather.sunrise).toLocaleTimeString([], timeOptions)}
        </span>
      </div>
      <div className="sunset">
        <i className={`wi wi-sunset`}></i>
        <span>Sunset</span>
        <span>{unixTimeToDate(weather.sunset).toLocaleTimeString([], timeOptions)}
        </span>
      </div>
      <div className="feels-like">
        <i className={`wi wi-thermometer`}></i>
        <span>Feels like</span>
        <span>{Math.round(weather.feels_like.day)}° {units.deg}</span>
      </div>
    </div>
  );
};

export default ForecastWeekDetails;
