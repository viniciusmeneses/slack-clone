import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const ChannelItem = ({ channel, onClick, selected }) => (
  <li className={`channels-list__item ${selected && 'channels-list__item-selected'}`}>
    <button
      type="button"
      className={`channels-list__button ${selected && 'channels-list__button-selected'}`}
      onClick={() => onClick(channel)}
    >
      {channel.name}
    </button>
  </li>
);

ChannelItem.propTypes = {
  channel: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default ChannelItem;
