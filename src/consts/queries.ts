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
      lat
      lng
      drivingLicense
      nonSmoker
      car
      profileTitle
      profileDescription
      children{id, name, dob, information, school, gender}
      availability{beforeSchool, morning, noon, afternoon, afterSchool, evening, night}
      unavailability
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
      lat
      lng
      drivingLicense
      nonSmoker
      car
      profileTitle
      profileDescription
      children{id, name, dob, information, school, gender}
      availability{beforeSchool, morning, noon, afternoon, afterSchool, evening, night}
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
      unavailability
      availability{beforeSchool, morning, noon, afternoon, afterSchool, evening, night}
    }
  }`,
  UPDATE_PERSONAL_INFO: `mutation {
    updateUser (_id: "${args._id}", firstName: "${
    args.firstName
  }", lastName: "${args.lastName}", address: "${args.address}" ) {
      _id
      firstName
      lastName
      avatar
      address
      lat
      lng
      drivingLicense
      nonSmoker
      car
      profileTitle
      profileDescription
      children{name, dob, information, school, gender}
      unavailability
      availability{beforeSchool, morning, noon, afternoon, afterSchool, evening, night}

    }
  }`,
  UPDATE_AVATAR: `mutation {
    updateUser (_id: "${args._id}", avatar:"${args.avatar}" ) {
      _id
      firstName
      lastName
      avatar
      address
      lat
      lng
      drivingLicense
      nonSmoker
      car
      profileTitle
      profileDescription
      children{name, dob, information, school, gender}
      availability{beforeSchool, morning, noon, afternoon, afterSchool, evening, night}

    }
  }`,
  UPDATE_LOCATION: `mutation {
    updateUser (_id: "${args._id}", address: "${args.address}", lat: "${
    args.lat
  }", lng: "${args.lng}" ) {
      _id
      firstName
      lastName
      avatar
      address
      lat
      lng
      drivingLicense
      nonSmoker
      car
      profileTitle
      profileDescription
      children{name, dob, information, school, gender}
      unavailability
      availability{beforeSchool, morning, noon, afternoon, afterSchool, evening, night}

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
      availability{beforeSchool, morning, noon, afternoon, afterSchool, evening, night}
      unavailability

    }
  }`,
  UPDATE_AVAILABILITY: `mutation {
    updateUser (_id: "${args._id}", availability: ${JSON.stringify(
    JSON.stringify(args.availability),
  )}) {
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
      unavailability
      availability{beforeSchool, morning, noon, afternoon, afterSchool, evening, night}
    }
  }`,
  UPDATE_UNAVAILABILITY: `mutation {
    updateUser (_id: "${args._id}", unavailability: ${JSON.stringify(
    args.unavailability,
  )}) {
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
      availability{beforeSchool, morning, noon, afternoon, afterSchool, evening, night}
      unavailability
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
      availability{beforeSchool, morning, noon, afternoon, afterSchool, evening, night}
      unavailability
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
    }
  }`,
});

export default queries;
