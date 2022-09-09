import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import ProfileReducer from "./ProfileReducer";
import ProductReducer from "./ProductReducer";

const RootReducer = combineReducers({
  userAuth: AuthReducer,
  userDetails: ProfileReducer,
  products: ProductReducer,
});

export default RootReducer;
