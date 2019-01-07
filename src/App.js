import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Chat from './components/Chat';

import './App.css';

const showNotification = ({ errorTitle, errorMessage }) => {
  NotificationManager.error(errorMessage, errorTitle);
};

const App = () => (
  <div className="wrapper">
    <Sidebar />
    <div className="content">
      <Header />
      <Chat onError={showNotification} />
    </div>
    <NotificationContainer />
  </div>
);

export default App;
