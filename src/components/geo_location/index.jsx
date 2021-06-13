import React, { useEffect, useState } from 'react';
import './GeoLocation.scss';

const unixTimeToDate = (unixUTC) => {
  return new Date(unixUTC * 1000);
}

const timeOptions = {
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
}

const GeoLocation = () => {
  const [currentPosition, setCurrentPosition] = useState({}),
        [timestamp, setTimestamp] = useState('');

  const options = { enableHighAccuracy: true };

  const success = (position) => {
    setCurrentPosition({
      lon: position.coords.longitude,
      lat: position.coords.latitude,
    });
  }

  const error = (error) => {
    console.error(`ERROR (${error.code}): ${error.messge}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          if (result.state === 'granted') {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === 'prompt') {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition(success, error, options);
          } else if (result.state === 'denied') {
            // show instructions how to enable?
          }
          result.onchange = () => {
            console.log(result.state);
          };
        });
    } else {
      alert('GeoLocation not available, please select your location manually with the search function');
    }
  }, [])

  return (
    <>
      <h3>Is GeoLocation working?</h3>
      <p>Latitude: {currentPosition.lat}</p>
      <p>Longitude: {currentPosition.lon}</p>
      <p>{unixTimeToDate(timestamp).toLocaleTimeString([], timeOptions)}</p>
    </>
  );
}

export default GeoLocation;
