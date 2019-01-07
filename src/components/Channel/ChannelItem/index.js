import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

import './style.css';

const ChannelItem = ({ name, onClick }) => (
  <li className="channels-list__item">
    <a href="#canal" className="channels-list__button" onClick={onClick}>
      {name}
    </a>
  </li>
);

export default ChannelItem;
