const queries = (args: any) => ({
  ADD_USER: `mutation {
    addUser (email: "${args.email}", avatar:"${args.avatar}" ) {
      _id
      firstName
      lastName
      avatar
      email
      address
      postCode
      city
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
      postCode
      city
      profileTitle
      profileDescription
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
      postCode
      city
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
      postCode
      city
      profileTitle
      profileDescription
     
    }
  }`,
  UPDATE_PERSONAL_INFO: `mutation {
    updateUser (_id: "${args._id}", firstName: "${
    args.firstName
  }", lastName: "${args.lastName}", address: "${args.address}", postCode: "${
    args.postCode
  }", city: "${args.city}") {
      _id
      firstName
      lastName
      avatar
      address
      postCode
      city
      profileTitle
      profileDescription
    }
  }`,
});

export default queries;
