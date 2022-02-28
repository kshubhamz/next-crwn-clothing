import { createSelector } from "reselect";

const selectCurrentUser = (state) => state.currentUser;

export const selectUser = createSelector(
  [selectCurrentUser],
  (currentuser) => currentuser.user
);

export const selectIsUserBeingFetched = createSelector(
  [selectCurrentUser],
  (currentuser) => currentuser.isFetching
);

export const selectUserFetchError = createSelector(
  [selectCurrentUser],
  (currentuser) => currentuser.error
);

export const selectAuthSusscessMessage = createSelector(
  [selectCurrentUser],
  (currentuser) => currentuser.authSuccessMessage
);
