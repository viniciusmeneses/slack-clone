import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Linkify from 'react-linkify';
import { textEmoji } from 'markdown-to-text-emoji';

import './style.css';

const Message = ({ message }) => (
  <article className="message-list__message">
    <div className="message__avatar">
      <img
        src={message.author.avatar}
        title={message.author.name}
        alt="Message Avatar"
        className="message__avatar-image"
      />
    </div>

    <div className="message__content">
      <header className="content__message-header">
        <h1 className="message-header__name">{message.author.name}</h1>
        <span className="message-header__created-time">
          {moment(message.date).format('hh:mm A')}
        </span>
      </header>

      <article className="content__message-body">
        <p className="message-body__text">
          <Linkify>{textEmoji(message.content)}</Linkify>
        </p>
      </article>
    </div>
  </article>
);

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    content: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    author: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};

export default Message;
