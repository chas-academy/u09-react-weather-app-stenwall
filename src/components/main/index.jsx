import React, { useEffect, useState } from 'react';
import { FETCH } from '../../services/WeatherService';
import ForecastDay from '../forecast_day';
import ForecastWeek from '../forecast_week';
import CurrentWeather from '../current_weather';
import './Main.scss';
import Loading from '../loading';

const Main = ({
  location,
  units,
  addToList,
  weather,
  country,
  forecastWeek,
  forecastDay
}) => {

  const timeOfDay = (weather) => {
    return weather.weather[0].icon.includes('d') ? 'day' : 'night';
  }

  return (
    <>
      <div
        id="wrapper"
        className={`gradient-${timeOfDay(weather)}-${weather.weather[0].main.toLowerCase()}`}
      >
        <main>
          <CurrentWeather
            weather={weather.main}
            time={weather.dt}
            details={weather.weather[0]}
            wind={weather.wind}
            rain={weather.rain["1h"]}
            clouds={weather.clouds.all}
            sun={weather.sys}
            tod={timeOfDay(weather)}
            units={units}
            city={location.name}
            country={country}
            clickSaveLocation={addToList}
          />

          <div className="day-forecast">
            <h2>24 hour forecast</h2>
            <ol>
              {forecastDay &&
                forecastDay.map(forecast => (
                  <li key={forecast.dt}>
                    <ForecastDay
                      weather={forecast.main}
                      time={forecast.dt}
                      details={forecast.weather[0]}
                      tod={timeOfDay(forecast)}
                      units={units}
                    />
                  </li>
                ))}
            </ol>
          </div>

          <div className="week-forecast">
            <h2>7 day forecast</h2>
            <ol>
              {forecastWeek &&
                forecastWeek.slice(1).map(forecast => (
                  <li key={forecast.dt}>
                    <ForecastWeek weather={forecast} units={units} />
                  </li>
                ))}
            </ol>
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;
