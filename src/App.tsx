import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import { ConnectedRouter } from 'connected-react-router';
import {
  IAppComponent,
  IAppComponentDispatchToProps,
  IAppComponentMapStateToProps,
} from './App.d';
import { apiActions } from './actions';
import * as firebase from 'firebase/app';
import history from './history';
import ROUTES from './consts/routes';
import UserCard from './components/UserCard';
import Home from './components/Home';
import SignIn from './containers/SignIn';
import Register from './containers/Register';
import DashBoard from './containers/DashBoard';
import { getUserData } from './selectors/apiSelectors';
import { IAppState } from './types/state';

class App extends React.Component<IAppComponent> {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.apiActions.saveUserData(user);
    });
  }
  render() {
    const { user } = this.props;
    console.log(user);

    return (
      <div className="bg-white-10 vh-100">
        <ConnectedRouter history={history}>
          <Switch>
            <Route path={ROUTES.INDEX} component={Home} exact />
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <Route path={ROUTES.DASHBOARD} component={DashBoard} />
            <Route path={ROUTES.REGISTER} component={Register} />
            <Route path={ROUTES.CARD} component={UserCard} />
          </Switch>
        </ConnectedRouter>
        {user && <footer>Footer</footer>}
      </div>
    );
  }
}

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): IAppComponentDispatchToProps => ({
  apiActions: bindActionCreators(apiActions, dispatch),
  // apiThunk: bindActionCreators(apiThunk, dispatch),
});
export const mapStateToProps = (
  state: IAppState,
): IAppComponentMapStateToProps => ({
  user: getUserData(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
