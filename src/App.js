// import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import LocationTable from './components/location_table';
import Search from './components/search';
import { FETCH } from '../src/services/WeatherService';

const App = () => {
  const [data, setData] = useState(null),
        [locationName, setLocationName] = useState(null),
        [locationId, setLocationId] = useState(null),
        [error, setError] = useState('');

  // useEffect(() => {
  //   FETCH('https://randomuser.me/api')
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw response;
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data: ', error);
  //       setError(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);
  // if (loading) return 'Loading...';

  const resetAlert = () => {
    setError('');
  };

  const addLocation = (query) => {
    resetAlert();

    FETCH(query)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setData(data);
        setLocationName(JSON.stringify(data.name));
        setLocationId(JSON.stringify(data.id));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error);
      })
      // .finally(() => {
      //   setLoading(false);
      // });

    // const data = searchLocation(term);
    // console.log(data);
    // if (!data) {
    //   setError(`No location found called '${term}'`);
    // // } else if (locations.find((item) => item.id === location.id)) {
    // //   setWarning(`Location '${term}' is already in the list.`);
    // } else {
    //   setLocationId(data.id);
    //   setLocationName(data.name);
    //   console.log(data.name);
    // }
  };

  return (
    <>
      <h1>What's the weather like?</h1>

      <Search onSearch={addLocation} />

      {error ? <div>{error}</div> : null}

      <pre>{JSON.stringify(data)}</pre>

      {locationId && <p>Location id: {locationId}</p>}
      {locationName && <p>Location name: {locationName}</p>}

      {/* <LocationTable locations={locations} /> */}
    </>
  );
};

export default App;
