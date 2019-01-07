import axios from 'axios';
import { reverse, propOr, prop } from 'ramda';
import { NotificationManager } from 'react-notifications';

const api = axios.create({
  baseURL: 'https://slack.com/api',
});

const createSlackClient = () => {
  const showNotification = ({ errorTitle, errorMessage }) => {
    NotificationManager.error(errorMessage, errorTitle);
  };

  const get = (method, params = {}) => {
    const queryStrings = Object.entries(params).map(entry => entry.join('='));
    return api
      .get(`${method}?token=${process.env.REACT_APP_TOKEN}&${queryStrings.join('&')}`)
      .then(prop('data'))
      .then((data) => {
        if (data.ok) return data;
        throw data.error;
      })
      .catch((err) => {
        showNotification({
          errorTitle: 'Slack API',
          errorMessage: err,
        });
        throw err;
      });
  };

  return {
    listMessages: channel => get('channels.history', { channel })
      .then(propOr([], 'messages'))
      .then(reverse)
      .then(messages => messages.map(message => ({
        id: message.client_msg_id,
        author: message.user,
        date: new Date(parseFloat(message.ts) * 1000),
        content: message.text,
      }))),
    createMessage: (channel, text) => get('chat.postMessage', { channel, text })
      .then(prop('message'))
      .then(message => ({
        id: message.ts + message.text,
        author: message.username,
        date: new Date(parseFloat(message.ts) * 1000),
        content: message.text,
      })),
    listChannels: () => get('channels.list')
      .then(prop('channels'))
      .then(channels => channels.map(channel => ({
        id: channel.id,
        name: channel.name,
      }))),
  };
};

const slackClient = createSlackClient();
export default slackClient;
