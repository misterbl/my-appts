import * as React from 'react';
import { Formik, Form } from 'formik';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import * as firebase from 'firebase/app';
import { auth } from '../../firebase';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  IRegisterComponent,
  IRegisterFormDispatchToProps,
  IRegisterFormMapStateToProps,
} from './Register.d';
import ROUTES from '../../consts/routes';

import * as apiThunk from '../../actions/thunks/apiThunk';
import { IAppState } from 'src/types/state';
import { getUserData } from 'src/selectors/apiSelectors';

export class Register extends React.Component<IRegisterComponent> {
  // TODO first check if user exist
  createUserInDb = (email: string | null) => {
    const query = `mutation {
      addUser (email: "${email}" ) {
        _id
        firstName
        lastName
        email
        address
        profileTitle
        profileDescription
       
      }
    }`;
    this.props.apiThunk.postUserData(query);
    this.props.history.push(ROUTES.DASHBOARD);
  };
  onSubmit = (event: any) => {
    const { email, passwordOne } = event;
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.createUserInDb(email);
      })
      .catch(error => {
        console.log(error);
      });
  };

  faceBookLogin = async () => {
    await auth.doFacebookSignIn();
    await firebase.auth().onAuthStateChanged(fbUser => {
      this.createUserInDb(fbUser && fbUser.email);
    });
  };

  signOut = () => {
    auth.doSignOut();
  };
  render() {
    const { formatMessage } = this.props.intl;
    console.log(this);

    return (
      <div className="flex flex-column vh-100">
        <button onClick={this.signOut}>Logout</button>
        <button onClick={this.faceBookLogin} className="facebook-button" />
        <span className="white tc mt2">
          <FormattedMessage id="general|or" />
        </span>

        <Formik
          initialValues={{
            email: '',
            passwordOne: '',
            passwordTwo: '',
          }}
          onSubmit={this.onSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="signin-register flex flex-column">
              <label htmlFor="email" />
              <input
                value={values.email}
                name="email"
                onChange={event => setFieldValue('email', event.target.value)}
                type="text"
                placeholder={formatMessage({
                  id: 'general|placeholder|email',
                })}
              />
              <label htmlFor="passwordOne" />
              <input
                value={values.passwordOne}
                name="passwordOne"
                onChange={event =>
                  setFieldValue('passwordOne', event.target.value)
                }
                type="password"
                placeholder={formatMessage({
                  id: 'general|placeholder|password',
                })}
              />
              <label htmlFor="passwordTwo" />
              <input
                value={values.passwordTwo}
                name="passwordTwo"
                onChange={event =>
                  setFieldValue('passwordTwo', event.target.value)
                }
                type="password"
                placeholder={formatMessage({
                  id: 'general|placeholder|confirmpassword',
                })}
              />
              <button
                className="bg-green white fw7 ph3 ttc di pv3 bn-ns"
                type="submit"
                disabled={isSubmitting}
              >
                <FormattedMessage id="general|button|next" />
              </button>

              {/* {error && <p>{error.message}</p>} */}
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): IRegisterFormDispatchToProps => ({
  apiThunk: bindActionCreators(apiThunk, dispatch),
});

export const mapStateToProps = (
  state: IAppState,
): IRegisterFormMapStateToProps => ({
  user: getUserData(state),
});
const injectIntlRegister = injectIntl(Register);
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(injectIntlRegister),
);
