import React, { useEffect, useState } from 'react';
import { FETCH } from '../../services/WeatherService';
import ForecastDay from '../forecast_day';
import ForecastWeek from '../forecast_week';
import CurrentWeather from '../current_weather';
import './Main.scss';
import Accordion from '../accordion';

const Main = ({ location, units }) => {
  const [weather, setWeather] = useState(null),
        [forecastDay, setForecastDay] = useState(null),
        [forecastWeek, setForecastWeek] = useState(null),
        [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      if (location) {
        await Promise.all([
          FETCH(`weather?id=${location.id}&units=${units.unit}`)
            .then((data) => {
              setWeather(data);
            }),
          FETCH(`forecast?id=${location.id}&units=${units.unit}&cnt=8`)
            .then((data) => {
              setForecastDay(data.list);
              console.log(data.list);
            }),
          FETCH(
            `onecall?lat=${location.coord.lat}&lon=${location.coord.lon}&exclude=minutely,hourly&units=${units.unit}`
          ).then((data) => {
            setForecastWeek(data.daily);
          }),
        ])
        .finally(() => {
          setLoading(false);
        });
      }
    })();
  }, [location, units]);

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
        <div id='wrapper' className='gradient-day-clear'>
          <main>
            <h2>{location.name}</h2>

            {weather && (
              <CurrentWeather
                weather={weather.main}
                time={weather.dt}
                details={weather.weather[0]}
                wind={weather.wind}
                sun={weather.sys}
                tod={weather.weather[0].icon.includes('d') ? 'day' : 'night'}
                units={units}
              />
            )}

            <h2>24 hour forecast</h2>
            <ol>
              {forecastDay &&
                forecastDay.map((weather) => (
                  <li key={weather.dt}>
                    <ForecastDay
                      weather={weather.main}
                      time={weather.dt}
                      wind={weather.wind}
                      details={weather.weather[0]}
                      tod={
                        weather.weather[0].icon.includes('d') ? 'day' : 'night'
                      }
                      units={units}
                    />
                  </li>
                ))}
            </ol>

            {forecastWeek && (
              <div className='week-forecast'>
                <h2>7 day forecast</h2>
                <table id='forecast-week'>
                  <tbody>
                    {forecastWeek.map((weather, units) => (
                      <ForecastWeek
                        key={weather.td}
                        weather={weather}
                        units={units}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      )}

      {loading && <p>Loading...</p>}
    </>
  );
};

export default Main;
