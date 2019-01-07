import React from 'react';

import './style.css';

const Header = ({ channel }) => (
  <header className="header">
    <h1 className="header__title">
#
      {channel}
    </h1>
  </header>
);

export default Header;
