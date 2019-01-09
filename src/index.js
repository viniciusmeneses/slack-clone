import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './vendor/reset.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-notifications/lib/notifications.css';
import './index.css';

require('dotenv').config();

ReactDOM.render(<App />, document.getElementById('root'));
