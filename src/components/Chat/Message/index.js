import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Message = ({ data }) => (
  <article className="message-list__message">
    <div className="message__avatar">
      <img
        src={data.author.avatar}
        title={data.author.name}
        alt="Message Avatar"
        className="message__avatar-image"
      />
    </div>

    <div className="message__content">
      <header className="content__message-header">
        <h1 className="message-header__name">{data.author.name}</h1>
        <span className="message-header__created-time">
          {new Date(data.created_at).toTimeString().substring(0, 5)}
        </span>
      </header>

      <article className="content__message-body">
        <p className="message-body__text">{data.content}</p>
      </article>
    </div>
  </article>
);

Message.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string,
    author: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};

export default Message;
