import { createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { routerMiddleware, connectRouter } from "connected-react-router";
import baseReducer from "./reducers/baseReducer";

// const configureStore = ({ initialState = {} }) => {
//   // const router = routerMiddleware(history);
//   // const middleware = [router];

//   // const reducer = combineReducers({
//   //   ...reducers
//   // });
//   const store = createStore(
//     // connectRouter(history)(reducer),
//     initialState
//     // composeWithDevTools(applyMiddleware(...middleware))
//   );

//   return store;
// };

// export default configureStore;

const store = createStore(baseReducer);

export default store;
