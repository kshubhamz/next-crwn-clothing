import { environment } from "../../environment";
import { useRequest } from "../../hooks/use-request";
import { CartActions } from "./cart.types";

const BASE_URL = `${environment.NEXT_PUBLIC_API}/users`;

const _toggleCartHidden = () => ({
  type: CartActions.TOGGLE_CART_HIDDEN,
  payload: {},
});

const addToCart = (product, err) => ({
  type: CartActions.ADD_TO_CART,
  payload: { data: product, error: err },
});

const removeFromCart = (product, err) => ({
  type: CartActions.REMOVE_FROM_CART,
  payload: { data: product, error: err },
});

const deleteFromCart = (product, err) => ({
  type: CartActions.DELETE_FROM_CART,
  payload: { data: product, error: err },
});

const _assignToCart = (data) => ({
  type: CartActions.ASSIGN_TO_CART,
  payload: data,
});

export const assignToCart = (cart) => (dispatch) => {
  dispatch(_assignToCart(cart));
};

export const toggleCartHidden = () => (dispatch) => {
  dispatch(_toggleCartHidden());
};

export const addToCartAsync = (user, item) => (dispatch) => {
  const url = `${BASE_URL}/${user?.id}?update=update_cart`;
  const performRequest = useRequest(url);

  dispatch(addToCart(item));
  if (user)
    performRequest("patch", { product: item, operation: "add" }).catch((err) =>
      dispatch(removeFromCart(item, err))
    );
};

export const removeFromCartAsync = (user, item) => (dispatch) => {
  const url = `${BASE_URL}/${user?.id}?update=update_cart`;
  const performRequest = useRequest(url);

  dispatch(removeFromCart(item));
  if (user)
    performRequest("patch", { product: item, operation: "remove" }).catch(
      (err) => dispatch(addToCart(item, err))
    );
};

export const deleteFromCartAsync = (user, item) => (dispatch) => {
  const url = `${BASE_URL}/${user?.id}?update=update_cart`;
  const performRequest = useRequest(url);

  dispatch(deleteFromCart(item));
  if (user)
    performRequest("patch", { product: item, operation: "delete" }).catch(
      (err) => dispatch(addToCart(item, err))
    );
};
