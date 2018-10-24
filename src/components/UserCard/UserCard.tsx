import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '../../types/state';
import * as apiActions from '../../actions/actionCreators/apiActions';
import * as apiThunk from '../../actions/thunks/apiThunk';
const lipsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export class UserCard extends React.Component {
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
    return (
      <>
        <header className="user-card-header">
          <p className="mt12">Matilde</p>
        </header>
        <div className="user-card-details">
          <div className="user-avatar" />
          <div className=" flex flex-column">
            <strong className="font-green">Matilde</strong>
            <div className="font-green">Cannes</div>
            <div className="font-green">2 enfants</div>
          </div>
        </div>
        <div className="m10 mt30 pb60">
          <h3>Looking for occasional care</h3>
          <p>All about me. {lipsum}</p>
          {/* <button onClick={this.handleGet}>Get Data</button>
        <button onClick={this.handleSubmit}>Post Me</button> */}
          <p>
            <FormattedMessage
              id="general|content|numberKids"
              // defaultMessage="Welcome to {what}"
              // description="Welcome header on app main page"
              // values={{ what: 'react-intl' }}
            />
            : 2
          </p>

          <p>Emile, 4 ans. Ecole Victor Hugo, Cannes</p>
          <p>Aurelie, 11 ans. College Pompidou, Cannes</p>
          <p>
            <FormattedMessage id="general|content|location" />
          </p>
        </div>
        <footer className="user-card-footer">
          <div className=" flex flex-column ml10">
            <span>Exchange</span>
            <span>Money</span>
          </div>
          <button className="mr2 bg-green white fw7 ph3 ttc di pv3 bn-ns">
            Contact
          </button>
        </footer>
      </>
    );
  }
}

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  apiActions: bindActionCreators(apiActions, dispatch),
  apiThunk: bindActionCreators(apiThunk, dispatch),
});
export const mapStateToProps = (state: IAppState) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserCard);
