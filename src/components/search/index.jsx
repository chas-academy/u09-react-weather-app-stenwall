import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Search.scss';

const Search = ({ id, placeholder, onSearch }) => {
  const [value, setValue] = useState('');

  const disableSearch = value.trim() === '';

  const searchLocation = (e) => {
    e.preventDefault();
    onSearch(value);
    setValue('');
  }

  return (
    <>
      <form onSubmit={searchLocation}>
        <label htmlFor={id}>
          {placeholder}
        </label>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          // name="search"
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          disabled={disableSearch}
          // onClick={searchLocation}
        >
          <FontAwesomeIcon
          className="icon"
          icon={faSearch}
        />
        </button>
      </form>
    </>
  );
}

export default Search;
