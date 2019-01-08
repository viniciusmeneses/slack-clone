import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';
import api from '../../../services/client';

import './style.css';
import 'emoji-mart/css/emoji-mart.css';

export default class MessageSender extends Component {
  messageInputRef = createRef();

  state = {
    message: '',
  };

  static propTypes = {
    onMessageSend: PropTypes.func.isRequired,
  };

  handleInputMessage = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  sendMessage = async (e) => {
    // e.preventDefault();
    // const {
    //   user: { id },
    //   onMessageSend,
    //   onError,
    // } = this.props;
    // const { message } = this.state;
    // if (message) {
    //   try {
    //     const response = await api.post('/messages', { message, author_id: id });
    //     this.setState({ message: '' });
    //     onMessageSend(response.data);
    //   } catch (err) {
    //     onError({
    //       errorTitle: 'Send Message',
    //       errorMessage: err.response.statusText || err.request.statusText,
    //     });
    //   }
    // }
    // this.messageInputRef.current.focus();
  };

  render() {
    const { message } = this.state;

    return (
      <section className="chat__message-sender">
        <form className="message-sender__form" id="message-sender-form" onSubmit={this.sendMessage}>
          <input
            type="text"
            className="form__message"
            name="message"
            id="message"
            placeholder="Type a message..."
            value={message}
            onChange={this.handleInputMessage}
            ref={this.messageInputRef}
          />
          <button type="submit" className="form__send" />

          <Picker
            set="emojione"
            title="Slack"
            emoji="speech_balloon"
            onSelect={emoji => this.setState({ message: emoji.native })}
          />
        </form>
      </section>
    );
  }
}
