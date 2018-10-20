import { saveBooks } from '../apiActions';
// import makeRequest from '@jg/http-client';
// import { httpActions, apiActions } from '..';
// import { REQUEST, ROUTES, ERROR_MESSAGES } from '../../consts';
// import config from '../../config';
// import { push } from 'connected-react-router';
// import { getCurrencyCode } from '../../selectors/apiSelectors';
// import { IAppState } from '../../types/state';
import Axios from 'axios';


export const postBooks = (query: any) => async (dispatch: any) => {
//   const resourceName = REQUEST.GET_FRP_DATA;
  try {
    const response = await Axios.create({
        baseURL: "http://localhost:4000/graphql",
        headers: { "Content-Type": "application/graphql" }
      }).post("", query);
      if (response && response.status === 404) {
        throw new Error("couldn't get books");
      }
      const json = await response;
      console.log(json)
      dispatch(saveBooks(json))
   
  } catch (error) {
    throw new Error("couldn't get books");
  }
};