import {
  GET_ITEM,
  GET_HOURLY_DATA,
  SET_LOADING,
  SET_CLICKED,
} from "../actions/types";

let initialState = {
  city: "Bengaluru",
  data: "",
  loading: false,
  clicked: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEM:
      return {
        ...state,
        city: action.payload,
        loading: false,
      };
    case GET_HOURLY_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_CLICKED:
      return {
        ...state,
        clicked: !state.clicked,
      };
    default:
      return state;
  }
}
