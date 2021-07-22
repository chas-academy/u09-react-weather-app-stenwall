import React from 'react';
import './ForecastDay.scss';

const unixTimeToDate = unixUTC => {
  return new Date(unixUTC * 1000);
};

const options = {
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit'
};

const ForecastDay = ({ weather, time, details, tod, units }) => {
  return (
    <div className="hour-card">

      <div className="day-time">{unixTimeToDate(time).toLocaleTimeString([], options)}</div>

      <div>
        <i className={`wi wi-owm-${tod}-${details.id}`}></i>
      </div>

      <div className="temp">
        {Math.round(weather.temp)}<span>&deg;</span>{units.deg}
      </div>

    </div>
  );
};

export default ForecastDay;
