export interface IAppState {
  api: {
    userData: { _id: string, firstName: string, lastName: string, address: string, photoURL: string; email: string, profileTitle: string, profileDescription: string, children: string, availabilities: string } | null;
  };
}
