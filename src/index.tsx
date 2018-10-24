import * as React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import * as locale_en from 'react-intl/locale-data/en';
import * as locale_fr from 'react-intl/locale-data/fr';
import { ConnectedRouter } from 'connected-react-router';
import * as messages_fr from './consts/i18n/fr';
import * as messages_en from './consts/i18n/en';
import history from './history';

import configureStore from './configureStore';

import './styles/css/index.css';
import App from './App';

const store = configureStore({}, history);

const messages = {
  fr: messages_fr,
  en: messages_en,
};
const language = navigator.language.split(/[-_]/)[0];

addLocaleData([...locale_en, ...locale_fr]);

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={language} messages={messages[language]}>
    <ConnectedRouter history={history}>
      <App />
      </ConnectedRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
