import React, { useState } from 'react';
import './ForecastWeek.scss';
import ForecastWeekDetails from './ForecastWeekDetails';
import ForecastWeekOverview from './ForecastWeekOverview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const ForecastWeek = ({ weather, units }) => {
  const [isActive, setIsActive] = useState(false);

  if (isActive) return (
    <div
      className="details-row"
      onClick={() => setIsActive(!isActive)}
    >
        <ForecastWeekDetails
          weather={weather}
          time={weather.dt}
          temp={weather.temp}
          details={weather.weather[0]}
          tod={weather.weather[0].icon.includes('d') ? 'day' : 'night'}
          units={units}
        />
        <FontAwesomeIcon
          className="arrow"
          icon={faAngleUp}
        />
    </div>
  );
  
  return (
    <div
      className="overview-row"
      onClick={() => setIsActive(!isActive)}
    >
      <ForecastWeekOverview
        weather={weather}
        time={weather.dt}
        temp={weather.temp}
        details={weather.weather[0]}
        tod={weather.weather[0].icon.includes('d') ? 'day' : 'night'}
        units={units}
      />
      <FontAwesomeIcon
        className="arrow"
        icon={faAngleDown}
      />
    </div>
  );
};

export default ForecastWeek;
