import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChannelItem from '../ChannelItem';
import client from '../../../services/client';

import './style.css';

export default class Channel extends Component {
  state = {
    channelList: [],
    selectedChannel: '',
  };

  static propTypes = {
    team: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    onUpdateChannel: PropTypes.func.isRequired,
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
        channel={channel}
        onClick={this.updateChannel}
        selected={channel === selectedChannel}
      />
    ));
  };

  render() {
    const { user, team } = this.props;
    return (
      <nav className="chat__menu">
        <div className="section-header chat-menu__header">
          <h1 className="chat-menu__header-workspace">{team}</h1>
          <h6 className="chat-menu__header-user">
            <i className="fas fa-circle chat-menu__header-user-status" />
            {user.name}
          </h6>
        </div>

        <div className="chat-menu__channels">
          <h4 className="channels-list__title">Channels</h4>

          <ul className="channels-list">{this.renderChannelList()}</ul>
        </div>
      </nav>
    );
  }
}
