import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../services/client';

import Message from './Message';
import MessageList from './MessageList';
import MessageSender from './MessageSender';

import './style.css';

export default class Chat extends Component {
  renderMessages = () => {
    const { messages } = this.props;
    return messages.map(message => <Message key={message.id} message={message} />);
  };

  render() {
    const { channel, onMessageSend } = this.props;
    return (
      <main className="chat">
        <MessageList data-simplebar>{this.renderMessages()}</MessageList>
        <MessageSender onMessageSend={onMessageSend} channel={channel} />
      </main>
    );
  }
}
