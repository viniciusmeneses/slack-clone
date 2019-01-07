import React, { Component } from 'react';
import ChannelItem from '../ChannelItem';
import client from '../../../services/client';

import './style.css';

export default class Channel extends Component {
  state = {
    channelList: [],
  };

  componentDidMount() {
    this.loadChannelsList();
  }

  loadChannelsList = () => {
    client.listChannels().then(channels => this.setState({ channelList: channels }));
  };

  updateChannel = () => {};

  renderChannelList = () => {
    const { channelList } = this.state;
    return channelList.map(({ id, name }) => (
      <ChannelItem key={id} name={name} onClick={this.updateChannel} />
    ));
  };

  render() {
    return (
      <nav className="chat__menu">
        <div className="section-header chat-menu__header">Tagview</div>

        <div className="chat-menu__channels">
          <h4 className="channels-list__title">Channels</h4>

          <ul className="channels-list">{this.renderChannelList()}</ul>
        </div>
      </nav>
    );
  }
}
