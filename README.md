# U09 React Weather App

School Assignment @ Chas Academy, class FWD20

---

>In this assignment, you will use the React library to build an application that displays weather based on the user's current position.

## Requirements

As a user, you should be able to:

- [x] See the following weather conditions for their current position:
  - [x] Temperature
  - [x] Wind strength
  - [x] Humidity
  - [x] Sunrise and sunset (time)
  - [x] Choose between Farenheit and Celsius
- [x] Get a forecast for weather conditions (as above) 5 days ahead
  - [x] Brief overview for the week
  - [x] Every three hours for the current day
  - [x] 5-day forecast

The finished solution must:

- [x] Use a weather API, e.g. [SMHI](https://opendata.smhi.se/apidocs/), [YR.no](https://api.met.no/), [OpenWeatherMaps](https://openweathermap.org/api)
- [x] Take advantage of positioning via geolocation in the browser
- [x] Have design, layout and disposition based on [weather.com](https://weather.com/weather/today), or similar applications

## Deployment

The site is deployed on Netlify: [focused-cray-e58cb9.netlify.app](https://focused-cray-e58cb9.netlify.app/)

## Notes

### Design

- I know that the site could have been way more responsive and better looking on smaller devices. I decided to not worry to much about that though, the site IS responsive and working and you can get the info you need when you see it in a mobile phone, it just looks ugly. Beacause I had a plan to make it more responsive, I made hooks for using breakpoints in react (not just in scss), I had a plan with especially the weekly forecast table. I never used thoose hooks, but I committed them now anyway, as I might need something similiar in the future and the code took a bit of googleing.
- I had a footer, and this is really a mystery to me, I couldn't get it to stick to the bottom of the document. I made the parent element position relative, I made the footer position absolute. It kept behaving like it was fixed. I think I tried almost everything. I can't understand why it's not working.

### Other notes

- There is a bug where the wind changes degree (direction) if you switch units between fahrenheit and celsius. I'm not sure why, but it might just be some thing wrong with the API.
- I have spent several hours trying to fix so the time matches the local timezone to the city that's chosen, but I've failed. Ht solution I landed in was to add the timezone option to options in `toLocaleTimeString()`, but I didn't find a simple way to do so (as far as my understanding goes, you have to use the names from the IANA timezone database, and I don't know how to translate the timezone offset I get from the API to a name like that).
- I probably should have made a separate component for all the detail-cards, but I'm trying to stay out of all the small fixes. There's a lot of extra code now unfortunately.

### Tools & sources

Styling:

- [Box-shadows](https://shadows.brumm.af/)
- [Gradients](https://cssgradient.io/)

Font:
- [Hanken](https://fontlibrary.org/en/font/hanken#Hanken-Book)

Icons:
- [Weather Icons](https://erikflowers.github.io/weather-icons/)
- [Font Awesome](https://fontawesome.com/v5/changelog/latest)

Other tools:

- [URL-encoder for SVG](https://yoksel.github.io/url-encoder/)
- [Awesome React](https://github.com/enaqx/awesome-react)
- [Favicon generator](https://favicon.io/)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
