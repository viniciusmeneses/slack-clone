import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import client from './services/client';

import Header from './components/Header';
import Chat from './components/Chat';
import ChannelList from './components/Channel/ChannelList';

import './App.css';

export default class App extends Component {
  state = {
    channel: {},
    messages: [],
    currentUser: {},
  };

  componentDidMount() {
    this.fetchCurrentUser();
  }

  fetchCurrentUser = () => {
    client.fetchUser().then(user => this.setState({
      currentUser: user,
    }));
  };

  listMessages = (channel) => {
    client.listMessages(channel.id).then(messages => this.setState({ messages, channel }));
  };

  render() {
    const { messages, channel, currentUser } = this.state;
    return (
      <div className="wrapper">
        <ChannelList user={currentUser} onUpdateChannel={this.listMessages} />
        <div className="content">
          <Header channel={channel.name} />
          <Chat messages={messages} />
        </div>
        <NotificationContainer />
      </div>
    );
  }
}
