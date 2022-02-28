import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
);

export const selectShouldCartDisplay = createSelector(
  [selectCart],
  (cart) => cart.isCartDisplayed
);

export const selectNoOfItemsInCart = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectCartOpsError = createSelector(
  [selectCart],
  (cart) => cart.cartOpsError
);
