import React from 'react';

const ForecastWeekOverview = ({ time, temp, details, tod, units }) => {

  const unixTimeToDate = unixUTC => {
    return new Date(unixUTC * 1000);
  };

  return (
    <>
      <div>
        {unixTimeToDate(time).toLocaleDateString([], {weekday: 'long'})}
      </div>
      <div>
        {Math.round(temp.day)}° {units.deg}
      </div>
      <div>
        {details.description}
      </div>
      <div>
        <i className={`wi wi-owm-${tod}-${details.id}`}></i>
      </div>
    </>
  );
};

export default ForecastWeekOverview;
