import * as React from 'react';
import { Formik, Form } from 'formik';
import { auth } from '../../firebase';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { ILoginComponent } from './Login.d';
import ROUTES from '../../consts/routes';
import FacebookButton from 'src/components/FacebookButton';
import labelColor from '../../utils/labelColor';
class Login extends React.Component<ILoginComponent> {
  onSubmit = (event: any) => {
    const { email, password } = event;
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        console.log(error);
      });
  };

  faceBookLogin = () => {
    console.log('clicked');

    auth.doFacebookSignIn();
    this.props.history.push(ROUTES.DASHBOARD);
  };

  signOut = () => {
    auth.doSignOut();
  };

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div className="flex flex-column vh-100 bg-kids">
        <FacebookButton className="mt6" onClick={() => this.faceBookLogin()} />
        <p className="pt3 ma0 tc">
          <FormattedMessage id="general|or" />
        </p>
        <p className="tc pb2">
          <FormattedMessage id="content|login|loginwithemail" />
        </p>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={this.onSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="flex flex-column">
              <label
                className={`${labelColor(values.email)} f6`}
                htmlFor="email"
              >
                <FormattedMessage id="general|placeholder|email" />
              </label>
              <input
                value={values.email}
                name="email"
                onFocus={() => this.setState({ focused: 'email' })}
                onChange={event => setFieldValue('email', event.target.value)}
                type="text"
                placeholder={formatMessage({
                  id: 'general|placeholder|email',
                })}
              />
              <label
                className={`${labelColor(values.password)} f6`}
                htmlFor="password"
              >
                <FormattedMessage id="general|placeholder|password" />
              </label>
              <input
                value={values.password}
                name="password"
                onChange={event =>
                  setFieldValue('password', event.target.value)
                }
                type="password"
                placeholder={formatMessage({
                  id: 'general|placeholder|password',
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

const injectIntlLogin = injectIntl(Login);
export default withRouter(injectIntlLogin);
