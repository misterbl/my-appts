import * as React from 'react';
import { auth } from '../../firebase';
import { injectIntl, FormattedMessage } from 'react-intl';

const INITIAL_STATE = {
  firstname: '',
  lastname: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName: any, value: any) => () => ({
  [propertyName]: value,
});

export class SignIn extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event: any) => {
    const {
      // @ts-ignore
      email,
      // @ts-ignore
      passwordOne,
    } = this.state;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  };

  faceBookLogin = () => {
    auth.doFacebookSignIn();
  };

  signOut = () => {
    console.log(auth.doSignOut());

    auth.doSignOut();
  };
  render() {
    // @ts-ignore
    const { formatMessage } = this.props.intl;
    const {
      // @ts-ignore
      firstname,
      // @ts-ignore
      lastname,
      // @ts-ignore
      email,
      // @ts-ignore
      passwordOne,
      // @ts-ignore
      passwordTwo,
      // @ts-ignore
      error,
    } = this.state;

    return (
      <div className="green-background flex-column">
        <div className="pt90 text-center">
          <div
            className="fb-login-button"
            data-max-rows="1"
            data-size="large"
            data-button-type="continue_with"
            data-show-faces="false"
            data-auto-logout-link="false"
            data-use-continue-as="false"
          />
        </div>
        <span className="font-white text-center mt30">
          <FormattedMessage id="general|or" />
        </span>
        <form className="signin-register flex-column" onSubmit={this.onSubmit}>
          <input
            value={email}
            onChange={event =>
              this.setState(byPropKey('email', event.target.value))
            }
            type="text"
            // @ts-ignore
            placeholder={formatMessage({ id: 'general|placeholder|email' })}
          />
          <input
            value={firstname}
            onChange={event =>
              this.setState(byPropKey('firstname', event.target.value))
            }
            type="text"
            // @ts-ignore
            placeholder={formatMessage({ id: 'general|placeholder|firstname' })}
          />
          <input
            value={lastname}
            onChange={event =>
              this.setState(byPropKey('lastname', event.target.value))
            }
            type="text"
            // @ts-ignore
            placeholder={formatMessage({ id: 'general|placeholder|lastname' })}
          />
          <input
            value={passwordOne}
            onChange={event =>
              this.setState(byPropKey('passwordOne', event.target.value))
            }
            type="password"
            // @ts-ignore
            placeholder={formatMessage({ id: 'general|placeholder|password' })}
          />
          <input
            value={passwordTwo}
            onChange={event =>
              this.setState(byPropKey('passwordTwo', event.target.value))
            }
            type="password"
            // @ts-ignore
            placeholder={formatMessage({
              id: 'general|placeholder|confirmpassword',
            })}
          />
          <button className="cta-button" type="submit">
            <FormattedMessage id="general|button|next" />
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default injectIntl(SignIn);
