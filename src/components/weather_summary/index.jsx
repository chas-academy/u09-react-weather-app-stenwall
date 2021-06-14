import React, { useEffect, useState } from 'react';
import { FETCH } from '../../services/WeatherService';
import ForecastDay from '../forecast_day';
import ForecastWeek from '../forecast_week';
import CurrentWeather from '../current_weather';
import './WeatherSummary.scss';

const WeatherSummary = ({ location }) => {
  const [weather, setWeather] = useState(null),
        [forecastDay, setForecastDay] = useState(null),
        [forecastWeek, setForecastWeek] = useState(null),
        [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      if (location) {
        await Promise.all([
          FETCH(`weather?id=${location.id}&units=metric`)
            .then((data) => {
              setWeather(data);
            }),
          FETCH(`forecast?id=${location.id}&units=metric&cnt=8`)
            .then((data) => {
              setForecastDay(data.list);
              console.log(data.list);
            }),
          FETCH(`onecall?lat=${location.coord.lat}&lon=${location.coord.lon}&exclude=minutely,hourly&units=metric`)
            .then((data) => {
              setForecastWeek(data.daily);
            }),
        ])
          .finally(() => {
            setLoading(false);
          });
      }
    })();
  }, [location])

  // const [timeOfDay, setTimeOfDay] = useState('');

  // useEffect((weather) => {
  //   weather.weather.icon.includes('d')
  //     ? setTimeOfDay('day')
  //     : setTimeOfDay('night');
  // }, []);

  // if (!location || !weather || !forecastDay || !forecastWeek) return null;

  return (
    <>
      {!loading && location && (
        <>
          <h2>{location.name}</h2>
          <i className='wi wi-night-sleet'></i>
          {weather && (
            <CurrentWeather
              weather={weather.main}
              time={weather.dt}
              details={weather.weather[0]}
              wind={weather.wind}
              sun={weather.sys}
              tod={weather.weather[0].icon.includes('d') ? 'day' : 'night'}
            />
          )}

          <h2>24 hour forecast</h2>
          <ol>
            {forecastDay &&
              forecastDay.map((weather) => (
                <li key={weather.dt}>
                  <ForecastDay
                    weather={weather}
                    time={weather.dt}
                    wind={weather.wind}
                    details={weather.weather[0]}
                    tod={weather.weather[0].icon.includes('d') ? 'day' : 'night'}
                  />
                </li>
              ))}
              {/* <pre>{forecastDay}</pre> */}
          </ol>

          <h2>7 day forecast</h2>
          <ol>
            {forecastWeek &&
              forecastWeek.map((weather) => (
                <li key={weather.dt}>
                  <ForecastWeek
                    weather={weather}
                    time={weather.dt}
                    temp={weather.temp}
                    details={weather.weather[0]}
                    tod={weather.weather[0].icon.includes('d') ? 'day' : 'night'}
                  />
                </li>
              ))}
          </ol>
        </>
      )}

      {loading && <p>Loading...</p>}
    </>
  );
}

export default WeatherSummary;
