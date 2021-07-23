import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Footer.scss';

const Footer = () => {

  return (
    <footer>
      <p>
        <FontAwesomeIcon className="icon" icon={faCopyright} />
        <span>Karin Stenwall 2021</span>
      </p>
      <p>School Assignment @ Chas Academy, class FWD20</p>
      <p><a href="https://github.com/chas-academy/u09-react-weather-app-stenwall">Weather App @ GitHub</a></p>
    </footer>
  );
};

export default Footer;
