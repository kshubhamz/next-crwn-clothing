import { SectionActionTypes } from "./section.types";

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  error: undefined,
};

export const sectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SectionActionTypes.FETCH_SECTION_START:
      return { ...state, isFetching: true };
    case SectionActionTypes.FETCH_SECTION_SUCCESS:
      return { ...state, isFetching: false, collections: action.payload };
    case SectionActionTypes.FETCH_SECTION_ERROR:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return state;
  }
};
