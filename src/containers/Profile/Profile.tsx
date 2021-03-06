import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { IAccountComponent, IAccountMapStateToProps } from './Profile.d';
import { getUserData } from '../../selectors/apiSelectors';
import { IAppState } from '../../types/state';
import ROUTES from '../../consts/routes';
import Svg from '../../components/Svg';
import { AccountIcon, EditIcon } from '../../styles/assets';

export class Profile extends React.Component<IAccountComponent> {
  render() {
    // const { formatMessage } = this.props.intl;

    const { user } = this.props;
    return (
      <>
        <div className="flex justify-between pt4">
          <div className="flex">
            {user && user.avatar ? (
              <img
                className="br-100 h3 w3"
                src={user.avatar || ''}
                alt="user's profile"
              />
            ) : (
              <Svg Icon={AccountIcon} width="4rem" height="4rem" />
            )}
            <strong className="self-center ml3">
              {user && user.firstName}
            </strong>
          </div>
          <Svg Icon={EditIcon} className="mr3" />
        </div>
        <p>{user && user.profileTitle}</p>
        <p>{user && user.profileDescription}</p>
        <button
          className="tl mt4"
          onClick={() => {
            this.props.history.push(ROUTES.EDIT_PROFILE);
          }}
        >
          <FormattedMessage id="content|profile|editProfile" />
        </button>
      </>
    );
  }
}

export const mapStateToProps = (state: IAppState): IAccountMapStateToProps => ({
  user: getUserData(state),
});

const injectIntlAccount = injectIntl(Profile);

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(injectIntlAccount),
);
