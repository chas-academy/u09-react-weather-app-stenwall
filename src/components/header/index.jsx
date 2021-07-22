import React, { useEffect, useState } from 'react';
import LocationList from '../location_list';
import Search from '../search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import Tooltip from '../tooltip';

const Header = ({ onSearch, setUnits, locations, current, onSelect, clickShowCurrPos, weather }) => {
  const [activeUnit, setActiveUnit] = useState('metric'),
        [headerClass, setHeaderClass] = useState('');

  const unit = {
    metric: { unit: 'metric', deg: 'C', speed: 'm/s' },
    imperial: { unit: 'imperial', deg: 'F', speed: 'mph' }
  };

  const btnClick = unit => {
    setUnits(unit);
    setActiveUnit(unit.unit);
  };

  // const headerClass = weather => {
  //   console.log(weather);
  //   return `wave-${weather.weather[0].icon.includes('d') ? 'day' : 'night'}-${weather.weather[0].main.toLowerCase()}`
  // }
  // useEffect(() => {
  //   setHeaderClass(`wave-${weather.weather[0].icon.includes('d') ? 'day' : 'night'}-${weather.weather[0].main.toLowerCase()}`)
  // }, [])

  return (
    
    // <header className={headerClass}>
    <header className={`wave-${weather.weather[0].icon.includes('d') ? 'day' : 'night'}-${weather.weather[0].main.toLowerCase()}`}>
  
      <div className="right-align">
        <Search
          id="search-bar"
          placeholder="search for a location..."
          onSearch={onSearch}
        />
        <div className="button-container">
          <Tooltip text="Celsius" posClassBox="celsius" posClassArrow="cel-arrow">
          <button
            aria-label="Set units to metric/celsius"
            className={activeUnit === 'metric' ? 'active' : null}
            onClick={() => btnClick(unit.metric)}
          >
            <i className={`wi wi-celsius icon`}></i>
          </button>
          </Tooltip>
          <span className="divider">|</span>
          <Tooltip text="Fahrenheit" posClassBox="fahrenheit" posClassArrow="far-arrow">
          <button
            aria-label="Set units to imperial/fahrenheit"
            className={activeUnit === 'imperial' ? 'active' : null}
            onClick={() => btnClick(unit.imperial)}
          >
            <i className={`wi wi-fahrenheit icon`}></i>
          </button>
          </Tooltip>
        </div>

        {/* <Tooltip text="Saved locations" posClassBox="list" posClassArrow="list-arrow"> */}
        <LocationList
          locations={locations}
          current={current}
          onSelect={onSelect}
        />
        {/* </Tooltip> */}

        <Tooltip text="Current location" posClassBox="current" posClassArrow="curr-arrow">
        <button
          aria-label="Get info about the current location"
          className="location-btn"
          onClick={clickShowCurrPos}
        >
          <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
        </button>
        </Tooltip>

      </div>
    </header>
  );
};

export default Header;
