import { createSelector } from "reselect";

const selectOrder = (state) => state.order;

export const selectLastPlacedOrder = createSelector(
  [selectOrder],
  (order) => order.lastOrderPlaced
);

export const selectIsOrderBeingPlaced = createSelector(
  [selectOrder],
  (order) => order.isOrderBeingPlaced
);

export const selectOrderPlaceError = createSelector(
  [selectOrder],
  (order) => order.orderPlaceError
);
