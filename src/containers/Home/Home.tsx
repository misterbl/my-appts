import * as React from "react";
import { auth } from '../../firebase';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName: any, value: any) => () => ({
  [propertyName]: value,
});


export class Home extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event: any) => {
    const {
    // @ts-ignore
      email,
      // @ts-ignore
      passwordOne,
    } = this.state;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  
  render() {
    const {
      // @ts-ignore
      username,
      // @ts-ignore
      email,
      // @ts-ignore
      passwordOne,
      // @ts-ignore
      passwordTwo,
      // @ts-ignore
      error,
    } = this.state;
    return (
      <>
        <div>Home</div>
        <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
      </>
    );
  }
}

export default Home;
