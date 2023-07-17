import { combineReducers } from "redux";
import productReducer from "./products";
import categoryReducer from "./category";

const rootReducer = combineReducers({
  products: productReducer,
  category: categoryReducer,
});
export default rootReducer;
