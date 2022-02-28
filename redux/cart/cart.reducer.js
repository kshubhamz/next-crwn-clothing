import { CartActions } from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
  isCartDisplayed: false,
  cartItems: [],
  cartOpsError: undefined,
};

// cartItem : {product: Product, quantity: number}
// action: {type: CartActions, payload: {data: Product, error: ServerError}}
export const cartReducer = (state = INITIAL_STATE, action) => {
  const product = action.payload?.data;
  const error = action.payload?.error;
  switch (action.type) {
    case CartActions.ADD_TO_CART:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, product),
        cartOpsError: error,
      };
    case CartActions.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, product),
        cartOpsError: error,
      };
    case CartActions.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        isCartDisplayed: !state.isCartDisplayed,
        cartOpsError: error,
      };
    case CartActions.ASSIGN_TO_CART:
      return { ...state, cartItems: action.payload, cartOpsError: error };
    case CartActions.DELETE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product.id !== product.id
        ),
        cartOpsError: error,
      };
    case CartActions.CART_OPS_ERROR:
      return { ...state, cartOpsError: error };
    default:
      return { ...state };
  }
};
