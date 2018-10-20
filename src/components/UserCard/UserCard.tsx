import * as React from "react";
import {FormattedMessage} from 'react-intl';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';
import {connect} from 'react-redux';
import {IState} from '../../reducers/apiReducers';
import * as apiActions from '../../actions/apiActions';
import * as apiThunk from '../../actions/thunks/apiThunk';


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
  }

  render() {    
    return (
      <>
      <header className="user-card-header"><span>Matilde</span></header>
      <div className="user-card-details">
        <div className="user-avatar"/>
        <div className="flex-column">
        <strong className="font-green">Matilde</strong>
        <div className="font-green">Cannes</div>
        <div className="font-green">2 enfants</div>
        </div>
        <button onClick={this.handleGet}>Get Data</button>
        <button onClick={this.handleSubmit}>Post Me</button>
        </div>
        <FormattedMessage id="app.title"
                          defaultMessage="Welcome to {what}"
                          description="Welcome header on app main page"
                          values={{ what: 'react-intl' }}/>
        <footer className="user-card-footer">Footer</footer>
      </>
    );
  }
}

// const mapStateToProps = (state: any) => {
//   console.log(state); // state
// }

// function mapDispatchToProps(dispatch: any) {
//   return { actions: bindActionCreators(actionCreators, dispatch) }
// }

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
) => ({
  apiActions: bindActionCreators(apiActions, dispatch),
  apiThunk: bindActionCreators(apiThunk, dispatch),
});
export const mapStateToProps = (
  state: IState,
) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
