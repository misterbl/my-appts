import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import {
  TAppComponent,
  IAppComponentDispatchToProps,
  IAppComponentMapStateToProps,
} from './App.d';
import { apiActions } from './actions';
import * as firebase from 'firebase/app';
import { ROUTES, QUERIES } from './consts';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import DashBoard from './containers/DashBoard';
import Profile from './containers/Profile/Profile';
import AppFooter from './containers/AppFooter/';
import { getUserData } from './selectors/apiSelectors';
import * as apiThunk from './actions/thunks/apiThunk';
import { IAppState } from './types/state';
import UserCard from './containers/UserCard/UserCard';
import PersonalInfoForm from './containers/PersonalInfoForm/PersonalInfoForm';
import AddInfoForm from './containers/AddInfoForm/AddInfoForm';
import ChildrenForm from './components/ChildrenForm/ChildrenForm';
import PasswordReset from './containers/PasswordReset';
import EditProfile from './containers/EditProfile/EditProfile';

class App extends React.Component<TAppComponent> {
  constructor(props: TAppComponent) {
    super(props);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return this.props.apiThunk.getUserData(
          QUERIES({ email: user.email }).GET_USER,
        );
      } else if (
        !user &&
        this.props.history.location.pathname !== ROUTES.PASSWORD_RESET
      ) {
        this.props.history.push(ROUTES.INDEX);
      }
    });
  }
  render() {
    const {
      user,
      history: {
        location: { pathname },
      },
    } = this.props;

    return (
      <>
        <Switch>
          <Route path={ROUTES.INDEX} component={Home} exact />
          <Route path={ROUTES.SIGN_IN} component={Login} />
          <Route path={ROUTES.REGISTER} component={Register} />
          <Route path={ROUTES.PASSWORD_RESET} component={PasswordReset} />
          <Route path={ROUTES.EDIT_PROFILE} component={EditProfile} />
        </Switch>
        <div className="bg-white-10 vh-100 ml3 mr3 pb5">
          <Switch>
            <Route path={ROUTES.DASHBOARD} component={DashBoard} />
            <Route path={ROUTES.CARD} component={UserCard} />
            <Route path={ROUTES.INBOX} component={ChildrenForm} />
            <Route path={ROUTES.SEARCH} component={DashBoard} />
            <Route path={ROUTES.FAVOURITE} component={EditProfile} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.USER_DETAILS} component={PersonalInfoForm} />
            <Route path={ROUTES.CHILDREN} component={ChildrenForm} />
            <Route path={ROUTES.AD_DETAILS} component={AddInfoForm} />
          </Switch>
        </div>

        {user &&
          pathname !== ROUTES.INDEX &&
          pathname !== ROUTES.SIGN_IN &&
          pathname !== ROUTES.REGISTER &&
          pathname !== ROUTES.PASSWORD_RESET &&
          pathname !== ROUTES.CARD &&
          pathname !== ROUTES.EDIT_PROFILE && <AppFooter />}
      </>
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
