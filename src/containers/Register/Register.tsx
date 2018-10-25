import * as React from 'react';
import { Formik, Form } from 'formik';
import { auth } from '../../firebase';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { IRegisterComponent } from './Register.d';
import ROUTES from '../../consts/routes';

export class Register extends React.Component<IRegisterComponent> {
  onSubmit = (event: any) => {
    const { email, passwordOne } = event;
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        console.log(error);
      });
  };

  faceBookLogin = () => {
    auth.doFacebookSignIn();
    this.props.history.push(ROUTES.DASHBOARD);
  };

  signOut = () => {
    auth.doSignOut();
  };
  render() {
    const { formatMessage } = this.props.intl;

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

const injectIntlRegister = injectIntl(Register);
export default withRouter(injectIntlRegister);
