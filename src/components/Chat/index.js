import React from 'react';
import PropTypes from 'prop-types';

import Message from './Message';
import MessageList from './MessageList';
import MessageSender from './MessageSender';

import './style.css';

const Chat = ({ channel, onMessageSend, messages }) => (
  <main className="chat">
    <MessageList>
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </MessageList>
    <MessageSender onMessageSend={onMessageSend} channel={channel} />
  </main>
);

Chat.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onMessageSend: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Chat;
