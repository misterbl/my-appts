import * as React from "react";
import getUserData from "../../actions/thunks/getUserData";
import postUserData from "../../actions/thunks/postUserData";

export class UserCard extends React.Component {

  handleGet = () => {
    getUserData();
  };

  handlePost = () => {
    postUserData();
  };
  render() {
    return (
      <>
        <h1>User Card </h1>
        <h2>User's picture></h2>
        <h3>User's information</h3>
        <button onClick={this.handleGet}>Get Data</button>
        <button onClick={this.handlePost}>Post Me</button>
      </>
    );
  }
}

export default UserCard;
