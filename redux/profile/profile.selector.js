import { createSelector } from "reselect";

const selectProfile = (state) => state.profile;

export const selectProfileDropdownHidden = createSelector(
  [selectProfile],
  (profile) => profile.profileDropdownHidden
);

export const selectRegisterModalHidden = createSelector(
  [selectProfile],
  (profile) => profile.registerModalHidden
);

export const selectLoginModalHidden = createSelector(
  [selectProfile],
  (profile) => profile.loginModalHidden
);
