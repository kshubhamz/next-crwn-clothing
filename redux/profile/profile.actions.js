import { ProfileAction } from "./profile.types";

const _toggleProfileDropdown = () => ({
  type: ProfileAction.TOGGLE_PROFILE_DROPDOWN,
});

const _toggleRegisterModal = () => ({
  type: ProfileAction.TOGGLE_REGISTER_MODAL,
});

const _toggleLoginModal = () => ({
  type: ProfileAction.TOGGLE_LOGIN_MODAL,
});

export const toggleProfileDropdown = () => (dispatch) => {
  dispatch(_toggleProfileDropdown());
};

export const togglelRegisterModal = () => (dispatch) => {
  dispatch(_toggleRegisterModal());
};

export const toggleLoginModal = () => (dispatch) => {
  dispatch(_toggleLoginModal());
};
