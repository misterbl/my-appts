import { IAppState } from '../types/state.d';

const generateAppState = (): IAppState => ({
  api: {
    userData: { _id: "id", firstName: "firstName", avatar: "avatar", lastName: "lastName", address: "address", postCode: "postCode", city: "city", photoURL: "photU`rl"; email: "email", profileTitle: "profileTitle", profileDescription: "profileDescription", children: "children", availabilities: "availabilities" }
  },
});

export default generateAppState;
