import React, { useState } from 'react';
import './Search.scss';

const Search = ({onSearch}) => {
  const [locationSearch, setLocationSearch] = useState('');

  const disableSearch = locationSearch.trim() === '';

  const addLocation = () => {
    onSearch(locationSearch);
    setLocationSearch('');
  };

  return (
    <>
      <label>
        Add Location
      </label>
        <input
          type="text"
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
        />
      <button
        onClick={addLocation}
        disabled={disableSearch}
      >
        Search
      </button>
    </>
  );
};

export default Search;
