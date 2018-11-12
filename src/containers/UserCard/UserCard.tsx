import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as apiActions from '../../actions/actionCreators/apiActions';
import * as apiThunk from '../../actions/thunks/apiThunk';
import {
  TUserCard,
  UserCardDispatchToProps,
  IUserCardState,
  IUserCardMapStateToProps,
} from './UserCard.d';
import { QUERIES, ROUTES } from 'src/consts';
import { AccountIcon, chevronLeftIcon } from 'src/styles/assets';
import Svg from 'src/components/Svg';
import getMatchedRouteParams from 'src/utils/getMatchedRouteParams';
import { IAppState } from 'src/types/state';
import { getUserData } from 'src/selectors/apiSelectors';
import MapComponent from 'src/components/MapComponent';

export class UserCard extends React.Component<TUserCard, IUserCardState> {
  constructor(props: TUserCard) {
    super(props);
    this.getUser();
    this.state = {
      viewedUser: null,
    };
  }
  async getUser() {
    const {
      history: {
        location: { pathname },
      },
    } = this.props;
    const { userId } = await getMatchedRouteParams(pathname);
    const response = this.props.apiThunk.getViewedUserData(
      QUERIES({ id: userId }).GET_USER_BY_ID,
    );
    const viewedUser = await response;
    this.setState({ viewedUser });
  }

  render() {
    let sameUser: boolean;
    const { viewedUser } = this.state;
    const { user } = this.props;
    if (user && viewedUser) {
      sameUser = user._id === viewedUser._id;
    }
    console.log(this);

    return (
      <>
        <header className="flex w-100 pt2 bg-white fixed fw7 pt3-ns">
          <div
            onClick={() =>
              this.props.history.push(
                sameUser ? ROUTES.DASHBOARD : ROUTES.SEARCH,
              )
            }
          >
            <Svg Icon={chevronLeftIcon} />
          </div>
          <span className="ml4">
            {user && user._id === (viewedUser && viewedUser._id) ? (
              <FormattedMessage id="content|appfooter|dashboard" />
            ) : (
              viewedUser && viewedUser.firstName
            )}
          </span>
        </header>
        <div className="flex pt5">
          {viewedUser && viewedUser.avatar ? (
            <img
              className="br-100 h3 w3"
              src={viewedUser.avatar || ''}
              alt="user's profile"
            />
          ) : (
            <Svg Icon={AccountIcon} width="4rem" height="4rem" />
          )}
          <div className="flex flex-column ml3">
            <strong className="pb2">
              {viewedUser && viewedUser.firstName}
            </strong>
          </div>
        </div>
        <div className="m10 mt30 pb60">
          <h3>{viewedUser && viewedUser.profileTitle}</h3>
          <p>{viewedUser && viewedUser.profileDescription}</p>
          <p className="flex flex justify-between mt4">
            <span className="lh-2">
              <FormattedMessage id="content|userCard|hasACar" />
            </span>
            {viewedUser && viewedUser.car ? (
              <span className="elliptical green-bg">Yes</span>
            ) : (
              <span className="elliptical bg-light-green">No</span>
            )}
          </p>
          <p className="flex flex justify-between">
            <span className="lh-2">
              <FormattedMessage id="content|userCard|hasDrivingLicence" />
            </span>
            {viewedUser && viewedUser.drivingLicense ? (
              <span className="elliptical green-bg">Yes</span>
            ) : (
              <span className="elliptical bg-light-green">No</span>
            )}
          </p>
          <p className="flex flex justify-between">
            <span className="lh-2">
              <FormattedMessage id="content|userCard|nonSmoker" />
            </span>
            {viewedUser && viewedUser.nonSmoker ? (
              <span className="elliptical green-bg">Yes</span>
            ) : (
              <span className="elliptical bg-light-green">No</span>
            )}
          </p>
          <p className="flex flex justify-between">
            <span className="lh-2">
              <FormattedMessage id="general|content|numberKids" />
            </span>
            {viewedUser &&
              viewedUser.children && (
                <span className="elliptical green-bg">
                  {viewedUser.children.length}
                </span>
              )}
          </p>
          <p>
            <FormattedMessage id="general|content|location" />
          </p>
        </div>

        <MapComponent
          lat={viewedUser && viewedUser.lat}
          lng={viewedUser && viewedUser.lng}
        />
        {user && user._id === (viewedUser && viewedUser._id) ? (
          <button
            className="w-100 bn fixed left-0 bottom-0 green-bg pv3 white"
            onClick={() => this.props.history.push(ROUTES.EDIT_PROFILE)}
          >
            <FormattedMessage id="content|profile|editProfile" />
          </button>
        ) : (
          <button
            className="w-100 bn fixed left-0 bottom-0 green-bg pv3 white"
            onClick={() => this.props.history.push(ROUTES.INBOX)}
          >
            <FormattedMessage
              id="content|userCard|contact"
              values={{
                userFirstName: (
                  <strong>{viewedUser && viewedUser.firstName}</strong>
                ),
              }}
            />
          </button>
        )}
      </>
    );
  }
}

export const mapStateToProps = (
  state: IAppState,
): IUserCardMapStateToProps => ({
  user: getUserData(state),
});

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): UserCardDispatchToProps => ({
  apiActions: bindActionCreators(apiActions, dispatch),
  apiThunk: bindActionCreators(apiThunk, dispatch),
});
// export const mapStateToProps = (state: IAppState): UserCardMapStateToProps => ({});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserCard),
);
