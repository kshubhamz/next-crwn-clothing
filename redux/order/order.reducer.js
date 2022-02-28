import { OrderAction } from "./order.types";

const INITIAL_STATE = {
  lastOrderPlaced: null,
  isOrderBeingPlaced: false,
  orderPlaceError: undefined,
};

export const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OrderAction.PLACE_ORDER_START:
      return { ...state, isOrderBeingPlaced: true, orderPlaceError: undefined };
    case OrderAction.PLACE_ORDER_SUCCESS:
      return {
        ...state,
        isOrderBeingPlaced: false,
        lastOrderPlaced: action.payload,
      };
    case OrderAction.PLACE_ORDER_FAILURE:
      return {
        ...state,
        isOrderBeingPlaced: false,
        orderPlaceError: action.payload,
      };
    default:
      return { ...state };
  }
};
