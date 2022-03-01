import { environment } from "../../environment";
import { useRequest } from "../../hooks/use-request";
import { CollectionsAction } from "./collections.types";

const fetchCollectionStart = () => ({
  type: CollectionsAction.FETCH_COLLECTION_START,
});

const fetchCollectionSuccess = (data) => ({
  type: CollectionsAction.FETCH_COLLECTION_SUCCESS,
  payload: data,
});

const fetchCollectionFailure = (err) => ({
  type: CollectionsAction.FETCH_COLLECTION_FAILURE,
  payload: err,
});

export const fetchCollectionAsync = () => (dispatch) => {
  const url = `${environment.NEXT_PUBLIC_API}/products`;
  const performRequest = useRequest(url);

  dispatch(fetchCollectionStart());
  performRequest("get")
    .then((data) => dispatch(fetchCollectionSuccess(data)))
    .catch((err) => dispatch(fetchCollectionFailure(err)));
};
