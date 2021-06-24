import React from 'react';

const ForecastWeekOverview = ({ weather, time, temp, details, tod, units }) => {

  const unixTimeToDate = (unixUTC) => {
    return new Date(unixUTC * 1000);
  };


  return (
    <>
      <div className="day"><span>{unixTimeToDate(time).toLocaleDateString([], {weekday: 'long'})}</span></div>
      <div className="temp"><span>{Math.round(temp.day)}° {units.deg}</span></div>
      <div className="weather-desc"><span>{details.description}</span></div>
      <div className="weather-icon"><i className={`wi wi-owm-${tod}-${details.id}`}></i></div>
      {/* <div className="humidity"><i className={`wi wi-humidity`}></i><span>{weather.humidity} %</span></div> */}
      {/* <div className="rain"><i className={`wi wi-umbrella`}></i><span>{Math.round(weather.rain) || '0'} mm</span></div> */}
      {/* <div className="wind"><i className={`wi wi-wind from-${weather.wind_deg}-deg`}></i><span>{Math.round(weather.wind_speed)} ({Math.round(weather.wind_gust)}) {units.speed}</span></div> */}
    </>
  );
};

export default ForecastWeekOverview;
