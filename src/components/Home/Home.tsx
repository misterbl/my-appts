import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps, StaticContext } from 'react-router';
import ROUTES from '../../consts/routes';

export class Home extends React.Component<
  RouteComponentProps<any, StaticContext>
> {
  pushToSignIn = () => {
    this.props.history.push('/signin');
  };

  pushToRegister = () => {
    this.props.history.push(ROUTES.SIGN_IN);
  };
  render() {
    console.log(this.props.history.push);

    return (
      <div className="tc">
        <img
          className="home-logo"
          src={require('../../assets/kidappi-logo.png')}
        />
        <div className="space-around register-signin">
          <button onClick={this.pushToSignIn} className="cta-button">
            <FormattedMessage id="general|button|signin" />
          </button>
          <button onClick={this.pushToRegister} className="cta-button">
            <FormattedMessage id="general|button|register" />
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
