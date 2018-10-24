import * as React from 'react';
import { Formik, Form } from 'formik';
import { auth } from '../../firebase';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { ISignInComponent } from './SignIn.d';
import ROUTES from '../../consts/routes';

// const INITIAL_STATE = {
//   firstname: '',
//   lastname: '',
//   email: '',
//   passwordOne: '',
//   passwordTwo: '',
//   error: null,
// };

// const byPropKey = (propertyName: any, value: any) => () => ({
//   [propertyName]: value,
// });

export class SignIn extends React.Component<ISignInComponent> {
  // constructor(props: any) {
  //   super(props);

  //   this.state = { ...INITIAL_STATE };
  // }
  onSubmit = (event: any) => {
    const { email, passwordOne } = event;
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // TODO set the state with user data
      })
      .catch(error => {
        console.log(error);
      });
  };

  faceBookLogin = () => {
    // await auth.doFacebookSignIn();
    console.log('done');

    this.props.history.push(ROUTES.DASHBOARD);
  };

  signOut = () => {
    console.log(auth.doSignOut());

    auth.doSignOut();
  };
  render() {
    console.log(this);

    const { formatMessage } = this.props.intl;

    return (
      <div className="bg-light-green flex flex-column vh-100">
        <div
          onClick={this.faceBookLogin}
          className="fb-login-button pt5 tc"
          data-max-rows="1"
          data-size="large"
          data-button-type="continue_with"
          data-show-faces="false"
          data-auto-logout-link="false"
          data-use-continue-as="false"
        />
        <span className="white tc mt2">
          <FormattedMessage id="general|or" />
        </span>

        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
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
              <label htmlFor="firstname" />
              <input
                value={values.firstName}
                name="firstName"
                onChange={event =>
                  setFieldValue('firstName', event.target.value)
                }
                type="text"
                placeholder={formatMessage({
                  id: 'general|placeholder|firstname',
                })}
              />
              <label htmlFor="lastname" />
              <input
                value={values.lastName}
                name="lastName"
                onChange={event =>
                  setFieldValue('lastName', event.target.value)
                }
                type="text"
                placeholder={formatMessage({
                  id: 'general|placeholder|lastname',
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

const injectIntlSignin = injectIntl(SignIn);
export default withRouter(injectIntlSignin);
