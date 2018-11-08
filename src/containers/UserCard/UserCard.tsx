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
// import MaMapWithMarker from '../../components/MapWithMarker/';

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
        <header className="flex w-100 bg-white fixed fw7">
          <p
            onClick={() =>
              this.props.history.push(
                sameUser ? ROUTES.DASHBOARD : ROUTES.SEARCH,
              )
            }
          >
            <Svg Icon={chevronLeftIcon} />
          </p>
          <p className="ml4">
            {user && user._id === (viewedUser && viewedUser._id) ? (
              <FormattedMessage id="content|appfooter|dashboard" />
            ) : (
              viewedUser && viewedUser.firstName
            )}
          </p>
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
          {/* <p>
            <FormattedMessage id="general|content|numberKids" />: 2
          </p> */}
          {/* TODO Change when api done for children */}
          {/* <p>{viewedUser && viewedUser.children}</p>
          <p>{viewedUser && viewedUser.children}</p> */}
          <p>
            <FormattedMessage id="general|content|location" />
          </p>
        </div>
        {/* MAPS WILL GO HERE
        <MaMapWithMarker
          // @ts-ignore
          address={
            viewedUser && `${viewedUser.postCode}, ${viewedUser.city}, UK`
          }
        /> */}
        <footer className="user-card-footer">
          <div className=" flex flex-column ml10">
            <span>Exchange</span>
            <span>Money</span>
          </div>
          <button className="mr2 bg-green white fw7 ph4 ttc di pv3 bn-ns">
            Contact
          </button>
        </footer>
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
