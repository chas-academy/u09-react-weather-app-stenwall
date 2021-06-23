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
          °C
        </button>
        |
        <button
          className={activeUnit === 'imperial' ? 'active' : null}
          onClick={() => btnClick(unit.imperial)}
        >
          °F
        </button>
      </div>

      <LocationList
          locations={locations}
          current={current}
          onSelect={onSelect}
        />

      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,192L30,208C60,224,120,256,180,272C240,288,300,288,360,272C420,256,480,224,540,218.7C600,213,660,235,720,229.3C780,224,840,192,900,181.3C960,171,1020,181,1080,154.7C1140,128,1200,64,1260,32C1320,0,1380,0,1410,0L1440,0L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg> */}
    </header>
  );
};

export default Header;