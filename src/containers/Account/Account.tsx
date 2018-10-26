import * as React from 'react';
import { connect } from 'react-redux';
// import { Formik, Form } from 'formik';
// import { auth } from '../../firebase';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { IAccountComponent, IAccountMapStateToProps } from './Account.d';
import { getUserData } from '../../selectors/apiSelectors';
import { IAppState } from 'src/types/state';
import ROUTES from '../../consts/routes';

export class Account extends React.Component<IAccountComponent> {
  render() {
    // const { formatMessage } = this.props.intl;

    const { user } = this.props;
    return (
      <>
        <div className="flex pt4 ml4">
          <img
            className="br-100 h3 w3"
            src={user ? user.avatar : ''}
            alt="user's profile"
          />
          <strong className="self-center ml3">Name</strong>
        </div>

        <div>Account</div>
        <button onClick={() => { this.props.history.push(ROUTES.USER_DETAILS) }} >
          Edit Account
        </button>

      </>
    );
  }
}

export const mapStateToProps = (state: IAppState): IAccountMapStateToProps => ({
  user: getUserData(state),
});

const injectIntlAccount = injectIntl(Account);

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(injectIntlAccount),
);
