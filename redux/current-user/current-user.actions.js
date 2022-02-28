import { useRequest } from "../../hooks/use-request";
import { assignToCart } from "../cart/cart.actions";
import { CurrentUserActions } from "./current-user.types";

const FETCH_USER = "http://localhost:4000/api/auth/current-user";
const LOGIN = "http://localhost:4000/api/auth/login";
const REGISTER = "http://localhost:4000/api/auth/register";
const LOGOUT = "http://localhost:4000/api/auth/logout";

const fetchUserStart = () => ({
  type: CurrentUserActions.FETCH_CURRENT_USER_START,
});

export const fetchUserSuccess = (currentUser) => ({
  type: CurrentUserActions.FETCH_CURRENT_USER_SUCCESS,
  payload: currentUser,
});

const fetchUserError = (error) => ({
  type: CurrentUserActions.FETCH_CURRENT_USER_ERROR,
  payload: error,
});

const loginStart = () => ({
  type: CurrentUserActions.LOGIN_USER_START,
});

const loginSuccess = (currentUser) => ({
  type: CurrentUserActions.LOGIN_USER_SUCCESS,
  payload: currentUser,
});

const loginError = (error) => ({
  type: CurrentUserActions.LOGIN_USER_ERROR,
  payload: error,
});

const logOutStart = () => ({
  type: CurrentUserActions.LOGOUT_USER_START,
});

const logOutSuccess = (currentUser) => ({
  type: CurrentUserActions.LOGOUT_USER_SUCCESS,
  payload: currentUser,
});

const logOutError = (error) => ({
  type: CurrentUserActions.LOGOUT_USER_ERROR,
  payload: error,
});

const registerStart = () => ({
  type: CurrentUserActions.REGISTER_USER_START,
});

const registerSuccess = (currentUser) => ({
  type: CurrentUserActions.REGISTER_USER_SUCCESS,
  payload: currentUser,
});

const registerError = (error) => ({
  type: CurrentUserActions.REGISTER_USER_ERROR,
  payload: error,
});

export const fetchCurrentUserAsync = () => (dispatch) => {
  const performRequest = useRequest(FETCH_USER);
  dispatch(fetchUserStart());
  performRequest("get")
    .then((data) => {
      dispatch(fetchUserSuccess(data));
      dispatch(assignToCart(data.currentCartItems || []));
    })
    .catch((err) => dispatch(fetchUserError(err)));
};

export const loginUserAsync = (formData) => (dispatch) => {
  const performRequest = useRequest(LOGIN);
  dispatch(loginStart());
  return new Promise((resolve, reject) => {
    performRequest("post", formData)
      .then((data) => {
        dispatch(loginSuccess(data));
        dispatch(assignToCart(data.currentCartItems || []));
        resolve();
      })
      .catch((err) => {
        dispatch(loginError(err));
        reject();
      });
  });
};

export const logoutUserAsync = () => (dispatch) => {
  const performRequest = useRequest(LOGOUT);
  dispatch(logOutStart());
  return new Promise((resolve, reject) => {
    performRequest("post")
      .then((data) => {
        dispatch(logOutSuccess(null));
        dispatch(assignToCart([]));
        resolve(data);
      })
      .catch((err) => {
        dispatch(logOutError(err));
        reject();
      });
  });
};

export const registerUserAsync = (formData) => (dispatch) => {
  const performRequest = useRequest(REGISTER);
  dispatch(registerStart());
  return new Promise((resolve, reject) => {
    performRequest("post", formData)
      .then((data) => {
        dispatch(registerSuccess(data));
        dispatch(assignToCart(data.currentCartItems || []));
        resolve();
      })
      .catch((err) => {
        dispatch(registerError(err));
        reject();
      });
  });
};

export const updateProfileAsync = (user, form) => (dispatch) => {
  const url = `http://localhost:4000/api/users/${user?.id}?update=info`;
  const performRequest = useRequest(url);

  return new Promise((resolve, reject) => {
    performRequest("patch", form)
      .then((data) => {
        dispatch(fetchUserSuccess(data));
        resolve("Profile Updated successfully");
      })
      .catch((err) => {
        reject(err?.message);
      });
  });
};

export const updatePasswordAsync = (user, form) => (dispatch) => {
  const url = `http://localhost:4000/api/users/${user?.id}?update=update_password`;
  const performRequest = useRequest(url);

  return new Promise((resolve, reject) => {
    performRequest("patch", form)
      .then(() => resolve("Password updated successfully."))
      .catch((err) => reject(err?.message));
  });
};
