import React from 'react';

import logo from '../../assets/images/logo.png';
import './style.css';

export default () => (
  <aside className="sidebar">
    <div className="sidebar__logo">
      <img src={logo} alt="Tagview Logo" />
    </div>
  </aside>
);
