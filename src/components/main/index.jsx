import React, { useEffect, useState } from 'react';
import { FETCH } from '../../services/WeatherService';
import ForecastDay from '../forecast_day';
import ForecastWeek from '../forecast_week';
import CurrentWeather from '../current_weather';
import './Main.scss';
import Loading from '../loading';

const Main = ({ location, units, addToList }) => {
  const [weather, setWeather] = useState(null),
        [forecastDay, setForecastDay] = useState(null),
        [forecastWeek, setForecastWeek] = useState(null),
        [loading, setLoading] = useState(false),
        [country, setCountry] = useState('');

  const countryCodes = require('i18n-iso-countries');
  countryCodes.registerLocale(require('i18n-iso-countries/langs/en.json'));

  useEffect(() => {
    setLoading(true);

    (async () => {
      if (location) {
        await Promise.all([
          FETCH(`weather?id=${location.id}&units=${units.unit}`)
          .then(data => {
            setWeather(data);
            setCountry(
              countryCodes.getName(data.sys.country, 'en', {
                select: 'official'
              })
            );
          }),
          FETCH(`forecast?id=${location.id}&units=${units.unit}&cnt=8`)
          .then(data => {
            setForecastDay(data.list);
            console.log(data.list);
          }),
          FETCH(
            `onecall?lat=${location.coord.lat}&lon=${location.coord.lon}&exclude=minutely,hourly&units=${units.unit}`)
          .then(data => {
            setForecastWeek(data.daily);
          })
        ])
        .finally(() => {
          setLoading(false);
        });
      }
    })();
  }, [location, units]);

  if (loading || !location || !units || !ForecastDay || !ForecastWeek || !weather) return <Loading />

  return (
    <>
      {!loading && location && (
        <div id="wrapper" className="gradient-day-clear">
          <main>
            {/* <h2>{location.name}, {country}</h2> */}

            {weather && units && (
              <CurrentWeather
                weather={weather.main}
                time={weather.dt}
                details={weather.weather[0]}
                wind={weather.wind}
                sun={weather.sys}
                tod={weather.weather[0].icon.includes('d') ? 'day' : 'night'}
                units={units}
                city={location.name}
                country={country}
                clickSaveLocation={addToList}
              />
            )}

            <div className="day-forecast">
              <h2>24 hour forecast</h2>
              <ol>
                {forecastDay && units && (
                  forecastDay.map(weather => (
                    <li key={weather.dt}>
                      <ForecastDay
                        weather={weather.main}
                        time={weather.dt}
                        details={weather.weather[0]}
                        tod={
                          weather.weather[0].icon.includes('d')
                            ? 'day'
                            : 'night'
                        }
                        units={units}
                      />
                    </li>
                )))}
              </ol>
            </div>

            {forecastWeek && units && (
              <div className="week-forecast">
                <h2>7 day forecast</h2>
                <table id="forecast-week">
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

      {loading && <Loading />}
    </>
  );
};

export default Main;
