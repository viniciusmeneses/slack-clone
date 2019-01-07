import React from 'react';
import { NotificationContainer } from 'react-notifications';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Chat from './components/Chat';
import ChannelList from './components/Channel/ChannelList';

import './App.css';

const showNotification = ({ errorTitle, errorMessage }) => {
  // NotificationManager.error(errorMessage, errorTitle);
};

const App = () => (
  <div className="wrapper">
    <Sidebar />
    <ChannelList />
    <div className="content">
      <Header />
      <Chat onError={showNotification} />
    </div>
    <NotificationContainer />
  </div>
);

export default App;
