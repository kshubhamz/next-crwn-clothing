import { ProfileAction } from "./profile.types";

const INITIAL_STATE = {
  profileDropdownHidden: true,
  registerModalHidden: true,
  loginModalHidden: true,
};

export const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProfileAction.TOGGLE_PROFILE_DROPDOWN:
      return { ...state, profileDropdownHidden: !state.profileDropdownHidden };
    case ProfileAction.TOGGLE_LOGIN_MODAL:
      return { ...state, loginModalHidden: !state.loginModalHidden };
    case ProfileAction.TOGGLE_REGISTER_MODAL:
      return { ...state, registerModalHidden: !state.registerModalHidden };
    default:
      return { ...state };
  }
};
