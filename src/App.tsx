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
// import Profile from './containers/Profile/Profile';
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
  userEmail: string;
  constructor(props: TAppComponent) {
    super(props);
    this.getUserInfo();
  }
  getUserInfo = () => {
    const {
      apiThunk: { getUserData: getData },
    } = this.props;
    if (!this.props.user) {
      firebase.auth().onAuthStateChanged(async loggedInUser => {
        if (loggedInUser) {
          getData(QUERIES({ email: loggedInUser.email }).GET_USER).then(() =>
            this.render(),
          );
        } else if (
          !loggedInUser &&
          this.props.history.location.pathname !== ROUTES.PASSWORD_RESET
        ) {
          return this.props.history.push(ROUTES.INDEX);
        }
      });
    }
  };
  // checkUser = () => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (
  //       !user &&
  //       this.props.history.location.pathname !== ROUTES.PASSWORD_RESET
  //     ) {
  //       return this.props.history.push(ROUTES.INDEX);
  //     }
  //     this.props.apiActions.saveUserEmail(user && user.email);
  //   });
  // };
  render() {
    const {
      user,
      history: {
        location: { pathname },
      },
    } = this.props;
    const { INDEX, SIGN_IN, REGISTER, PASSWORD_RESET, EDIT_PROFILE } = ROUTES;

    const pageClass =
      pathname === INDEX ||
      pathname === SIGN_IN ||
      pathname === REGISTER ||
      pathname === PASSWORD_RESET ||
      pathname === EDIT_PROFILE
        ? ''
        : 'bg-white-10 mh3 pb5 ph7-l ph5-m';

    return (
      <>
        <div className={pageClass}>
          <Switch>
            <Route path={ROUTES.INDEX} component={Home} exact />
            <Route path={ROUTES.SIGN_IN} component={Login} />
            <Route path={ROUTES.REGISTER} component={Register} />
            <Route path={ROUTES.PASSWORD_RESET} component={PasswordReset} />
            <Route path={ROUTES.EDIT_PROFILE} component={EditProfile} />
            <Route path={ROUTES.DASHBOARD} component={DashBoard} />
            <Route path={ROUTES.CARD} component={UserCard} />
            {/* <Route path={ROUTES.INBOX} component={DashBoard} />
            <Route path={ROUTES.SEARCH} component={DashBoard} /> */}
            {/* <Route path={ROUTES.FAVOURITE} component={EditProfile} /> */}
            <Route path={ROUTES.PROFILE} component={UserCard} />
            <Route path={ROUTES.USER_DETAILS} component={PersonalInfoForm} />
            <Route path={ROUTES.CHILDREN} component={ChildrenForm} />
            <Route path={ROUTES.AD_DETAILS} component={AddInfoForm} />
          </Switch>
        </div>
        {user &&
          pathname.indexOf('card') === -1 &&
          pathname !== ROUTES.SIGN_IN &&
          pathname !== ROUTES.INDEX &&
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
