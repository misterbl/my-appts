import * as React from "react";
import getUserData from "../../actions/thunks/getUserData";
export class UserCard extends React.Component {
  handleClick = () => {
    getUserData();
  };
  render() {
    return (
      <>
        <div>Home</div>
      </>
    );
  }
}

export default UserCard;
