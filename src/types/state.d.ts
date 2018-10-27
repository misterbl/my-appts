export interface IAppState {
  api: {
    userData: { _id: string, firstName: string, avatar: string, lastName: string, address: string, postCode: string, city: string, photoURL: string; email: string, profileTitle: string, profileDescription: string, children: string, availabilities: string } | null;
  };
}
