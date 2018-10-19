import * as React from "react";
import getUserData from "../../actions/thunks/getUserData";
import postUserData from "../../actions/thunks/postUserData";
import Axios from "axios";

export class UserCard extends React.Component {
  handleGet = () => {
    getUserData();
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
        <h1>User Card </h1>
        <h2>User's picture></h2>
        <h3>User's information</h3>
        <button onClick={this.handleGet}>Get Data</button>
        <button onClick={this.handleSubmit}>Post Me</button>
      </>
    );
  }
}

export default UserCard;
