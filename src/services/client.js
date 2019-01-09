import axios from 'axios';
import {
  reverse, propOr, prop, filter, map,
} from 'ramda';
import { NotificationManager } from 'react-notifications';

const linkRegex = /<(.+)>/gi;
const mentionRegex = /<[@!](.+)>/gi;
const parseMentionRegex = /\B@(\w+)/gi;

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

  const fetchUsers = () => get('users.list')
    .then(prop('members'))
    .then(filter(user => !user.deleted))
    .then(users => users.map(user => ({ id: user.id, ...prop('profile')(user) })))
    .then(profiles => profiles.map(profile => ({
      id: profile.id,
      name: profile.display_name || profile.real_name,
      avatar: profile.image_72,
    })));

  const workspaceUsers = fetchUsers();

  const findMentions = message => workspaceUsers.then(users => ({
    ...message,
    content: message.content.replace(mentionRegex, (mention) => {
      const mentionUserId = mentionRegex.exec(mention)[1];
      const userFound = users.find(({ id }) => id === mentionUserId);
      return `@${userFound ? userFound.name : mentionUserId}`;
    }),
  }));

  const findLinks = message => ({
    ...message,
    content: message.content.replace(linkRegex, link => linkRegex.exec(link)[1]),
  });

  const findUser = message => workspaceUsers.then(users => ({
    ...message,
    author: users.find(({ id }) => message.author === id),
  }));

  const parseMentions = message => workspaceUsers.then(users => ({
    ...message,
    text: message.text.replace(parseMentionRegex, (mention) => {
      const [, mentionUser] = parseMentionRegex.exec(mention);
      const userFound = users.find(({ name }) => name === mentionUser);
      return `<@${userFound ? userFound.id : mentionUser}>`;
    }),
  }));

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
      .then(messages => Promise.all(messages.map(findUser)))
      .then(filter(message => message.author))
      .then(map(findMentions))
      .then(messages => Promise.all(messages))
      .then(map(findLinks)),

    createMessage: (channel, text) => {
      const newMessage = {
        channel,
        text,
        as_user: true,
      };
      return parseMentions(newMessage)
        .then(message => get('chat.postMessage', message))
        .then(prop('message'))
        .then(message => ({
          id: message.ts + message.text,
          author: message.user,
          date: new Date(parseFloat(message.ts) * 1000),
          content: message.text,
        }))
        .then(findUser)
        .then(findMentions)
        .then(findLinks)
        .catch(err => showNotification({ errorTitle: 'Message send', errorMessage: err }));
    },

    listChannels: () => get('channels.list')
      .then(prop('channels'))
      .then(channels => channels.map(channel => ({
        id: channel.id,
        name: channel.name,
      }))),

    getCurrentUser: () => get('users.profile.get')
      .then(prop('profile'))
      .then((profile) => {
        const name = profile.display_name || profile.real_name;
        return {
          name,
          avatar: profile.image_72,
        };
      }),

    getCurrentTeam: () => get('team.info')
      .then(prop('team'))
      .then(team => team.name),
  };
};

const slackClient = createSlackClient();
export default slackClient;
