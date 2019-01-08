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

  const fetchUser = (user = '') => get('users.profile.get', { user })
    .then(prop('profile'))
    .then(profile => ({
      id: user,
      name: profile.display_name || profile.real_name,
      avatar: profile.image_72,
    }));

  const replaceMessagesContent = (messages, regex, replaceCallback) => messages.map(message => ({
    ...message,
    content: `${message.content.replace(regex, replaceCallback)}`,
  }));

  const findMentions = messages => replaceMessagesContent(
    messages,
    /<@(.+)>/gi,
    mention => `@${
      messages.find(message => message.author.id === /<@(.+)>/gi.exec(mention)[1]).author.name
    }`,
    '@',
  );

  const findLinks = messages => replaceMessagesContent(messages, /<(.+)>/gi, link => /<(.+)>/gi.exec(link)[1]);

  return {
    listMessages: channel => get('channels.history', { channel })
      .then(propOr([], 'messages'))
      .then(reverse)
      .then(messages => messages.map((message, index) => ({
        id: message.client_msg_id || index,
        author: message.user,
        date: new Date(parseFloat(message.ts) * 1000),
        content: message.text,
      })))
      .then(messages => messages.filter(message => message.id))
      .then(messages => ({ messages, users: messages.map(message => message.author) }))
      .then(data => ({
        ...data,
        users: data.users.reduce(
          (noDuplicateUsers, user) => (noDuplicateUsers.includes(user) ? noDuplicateUsers : [...noDuplicateUsers, user]),
          [],
        ),
      }))
      .then(data => ({ ...data, users: data.users.map(user => fetchUser(user)) }))
      .then(data => ({ ...data, users: Promise.all(data.users) }))
      .then((data) => {
        const messages = [...data.messages];
        return data.users.then(users => messages.map(message => ({
          ...message,
          author: users.find(({ id }) => id === message.author || id === ''),
        })));
      })
      .then(findMentions)
      .then(findLinks),

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
    fetchUser,
  };
};

const slackClient = createSlackClient();
export default slackClient;
