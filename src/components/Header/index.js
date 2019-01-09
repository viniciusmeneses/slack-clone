import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Header = ({ channel }) => (
  <header className="header">
    <h1 className="header__title">
#
      {channel}
    </h1>
  </header>
);

Header.defaultProps = {
  channel: '',
};

Header.propTypes = {
  channel: PropTypes.string,
};

export default Header;
