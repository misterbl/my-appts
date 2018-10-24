import { combineReducers } from 'redux';
// import * as appReducers from './appReducers';
import * as apiReducers from './apiReducers';
// import http from './httpReducers';

const reducers = {
  //   app: combineReducers(appReducers),
  api: combineReducers(apiReducers),
  //   http,
};

export default reducers;
