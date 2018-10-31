import * as React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../firebase';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { ILoginComponent, ILoginState } from './Login.d';
import ROUTES from '../../consts/routes';
import FacebookButton from 'src/components/FacebookButton';
import labelColor from '../../utils/labelColor';
import { WarningIcon } from '../../styles/assets/';
class Login extends React.Component<ILoginComponent, ILoginState> {
  constructor(props: ILoginComponent) {
    super(props);
    this.state = {
      wrongAuth: false,
      focused: '',
    };
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
        this.setState({ wrongAuth: true });
      });
  };

  faceBookLogin = () => {
    auth.doFacebookSignIn();
    this.props.history.push(ROUTES.DASHBOARD);
  };

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div className="flex flex-column vh-100 green-bg ph4">
        {/* <a className="kidappi white mt5 tc w-100">Kidappi</a> */}
        <FacebookButton
          className="mt5 shadow-5"
          onClick={() => this.faceBookLogin()}
        />
        <div className="text--line-through">
          <span className="spant3 ma0 tc white text--line-through--text">
            <FormattedMessage id="general|or" />
          </span>
        </div>
        <p className="tc white f4">
          <FormattedMessage id="content|login|loginwithemail" />
        </p>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required(formatMessage({ id: 'content|login|emailrequired' })),
            password: Yup.string().required(
              formatMessage({ id: 'content|login|passwordrequired' }),
            ),
          })}
          onSubmit={this.onSubmit}
        >
          {({ values, isSubmitting, setFieldValue, touched, errors }) => (
            <Form autoComplete="off" className="flex flex-column white-input ">
              <label
                className={`${labelColor(
                  values.email,
                  'glow white',
                  'o-0',
                )} f6`}
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
              {touched.email &&
                errors.email && (
                  <span className="db green-error mt2 flex" role="alert">
                    <WarningIcon fill="#cce281" height="15pt" width="15pt" />
                    <span className="ml2">{errors.email}</span>
                  </span>
                )}
              <label
                className={`${labelColor(
                  values.password,
                  'glow white',
                  'o-0',
                )} f6 mt4`}
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
              {touched.password &&
                errors.password && (
                  <span className="db green-error mt2 flex" role="alert">
                    <WarningIcon fill="#cce281" height="15pt" width="15pt" />
                    <span className="ml2">{errors.password}</span>
                  </span>
                )}
              <a
                className="mv4 white tc no-underline"
                href={ROUTES.PASSWORD_RESET}
              >
                <strong>
                  <FormattedMessage id="content|login|forgotpassword" />
                </strong>
              </a>
              <button
                className="loginNext fw7 ph3 ttc di pv3 bn shadow-5"
                type="submit"
                disabled={isSubmitting}
              >
                <FormattedMessage id="general|button|signin" />
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
