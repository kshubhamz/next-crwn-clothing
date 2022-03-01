import { environment } from "../../environment";
import { useRequest } from "../../hooks/use-request";
import { SectionActionTypes } from "./section.types";

const fetchSectionsStart = () => ({
  type: SectionActionTypes.FETCH_SECTION_START,
});

const fetchSectionsSuccess = (data) => ({
  type: SectionActionTypes.FETCH_SECTION_SUCCESS,
  payload: data,
});

const fetchSectionsFailure = (error) => ({
  type: SectionActionTypes.FETCH_SECTION_ERROR,
  payload: error,
});

export const fetchSectionsAsync = () => (dispatch) => {
  const performRequest = useRequest(`${environment.NEXT_PUBLIC_API}/sections`);

  dispatch(fetchSectionsStart());

  performRequest("get")
    .then((data) => dispatch(fetchSectionsSuccess(data)))
    .catch((err) => dispatch(fetchSectionsFailure(err)));
};
