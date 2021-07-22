import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <FontAwesomeIcon
        className="icon"
        icon={faSpinner}
      />
    </div>
  );
}

export default Loading;
