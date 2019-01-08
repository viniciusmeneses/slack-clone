import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../services/client';

import Message from './Message';
import MessageList from './MessageList';
import MessageSender from './MessageSender';

import './style.css';

export default class Chat extends Component {
  state = {
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

  addNewMessage = (newMessage) => {
    // const { messages } = this.props;
    // messages.push(newMessage);
    // this.setState({
    //   messages,
    // });
  };

  renderMessages = () => {
    const { messages } = this.props;
    return messages.map(message => <Message key={message.id} message={message} {...this.props} />);
  };

  render() {
    const { currentUser } = this.state;

    return (
      <main className="chat">
        <MessageList data-simplebar>{this.renderMessages()}</MessageList>
        <MessageSender user={currentUser} onMessageSend={this.addNewMessage} />
      </main>
    );
  }
}
