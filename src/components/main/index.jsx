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
      {!loading && location && weather && units && (
        <div id="wrapper" className={`gradient-${weather.weather[0].icon.includes('d') ? 'day' : 'night'}-${weather.weather[0].main.toLowerCase()}`}>
          <main>

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

            <div className="day-forecast">
              <h2>24 hour forecast</h2>
              <ol>
                {forecastDay && (
                  forecastDay.map(forecast => (
                    <li key={forecast.dt}>
                      <ForecastDay
                        weather={forecast.main}
                        time={forecast.dt}
                        details={forecast.weather[0]}
                        tod={
                          forecast.weather[0].icon.includes('d')
                            ? 'day'
                            : 'night'
                        }
                        units={units}
                      />
                    </li>
                )))}
              </ol>
            </div>

            <div className="week-forecast">
              <h2>7 day forecast</h2>
              <ol>
              {forecastWeek && (
                forecastWeek.slice(1).map(forecast => (
                    <li key={forecast.dt}> 
                      <ForecastWeek
                        weather={forecast}
                        units={units}
                      />
                    </li>
                )))}
              </ol>
            </div>

          </main>
        </div>
      )}

      {loading && <Loading />}
    </>
  );
};

export default Main;
