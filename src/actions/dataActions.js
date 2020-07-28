import { FETCH_DATA } from "./types";

export const fetchData = (data) => (dispatch) => {
  dispatch({
    type: FETCH_DATA,
    payload: data,
  });
};


