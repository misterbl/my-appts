import * as React from 'react';
import { Formik, Form } from 'formik';
import { auth } from '../../firebase';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { ILoginComponent, ILoginState } from './Login.d';
import ROUTES from '../../consts/routes';
import FacebookButton from 'src/components/FacebookButton';
import labelColor from '../../utils/labelColor';
class Login extends React.Component<ILoginComponent, ILoginState> {
  constructor(props: ILoginComponent) {
    super(props);
    this.state = {
      wrongAuth: false,
      focused: '',
    }
  }

  onSubmit = (event: any) => {
    const { email, password } = event;
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.props.history.push(ROUTES.DASHBOARD);
      })
      .catch(error => {
        console.log(error);
        this.setState({ wrongAuth: true })
      });
  };

  faceBookLogin = () => {
    auth.doFacebookSignIn();
    this.props.history.push(ROUTES.DASHBOARD);
  };

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div className="flex flex-column vh-100 bg-light-blue ph4">
        <a className="kidappi green mt5 tc w-100">Kidappi</a>
        <FacebookButton className="mt5" onClick={() => this.faceBookLogin()} />
        <p className="pt3 ma0 tc white">
          <FormattedMessage id="general|or" />
        </p>
        <p className="tc pb2 white">
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
            <Form autoComplete="off" className="flex flex-column white-input ">
              <label
                className={`${labelColor(values.email, 'white', 'o-0')} f6`}
                htmlFor="email"
              >
                <FormattedMessage id="general|placeholder|email" />
              </label>
              <input
                autoComplete="new-email"
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
                className={`${labelColor(values.password, 'white', 'o-0')} f6`}
                htmlFor="password"
              >
                <FormattedMessage id="general|placeholder|password" />
              </label>
              <input
                autoComplete="new-password"
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
              <a className="mb3 white tc no-underline" href={ROUTES.PASSWORD_RESET}><FormattedMessage id="content|login|forgotpassword" /></a>
              <button
                className="bg-green white fw7 ph3 ttc di pv3 bn shadow-5"
                type="submit"
                disabled={isSubmitting}
              >
                <FormattedMessage id="general|button|next" />
              </button>

              {/* {error && <p>{error.message}</p>} */}
            </Form>
          )}
        </Formik>
        {this.state.wrongAuth && <div>Wrong credentials</div>}
      </div>
    );
  }
}

const injectIntlLogin = injectIntl(Login);
export default withRouter(injectIntlLogin);
