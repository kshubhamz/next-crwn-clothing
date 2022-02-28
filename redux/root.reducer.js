import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart.reducer";
import { collectionReducer } from "./collections/collections.reducer";
import { currentUserReducer } from "./current-user/current-user.reducer";
import { orderReducer } from "./order/order.reducer";
import { profileReducer } from "./profile/profile.reducer";
import { sectionReducer } from "./section/section.reducer";

export const RootReducer = combineReducers({
  sections: sectionReducer,
  currentUser: currentUserReducer,
  cart: cartReducer,
  collections: collectionReducer,
  profile: profileReducer,
  order: orderReducer,
});
