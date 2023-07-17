import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";

// function logger(store) {
//   return function firstInner(next) {
//     return function secondInner(action) {
//       console.log("dispatching", action);
//       let result = next(action);
//       console.log("next state", store.getState());
//       return result;
//     };
//   };
// }

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
