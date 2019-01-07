import React, { Component } from 'react';
import ChannelItem from '../ChannelItem';
import client from '../../../services/client';

import './style.css';

export default class Channel extends Component {
  state = {
    channelList: [],
    selectedChannel: '',
  };

  componentDidMount() {
    this.loadChannelsList();
  }

  loadChannelsList = () => {
    client.listChannels().then((channels) => {
      const generalChannel = channels.find(({ name }) => name === 'general');
      this.setState({
        channelList: channels,
      });
      this.updateChannel(generalChannel);
    });
  };

  updateChannel = (channel) => {
    const { onUpdateChannel } = this.props;
    this.setState({ selectedChannel: channel });
    onUpdateChannel(channel);
  };

  renderChannelList = () => {
    const { channelList, selectedChannel } = this.state;
    return channelList.map(channel => (
      <ChannelItem
        key={channel.id}
        data={channel}
        onClick={this.updateChannel}
        selected={channel === selectedChannel}
      />
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
