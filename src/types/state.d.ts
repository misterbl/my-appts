export interface Child {
  id: string;
  name: string;
  dob: number;
  gender: string;
  school: string;
  information: string;
}
export interface IAppState {
  api: {
    userData: {
      _id: string;
      firstName: string;
      avatar: string;
      lastName: string;
      drivingLicense: boolean;
      nonSmoker: boolean;
      car: boolean;
      address: string;
      postCode: string;
      city: string;
      photoURL: string;
      email: string;
      profileTitle: string;
      profileDescription: string;
      children: [Child];
      availabilities: string;
    } | null;
  };
}
