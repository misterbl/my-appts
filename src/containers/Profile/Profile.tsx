import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { IAccountComponent, IAccountMapStateToProps } from './Profile.d';
import { getUserData } from '../../selectors/apiSelectors';
import { IAppState } from 'src/types/state';
import ROUTES from '../../consts/routes';
import Svg from '../../components/Svg';
import { AccountIcon } from '../../styles/assets';
import { UploadScreen } from 'src/components/UploadScreen/UploadScreen';

export class Profile extends React.Component<IAccountComponent> {
  render() {
    // const { formatMessage } = this.props.intl;

    const { user } = this.props;
    return (
      <>
        <UploadScreen />
        <div className="flex pt4 ml4">
          {user && user.avatar ? (
            <img
              className="br-100 h3 w3"
              src={user.avatar || ''}
              alt="user's profile"
            />
          ) : (
            <Svg Icon={AccountIcon} width="4rem" height="4rem" />
          )}
          <strong className="self-center ml3">Profile</strong>
        </div>
        <div className="flex flex-column">
          <button
            className="tl mt4"
            onClick={() => {
              this.props.history.push(ROUTES.USER_DETAILS);
            }}
          >
            Edit profile
          </button>
          <button className="tl mt4">Other stuff</button>
          <button className="tl mt4">Other stuff</button>
        </div>
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
