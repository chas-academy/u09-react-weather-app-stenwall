const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

if (apiKey === undefined) {
  throw new Error('No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY')
}

const apiBaseURL = 'http://api.openweathermap.org/data/2.5';
const keyQuery = `appid=${apiKey}`

export const FETCH = (query) => {
  return fetch(`${apiBaseURL}/${query}&${keyQuery}`)
    .then((response) => {
      if (response.ok) {
      return response.json();
      }
      throw response;
    });
}

// export const 
// FETCH(`weather?id=${location.id}&units=metric`)
//   .then((weather) => {
//     setWeather(weather);
//   })
//   .catch((error) => {
//     console.error('Failed to read location data: ', error);
//   }),
//   FETCH(`forecast?id=${location.id}&units=metric&cnt=8`).then((forecast) => {
//     setForecast(forecast);
//   });

export const getIconUrl = (code) => {
  return `http://openweathermap.org/img/wn/${code}.png`;  
}
