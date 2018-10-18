import * as React from "react";
import getUserData from "../../actions/thunks/getUserData";
export class UserCard extends React.Component {
  handleClick = () => {
    getUserData();
  };
  render() {
    return (
      <>
        <h1>User Card </h1>
        <h2>User's picture></h2>
        <h3>User's information</h3>
        <button onClick={this.handleClick}>Click Me</button>
      </>
    );
  }
}

export default UserCard;
