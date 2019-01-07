import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

import './style.css';

const ChannelItem = ({ data, onClick, selected }) => (
  <li className="channels-list__item">
    <a
      href={`#${data.name}`}
      className={`channels-list__button ${selected && 'channels-list__button-selected'}`}
      onClick={() => onClick(data)}
    >
      {data.name}
    </a>
  </li>
);

export default ChannelItem;
