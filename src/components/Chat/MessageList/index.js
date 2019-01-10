import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class MessageList extends Component {
  messageRef = createRef();

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const { current } = this.messageRef;
    current.scrollTop = current.scrollHeight;
  };

  render() {
    const { children } = this.props;
    return (
      <section className="chat__message-list" ref={this.messageRef}>
        {children}
      </section>
    );
  }
}
