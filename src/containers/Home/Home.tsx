import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps, StaticContext } from 'react-router';
import ROUTES from '../../consts/routes';

export class Home extends React.Component<
  RouteComponentProps<any, StaticContext>
> {
  pushToSignIn = () => {
    this.props.history.push(ROUTES.SIGN_IN);
  };

  pushToRegister = () => {
    this.props.history.push(ROUTES.REGISTER);
  };
  render() {
    return (
      <div className="flex flex-column vh-100 green-bg ph4 ph7-l ph6-m">
        {/* <img
          className="mt6 w-30"
          src={require('../../styles/assets/kidappi-logo.png')}
        /> */}
        <a className="kidappi white mt5 tc w-100">Kidappi</a>
        <button
          onClick={this.pushToSignIn}
          className="loginNext fw7 mt5 ttu di pv3 bn shadow-5 mh6-l mb4-l"
        >
          <FormattedMessage id="general|button|signin" />
        </button>
        <div className="text--line-through">
          <span className="spant3 ma0 tc white text--line-through--text">
            <FormattedMessage id="general|or" />
          </span>
        </div>
        <button
          onClick={this.pushToRegister}
          className="loginNext fw7 mt4 mt5-l ttu di pv3 bn shadow-5 mh6-l"
        >
          <FormattedMessage id="general|button|register" />
        </button>
      </div>
    );
  }
}

export default withRouter(Home);
