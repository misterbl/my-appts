import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";
import ROUTES from "./consts/routes";
import store from "./configureStore";
import UserCard from "./components/UserCard";
import Home from "./containers/Home";
import "./App.css";

// const store = configureStore({}, history);
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path={ROUTES.INDEX} component={Home} exact />
              <Route path={ROUTES.CARD} component={UserCard} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
