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
    team: '',
  };

  componentDidMount() {
    this.fetchCurrentUser();
    this.fetchCurrentTeam();
  }

  fetchCurrentUser = () => client.getCurrentUser().then(user => this.setState({
    currentUser: user,
  }));

  fetchCurrentTeam = () => client.getCurrentTeam().then(team => this.setState({ team }));

  listMessages = (channel) => {
    const { team } = this.state;
    document.title = `#${channel.name} | ${team} Slack`;
    client.listMessages(channel.id).then(messages => this.setState({ messages, channel }));
  };

  addNewMessage = newMessage => this.setState(prevState => ({
    messages: [...prevState.messages, newMessage],
  }));

  render() {
    const {
      messages, channel, currentUser, team,
    } = this.state;

    return (
      <div className="wrapper">
        <ChannelList team={team} user={currentUser} onUpdateChannel={this.listMessages} />
        <div className="content">
          <Header channel={channel.name} />
          <Chat messages={messages} onMessageSend={this.addNewMessage} channel={channel} />
        </div>
        <NotificationContainer />
      </div>
    );
  }
}
