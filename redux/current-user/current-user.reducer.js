import { CurrentUserActions } from "./current-user.types";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: undefined,
  authSuccessMessage: undefined,
};

export const currentUserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CurrentUserActions.FETCH_CURRENT_USER_START:
      return { ...state, isFetching: true, error: undefined };
    case CurrentUserActions.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
        error: undefined,
      };
    case CurrentUserActions.FETCH_CURRENT_USER_ERROR:
      return { ...state, isFetching: false, error: action.payload };
    case CurrentUserActions.LOGIN_USER_START:
      return { ...state, isFetching: true, error: undefined, user: null };
    case CurrentUserActions.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
        authSuccessMessage: "Logged In successfully.",
      };
    case CurrentUserActions.LOGIN_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case CurrentUserActions.LOGOUT_USER_START:
      return { ...state, isFetching: true, error: undefined };
    case CurrentUserActions.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
        authSuccessMessage: undefined,
      };
    case CurrentUserActions.LOGOUT_USER_ERROR:
      return { ...state, isFetching: false, error: action.payload };
    case CurrentUserActions.REGISTER_USER_START:
      return { ...state, isFetching: true, error: undefined, user: null };
    case CurrentUserActions.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
        authSuccessMessage: "Registered successfully.",
      };
    case CurrentUserActions.REGISTER_USER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case CurrentUserActions.UPDATE_PROFILE_START:
      return {
        ...state,
        isFetching: true,
        error: undefined,
        authSuccessMessage: undefined,
      };
    case CurrentUserActions.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
        authSuccessMessage: "Profile Updated successfully.",
      };
    case CurrentUserActions.UPDATE_PROFILE_FAILURE:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return { ...state };
  }
};
