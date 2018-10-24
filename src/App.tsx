import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { addLocaleData, IntlProvider } from 'react-intl';
import * as locale_en from 'react-intl/locale-data/en';
import * as locale_fr from 'react-intl/locale-data/fr';
import * as messages_fr from './consts/i18n/fr';
import * as messages_en from './consts/i18n/en';
import history from './history';
import ROUTES from './consts/routes';
import configureStore from './configureStore';
import UserCard from './components/UserCard';
import Home from './components/Home';
import Signin from './containers/Signin';
// import Register from './containers/Register';

const store = configureStore({}, history);
const messages = {
  fr: messages_fr,
  en: messages_en,
};
const language = navigator.language.split(/[-_]/)[0];

addLocaleData([...locale_en, ...locale_fr]);

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <IntlProvider locale={language} messages={messages[language]}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <Switch>
                <Route path={ROUTES.INDEX} component={Home} exact />
                <Route path={ROUTES.SIGN_IN} component={Signin} />
                <Route path={ROUTES.DASHBOARD} component={UserCard} />
                {/* <Route path={ROUTES.REGISTER} component={Register} /> */}
                <Route path={ROUTES.CARD} component={UserCard} />
              </Switch>
            </ConnectedRouter>
          </Provider>
        </IntlProvider>
      </div>
    );
  }
}

export default App;
