import * as React from "react";
import {FormattedMessage} from 'react-intl';
// import getUserData from "../../actions/thunks/getUserData";
import postUserData from "../../actions/thunks/postUserData";
import Axios from "axios";

export class UserCard extends React.Component {
  handleGet = async () => {
    // getUserData();

    // const option = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/graphql" },
    //   body: query
    // };
    const query = `{
      books {
        title
      }
    }`;
    const res = await Axios.create({
      baseURL: "http://localhost:4000/graphql",
      headers: { "Content-Type": "application/graphql" }
    }).post("", query);
    const json = await res;
    console.log(json);
  };
  handlePost = () => {
    postUserData();
  };

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
        {/* <button onClick={this.handleGet}>Get Data</button>
        <button onClick={this.handleSubmit}>Post Me</button> */}
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

export default UserCard;
