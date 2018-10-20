import * as React from "react";
import {FormattedMessage} from 'react-intl';
import { bindActionCreators, AnyAction, Dispatch } from 'redux';

import {connect} from 'react-redux';
import {IState} from '../../reducers/apiReducers';
import * as apiActions from '../../actions/apiActions';
// import getUserData from "../../actions/thunks/getUserData";
// import postUserData from "../../actions/thunks/postUserData";
import * as apiThunk from '../../actions/thunks/apiThunk';
import Axios from "axios";


export class UserCard extends React.Component {
  handleGet = () => {
    
    // getUserData();

    // const option = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/graphql" },
    //   body: query
    // };
 // @ts-ignore
    const query = `{
      books {
        title
      }
    }`;
    // @ts-ignore
   this.props.apiThunk.postBooks(query);
  };
  // handlePost = () => {
  //   postUserData();
  // };

  async handleSubmit() {
    const query = `mutation {
      addBook (title: "new title", author: "new author") {
        _id
        title
        author
      }
    }`;

    // const option = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/graphql" },
    //   body: query
    // };

    const res = await Axios.create({
      baseURL: "http://localhost:4000/graphql",
      headers: { "Content-Type": "application/graphql" }
    }).post("", query);
    const json = await res;
    console.log(json);

    // const newBook = json.data.addBook;
    // const books = this.state.books;
    // const newBooks = books.concat(newBook);

    // this.setState({ books: newBooks });
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
