import { CollectionsAction } from "./collections.types";

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  error: undefined,
};

export const collectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CollectionsAction.FETCH_COLLECTION_START:
      return { ...state, isFetching: true, error: undefined };
    case CollectionsAction.FETCH_COLLECTION_SUCCESS:
      return { ...state, isFetching: false, collections: action.payload };
    case CollectionsAction.FETCH_COLLECTION_FAILURE:
      return { ...state, isFetching: false, error: action.payload };
    default:
      return { ...state };
  }
};
