import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

import './style.css';

const ChannelItem = ({ data, onClick, selected }) => (
  <li className={`channels-list__item ${selected && 'channels-list__item-selected'}`}>
    <button
      type="button"
      className={`channels-list__button ${selected && 'channels-list__button-selected'}`}
      onClick={() => onClick(data)}
    >
      {data.name}
    </button>
  </li>
);

export default ChannelItem;
