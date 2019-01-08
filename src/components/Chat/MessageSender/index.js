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
    emojiOpen: false,
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

  handleEmojiButton = () => this.setState({ emojiOpen: true });

  handleEmojiSelect = emoji => this.setState(({ message }) => ({ message: `${message}${emoji.native}`, emojiOpen: false }));

  render() {
    const { message, emojiOpen } = this.state;

    return (
      <section className="chat__message-sender">
        <form className="message-sender__form" id="message-sender-form" onSubmit={this.sendMessage}>
          <input
            type="text"
            className="form__message"
            name="message"
            id="message"
            placeholder="Message #estagioslackclone"
            value={message}
            onChange={this.handleInputMessage}
            ref={this.messageInputRef}
          />
          <div>
            <button type="button" className="form__emoji-button" onClick={this.handleEmojiButton}>
              <i className="far fa-smile form__emoji-button__icon" />
            </button>
            <Picker
              title="Slack"
              emoji="speech_balloon"
              style={{
                display: emojiOpen ? 'block' : 'none',
                position: 'absolute',
                right: 17,
                bottom: 61,
                boxShadow: '0 0px 5px 0 #00000018',
              }}
              onSelect={this.handleEmojiSelect}
            />
          </div>
        </form>
      </section>
    );
  }
}
