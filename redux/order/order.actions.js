import { environment } from "../../environment";
import { useRequest } from "../../hooks/use-request";
import { OrderAction } from "./order.types";

const placeOrderStart = () => ({ type: OrderAction.PLACE_ORDER_START });

const placeOrderSuccess = (data) => ({
  type: OrderAction.PLACE_ORDER_SUCCESS,
  payload: data,
});

const placeOrderFailure = (err) => ({
  type: OrderAction.PLACE_ORDER_FAILURE,
  payload: err,
});

export const placeOrderAsync = (token, cart) => (dispatch) => {
  const performRequest = useRequest(`${environment.NEXT_PUBLIC_API}/orders`);
  dispatch(placeOrderStart());

  return new Promise((resolve, reject) => {
    performRequest("post", { token, cart })
      .then((data) => {
        dispatch(placeOrderSuccess(data));
        resolve();
      })
      .catch((err) => {
        dispatch(placeOrderFailure(err));
        reject();
      });
  });
};
