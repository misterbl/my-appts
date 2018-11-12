export interface Child {
  id: string;
  name: string;
  dob: number;
  gender: string;
  school: string;
  information: string;
}

export interface Slot {
  beforeSchool: [string];
  morning: [string];
  noon: [string];
  afternoon: [string];
  afterSchool: [string];
  evening: [string];
  night: [string];
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
      lat: number;
      lng: number;
      postCode: string;
      city: string;
      photoURL: string;
      email: string;
      profileTitle: string;
      profileDescription: string;
      children: [Child];
      availability?: Slot;
      unavailability?: [String];
    } | null;
  };
}
