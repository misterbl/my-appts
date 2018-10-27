import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import {
  IAppComponent,
  IAppComponentDispatchToProps,
  IAppComponentMapStateToProps,
} from './App.d';
import { apiActions } from './actions';
import * as firebase from 'firebase/app';
import { ROUTES, QUERIES } from './consts';
// import UserCard from './components/UserCard';
import Home from './components/Home';
import SignIn from './containers/SignIn';
import Register from './containers/Register';
import DashBoard from './containers/DashBoard';
import Account from './containers/Account/Account';
import AppFooter from './containers/AppFooter/';
import { getUserData } from './selectors/apiSelectors';
import * as apiThunk from './actions/thunks/apiThunk';
import { IAppState } from './types/state';
import UserCard from './components/UserCard/UserCard';
import PersonalInfoForm from './containers/PersonalInfoForm/PersonalInfoForm';
import AddInfoForm from './containers/AddInfoForm/AddInfoForm';

class App extends React.Component<IAppComponent> {
  shortName: string = '';
  constructor(props: IAppComponent) {
    super(props);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return this.props.apiThunk.getUserData(QUERIES({ email: user.email }).GET_USER)
      }
      this.props.history.push(ROUTES.INDEX);
    });
  }

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     this.props.apiActions.saveUserData(user);
  //   });
  // }
  render() {
    const {
      user,
      history: {
        location: { pathname },
      },
    } = this.props;

    return (
      <div className="bg-white-10 vh-100">
        <Switch>
          <Route path={ROUTES.INDEX} component={Home} exact />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.DASHBOARD} component={DashBoard} />
          <Route path={ROUTES.REGISTER} component={Register} />
          <Route path={ROUTES.CARD} component={UserCard} />
          <Route path={ROUTES.INBOX} component={UserCard} />
          <Route path={ROUTES.SEARCH} component={UserCard} />
          <Route path={ROUTES.FAVOURITE} component={UserCard} />
          <Route path={ROUTES.ACCOUNT} component={Account} />
          <Route path={ROUTES.USER_DETAILS} component={PersonalInfoForm} />
          <Route path={ROUTES.AD_DETAILS} component={AddInfoForm} />
        </Switch>
        {user &&
          pathname !== ROUTES.INDEX &&
          pathname !== ROUTES.SIGN_IN &&
          pathname !== ROUTES.REGISTER &&
          pathname !== ROUTES.CARD && <AppFooter />}
      </div>
    );
  }
}

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): IAppComponentDispatchToProps => ({
  apiActions: bindActionCreators(apiActions, dispatch),
  apiThunk: bindActionCreators(apiThunk, dispatch),
});
export const mapStateToProps = (
  state: IAppState,
): IAppComponentMapStateToProps => ({
  user: getUserData(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
