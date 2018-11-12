import { IAppState } from '../types/state.d';

const generateAppState = (): IAppState => ({
  api: {
    userData: {
      _id: 'id',
      firstName: 'firstName',
      avatar: 'avatar',
      lastName: 'lastName',
      drivingLicense: false,
      nonSmoker: false,
      car: false,
      address: 'address',
      lat: 1234,
      lng: 123445,
      postCode: 'postCode',
      city: 'city',
      photoURL: 'photU`rl',
      email: 'email',
      profileTitle: 'profileTitle',
      profileDescription: 'profileDescription',
      children: [
        {
          id: 'childId',
          name: 'childName',
          dob: 122322,
          gender: 'boy',
          school: 'school',
          information: 'childInformation',
        },
      ],
      availability: undefined,
      unavailability: undefined,
    },
  },
});

export default generateAppState;
