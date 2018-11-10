import * as React from 'react';
import { Formik, Form } from 'formik';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import * as Yup from 'yup';

// import * as firebase from 'firebase/app';
import { auth } from '../../firebase';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  IRegisterComponent,
  IRegisterFormDispatchToProps,
  IRegisterFormMapStateToProps,
  IRegisterState,
} from './Register.d';
import { ROUTES, QUERIES } from '../../consts';
import * as apiThunk from '../../actions/thunks/apiThunk';
import labelColor from '../../utils/labelColor';
import { IAppState } from 'src/types/state';
import { getUserData } from 'src/selectors/apiSelectors';
import FacebookButton from 'src/components/FacebookButton';
import ErrorMessage from '../../components/ErrorMessage';

export class Register extends React.Component<
  IRegisterComponent,
  IRegisterState
> {
  constructor(props: IRegisterComponent) {
    super(props);
    this.state = {
      userExists: false,
    };
  }

  createUserInDb = async (email: string, avatar: string | null = '') => {
    (await this.props.apiThunk.getUserData(QUERIES({ email }).GET_USER))
      ? this.props.history.push(ROUTES.DASHBOARD)
      : this.props.apiThunk.postUserData(QUERIES({ email, avatar }).ADD_USER);

    this.props.history.push(ROUTES.DASHBOARD);
  };
  onSubmit = (event: any) => {
    const { email, password } = event;
    auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.createUserInDb(email);
      })
      .catch(error => {
        console.log(error);
        this.setState({ userExists: true });
      });
  };

  faceBookLogin = async () => {
    const fbUser = await auth.doFacebookSignIn();
    // @ts-ignore
    this.createUserInDb(fbUser && fbUser.email, fbUser && fbUser.photoURL);
  };

  signOut = () => {
    auth.doSignOut();
  };

  render() {
    console.log(this.state);

    const { formatMessage } = this.props.intl;
    return (
      <div className="flex flex-column vh-100 green-bg ph4 ph7-l ph6-m pt5-ns">
        {/* <a className="kidappi white mt4 tc w-100">Kidappi</a> */}
        <FacebookButton
          className="mt4 shadow-5"
          onClick={() => this.faceBookLogin()}
        />
        <div className="text--line-through">
          <span className="spant3 ma0 tc white text--line-through--text">
            <FormattedMessage id="general|or" />
          </span>
        </div>
        <p className="tc white f4">
          <FormattedMessage id="content|regiter|registerwithemail" />
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
            password: Yup.string()
              .required(formatMessage({ id: 'content|login|passwordrequired' }))
              .min(6),
          })}
          onSubmit={this.onSubmit}
        >
          {({ values, isSubmitting, setFieldValue, touched, errors }) => (
            <Form
              autoComplete="off"
              className="form-green flex flex-column white-input "
            >
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
                onChange={event => setFieldValue('email', event.target.value)}
                type="text"
                placeholder={formatMessage({
                  id: 'general|placeholder|email',
                })}
              />
              {touched.email &&
                errors.email && (
                  <ErrorMessage
                    fill="#cce281"
                    className="green-error"
                    error={errors.email}
                  />
                )}
              <label
                className={`${labelColor(
                  values.password,
                  'white',
                  'o-0',
                )} f6 mt4`}
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
              {touched.password &&
                errors.password && (
                  <ErrorMessage
                    fill="#cce281"
                    className="green-error"
                    error={errors.password}
                  />
                )}
              <a
                className="mv4 white tc no-underline"
                href={ROUTES.PASSWORD_RESET}
              >
                {this.state.userExists && (
                  <>
                    <ErrorMessage
                      fill="#cce281"
                      className="green-error pb3 tl"
                      error={formatMessage({
                        id: 'content|register|userExists',
                      })}
                    />
                    <strong>
                      <FormattedMessage id="content|login|forgotpassword" />
                    </strong>
                  </>
                )}
              </a>
              <button
                className="loginNext fw7 ph3 ttu di pv3 bn shadow-5"
                type="submit"
                disabled={isSubmitting}
              >
                <FormattedMessage id="general|button|register" />
              </button>
            </Form>
          )}
        </Formik>
        <div onClick={this.signOut}>signOut</div>
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
