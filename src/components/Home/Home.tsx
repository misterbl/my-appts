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
      <div className="tc">
        <img
          className="mt6 w-30"
          src={require('../../styles/assets/kidappi-logo.png')}
        />
        <div className="flex justify-around absolute w-100 bottom-2 mb4 ">
          <button
            onClick={this.pushToSignIn}
            className="bg-green white fw7 ph3 ttc di pv3 bn-ns"
          >
            <FormattedMessage id="general|button|signin" />
          </button>
          <button
            onClick={this.pushToRegister}
            className="bg-green white fw7 ph3 ttc di pv3 bn-ns"
          >
            <FormattedMessage id="general|button|register" />
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
