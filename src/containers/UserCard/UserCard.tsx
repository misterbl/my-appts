import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '../../types/state';
import * as apiActions from '../../actions/actionCreators/apiActions';
import * as apiThunk from '../../actions/thunks/apiThunk';
import { TUserCard, UserCardDispatchToProps } from './UserCard.d'
import { QUERIES, ROUTES } from 'src/consts';
import { AccountIcon, chevronLeftIcon } from 'src/styles/assets';
import Svg from 'src/components/Svg';
import { withRouter } from 'react-router';

export class UserCard extends React.Component<TUserCard> {
  viewedUser: IAppState['api']['userData'];
  async componentDidMount() {
    const email = "misterbl@hotmail.com"
    this.viewedUser = await this.props.apiThunk.getUserData(QUERIES({ email }).GET_USER)
  }

  handleGet = () => {
    // @ts-ignore
    const query = `{
      books {
        title
      }
    }`;
    // @ts-ignore
    this.props.apiThunk.postBooks(query);
  };

  handleSubmit = () => {
    const query = `mutation {
      addBook (title: "new title", author: "new author") {
        _id
        title
        author
      }
    }`;
    // @ts-ignore
    this.props.apiThunk.postBooks(query);
  };

  render() {
    const { viewedUser } = this;
    console.log(viewedUser);

    return (
      <>
        <header className="flex w-100 bg-white fixed fw7">
          <p onClick={() => this.props.history.push(ROUTES.SEARCH)}><Svg
            Icon={chevronLeftIcon}
          /></p>
          <p className="ml4">{viewedUser && viewedUser.firstName}</p>
        </header>
        <div className="flex pt5">
          {viewedUser && viewedUser.avatar ?
            <img
              className="br-100 h3 w3"
              src={viewedUser.avatar || ''}
              alt="user's profile"
            /> :
            <Svg
              Icon={AccountIcon}
              width="4rem"
              height="4rem"
            />}
          <div className="flex flex-column ml3">
            <strong className="pb2">{viewedUser && viewedUser.firstName}</strong>
            {/* TODO change api to have several fields for address and pass the city here */}
            <p className="ma0">{viewedUser && viewedUser.address}</p>
          </div>
        </div>
        <div className="m10 mt30 pb60">
          <h3>{viewedUser && viewedUser.profileTitle}</h3>
          <p>{viewedUser && viewedUser.profileDescription}</p>
          <p>
            <FormattedMessage id="general|content|numberKids" />
            : 2
          </p>
          {/* TODO Change when api done for children */}
          <p>{viewedUser && viewedUser.children}</p>
          <p>{viewedUser && viewedUser.children}</p>
          <p>
            <FormattedMessage id="general|content|location" />
          </p>
        </div>
        <div> location with map</div>
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

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): UserCardDispatchToProps => ({
  apiActions: bindActionCreators(apiActions, dispatch),
  apiThunk: bindActionCreators(apiThunk, dispatch),
});
// export const mapStateToProps = (state: IAppState): UserCardMapStateToProps => ({});
export default withRouter(connect(
  null,
  mapDispatchToProps,
)(UserCard));
