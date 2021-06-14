import React from 'react';
import './CurrentWeather.scss';

const CurrentWeather = ({ time, weather, details, wind, sun, tod }) => {

  const unixTimeToDate = (unixUTC) => {
    return new Date(unixUTC * 1000);
  };

  const timeOptions = {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  };

  const sunOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  return (
    <>
      <div>
        {unixTimeToDate(time).toLocaleTimeString([], timeOptions)}
      </div>
      <div>
        <strong>{Math.round(weather.temp)}°C</strong>
        <div>
          ({Math.round(weather.temp_min)}°C /{' '}
          {Math.round(weather.temp_max)}°C)
        </div>
      </div>
      <div>Humidity: {weather.humidity}%</div>
      <div>Wind: {wind.speed}m/s</div>
        <div>
          <i className={`wi wi-owm-${tod}-${details.id}`}></i>
          {details.main}
          {details.description}
        </div>
      <div>
        Sunrise:{' '}
        {unixTimeToDate(sun.sunrise).toLocaleTimeString([], sunOptions)}{' '}
        | Sunset:{' '}
        {unixTimeToDate(sun.sunset).toLocaleTimeString([], sunOptions)}
      </div>
    </>
  );
}

export default CurrentWeather;
