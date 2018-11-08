const queries = (args: any) => ({
  ADD_USER: `mutation {
    addUser (email: "${args.email}", avatar:"${args.avatar}" ) {
      _id
      firstName
      lastName
      avatar
      email
      address
      profileTitle
      profileDescription
     
    }
  }`,
  GET_USER: `mutation {
    getUser (email: "${args.email}") {
      _id
      firstName
      lastName
      avatar
      email
      address
      drivingLicense
      nonSmoker
      car
      profileTitle
      profileDescription
      children{id, name, dob, information, school, gender}
      availabilities
    }
  }`,
  GET_USER_BY_ID: `mutation {
    getUserById (_id: "${args.id}") {
      _id
      firstName
      lastName
      avatar
      email
      address
      drivingLicense
      nonSmoker
      car
      profileTitle
      profileDescription
      children{id, name, dob, information, school, gender}
      availabilities
    }
  }`,
  GET_USER_INFO: `mutation {
    getUser (email: "${args.email}") {
      _id
      firstName
      lastName
      avatar
      email
      address
    }
  }`,
  GET_AD_INFO: `mutation {
    getUser (email: "${args.email}") {
      _id
      profileTitle
      profileDescription
    }
  }`,
  UPDATE_AD_INFO: `mutation {
    updateUser (_id:"${args._id}" profileTitle: "${
    args.profileTitle
  }", profileDescription: "${args.profileDescription}") {
      _id
      firstName
      lastName
      avatar
      address
      profileTitle
      profileDescription
      children{name, dob, information, school, gender}
      availabilities 
    }
  }`,
  UPDATE_PERSONAL_INFO: `mutation {
    updateUser (_id: "${args._id}", firstName: "${
    args.firstName
  }", lastName: "${args.lastName}", avatar:"${args.avatar}", address: "${
    args.address
  }") {
      _id
      firstName
      lastName
      avatar
      address
      drivingLicense
      nonSmoker
      car
      profileTitle
      profileDescription
      children{name, dob, information, school, gender}
      availabilities
    }
  }`,
  UPDATE_ABOUT_YOU: `mutation {
    updateUser (_id: "${args._id}", drivingLicense: ${
    args.drivingLicense
  }, nonSmoker: ${args.nonSmoker}, car:${args.car}) {
      _id
      firstName
      lastName
      avatar
      address
      drivingLicense
      nonSmoker
      car
      profileTitle
      profileDescription
      children{name, dob, information, school, gender}
      availabilities
    }
  }`,
  ADD_CHILD: `mutation {
    updateUser (_id: "${args._id}", child: ${JSON.stringify(
    JSON.stringify(args.child),
  )}
) {
      _id
      firstName
      lastName
      avatar
      address
      profileTitle
      profileDescription
      children{id, name, dob, information, school, gender}
      availabilities
    }
  }`,
  UPDATE_CHILD: `mutation {
    updateChild (_id: "${args._id}", child: ${JSON.stringify(
    JSON.stringify(args.child),
  )}
) {
      _id
      firstName
      lastName
      avatar
      address
      profileTitle
      profileDescription
      children{id, name, dob, information, school, gender}
      availabilities
    }
  }`,
  REMOVE_CHILD: `mutation {
    removeChild (_id: "${args._id}", child: ${JSON.stringify(
    JSON.stringify(args.child),
  )}
) {
      _id
      firstName
      lastName
      avatar
      address
      profileTitle
      profileDescription
      children{id, name, dob, information, school, gender}
      availabilities
    }
  }`,
});

export default queries;
