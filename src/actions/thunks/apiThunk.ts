import { saveUserData, saveAvatar } from './../actionCreators/apiActions';
// import { httpActions, apiActions } from '..';
// import { REQUEST, ROUTES, ERROR_MESSAGES } from '../../consts';
// import config from '../../config';
// import { push } from 'connected-react-router';
// import { IAppState } from '../../types/state';
import Axios from 'axios';

export const postUserData = (query: any) => async (dispatch: any) => {
  //   const resourceName = REQUEST.GET_FRP_DATA;
  try {
    const response = await Axios.create({
      baseURL: 'https://kidappi-graphql.herokuapp.com/graphql',
      // baseURL: 'http://localhost:4000/graphql',
      headers: { 'Content-Type': 'application/graphql' },
    }).post('', query);
    if (response && response.status === 404) {
      throw new Error("couldn't save user");
    }
    const json = await response;
    dispatch(saveUserData(json.data.data.addUser));
  } catch (error) {
    throw new Error("couldn't save User");
  }
};

export const updateUser = (query: any) => async (dispatch: any) => {
  //   const resourceName = REQUEST.GET_FRP_DATA;
  try {
    const response = await Axios.create({
      baseURL: 'https://kidappi-graphql.herokuapp.com/graphql',
      // baseURL: 'http://localhost:4000/graphql',
      headers: { 'Content-Type': 'application/graphql' },
    }).post('', query);
    if (response && response.status === 404) {
      throw new Error("couldn't save user");
    }
    const json = await response;
    console.log('response', response);

    dispatch(saveUserData(json.data.data.updateUser));
  } catch (error) {
    console.log(error);

    throw new Error("couldn't save User");
  }
};
export const updateChild = (query: any) => async (dispatch: any) => {
  //   const resourceName = REQUEST.GET_FRP_DATA;
  try {
    const response = await Axios.create({
      baseURL: 'https://kidappi-graphql.herokuapp.com/graphql',
      // baseURL: 'http://localhost:4000/graphql',
      headers: { 'Content-Type': 'application/graphql' },
    }).post('', query);
    if (response && response.status === 404) {
      throw new Error("couldn't save user");
    }
    const json = await response;
    console.log('response', response);

    dispatch(saveUserData(json.data.data.updateChild));
  } catch (error) {
    console.log(error);

    throw new Error("couldn't save User");
  }
};

export const removeChild = (query: any) => async (dispatch: any) => {
  //   const resourceName = REQUEST.GET_FRP_DATA;
  try {
    const response = await Axios.create({
      baseURL: 'https://kidappi-graphql.herokuapp.com/graphql',
      // baseURL: 'http://localhost:4000/graphql',
      headers: { 'Content-Type': 'application/graphql' },
    }).post('', query);
    if (response && response.status === 404) {
      throw new Error("couldn't save user");
    }
    const json = await response;
    console.log('response', response);

    dispatch(saveUserData(json.data.data.removeChild));
  } catch (error) {
    console.log(error);

    throw new Error("couldn't save User");
  }
};
export const getUserData = (query: any) => async (dispatch: any) => {
  //   const resourceName = REQUEST.GET_FRP_DATA;
  try {
    const response = await Axios.create({
      baseURL: 'https://kidappi-graphql.herokuapp.com/graphql',
      // baseURL: 'http://localhost:4000/graphql',
      headers: { 'Content-Type': 'application/graphql' },
    }).post('', query);
    if (response && response.status === 404) {
      throw new Error("couldn't get user");
    }
    const json = await response;
    const data = json.data.data.getUser;
    await dispatch(saveUserData(data));
    console.log('data from getUserDataThunk:', data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("couldn't get User");
  }
};
export const getViewedUserData = (query: any) => async (dispatch: any) => {
  //   const resourceName = REQUEST.GET_FRP_DATA;
  try {
    const response = await Axios.create({
      baseURL: 'https://kidappi-graphql.herokuapp.com/graphql',
      // baseURL: 'http://localhost:4000/graphql',
      headers: { 'Content-Type': 'application/graphql' },
    }).post('', query);
    if (response && response.status === 404) {
      throw new Error("couldn't get user");
    }
    const json = await response;
    const data = json.data.data.getUserById;
    // await dispatch(saveUserData(data));
    console.log('data from getViewedUserDataThunk:', data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("couldn't get User");
  }
};

export const uploadFile = (id: any, file: any) => async (dispatch: any) => {
  const body = { id, file };
  try {
    const response = await Axios.create({
      baseURL: 'https://kidappi-graphql.herokuapp.com/upload',
      // baseURL: 'http://localhost:4000/upload',
    }).post('', body);
    if (response && response.status === 200) {
      await dispatch(saveAvatar(file));
    } else {
      throw new Error("couldn't upload file");
    }
  } catch (error) {
    console.log(error);
    throw new Error("couldn't upload file");
  }
};
