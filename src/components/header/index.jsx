import React, { useState } from 'react';
import LocationList from '../location_list';
import Search from '../search';
import './Header.scss';

const Header = ({ onSearch, setUnits, locations, current, onSelect }) => {
  const [activeUnit, setActiveUnit] = useState('metric');

  const unit = {
    metric: { unit: 'metric', deg: 'C', speed: 'm/s' },
    imperial: { unit: 'imperial', deg: 'F', speed: 'mph' }
  };

  const btnClick = unit => {
    setUnits(unit);
    setActiveUnit(unit.unit);
  };

  return (
    <header>
      <h1>What's the weather like?</h1>
      <div className="right-align">
        <Search
          id="search-bar"
          placeholder="search for a location..."
          onSearch={onSearch}
        />
        <div className="button-container">
          <button
            className={activeUnit === 'metric' ? 'active' : null}
            onClick={() => btnClick(unit.metric)}
          >
            {/* °C */}
            <i className={`wi wi-celsius icon`}></i>
          </button>
          <span>|</span>
          <button
            className={activeUnit === 'imperial' ? 'active' : null}
            onClick={() => btnClick(unit.imperial)}
          >
            {/* °F */}
            <i className={`wi wi-fahrenheit icon`}></i>
          </button>
        </div>

        <LocationList
          locations={locations}
          current={current}
          onSelect={onSelect}
        />
      </div>
    </header>
  );
};

export default Header;
