const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

if (apiKey === undefined) {
  throw new Error('No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY')
}

const apiBaseURL = 'http://api.openweathermap.org/data/2.5';
const keyQuery = `appid=${apiKey}`

export const FETCH = (query) => {
  return fetch(`${apiBaseURL}/weather?q=${query}&${keyQuery}`);

//   if (result.status === 404) return undefined;
//   if (result.status !== 200) throw new Error('Failed to read location data');

//   return await result.json();
}

// axios.interceptors.request.use(
//   (config) => {
//     // Add configurations here
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );