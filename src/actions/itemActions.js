import { GET_ITEM, GET_HOURLY_DATA, SET_LOADING, SET_CLICKED } from "./types";

export const getItems = (items) => {
  return {
    type: GET_ITEM,
    payload: items,
  };
};

export const getHourlyData = (items) => {
  return {
    type: GET_HOURLY_DATA,
    payload: items,
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const isClicked = () => {
  return {
    type: SET_CLICKED,
  };
};
