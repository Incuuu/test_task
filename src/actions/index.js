import * as actionTypes from "../actionTypes";

export const getPonies = (params) => ({
  type: actionTypes.GET_PONIES,
  params,
});

export const addToCart = (params) => ({
  type: actionTypes.ADD_TO_CART,
  params,
});

export const changeFilter = (params) => ({
  type: actionTypes.CHANGE_FILTER,
  params,
});

export const toggleFilters = (params) => ({
  type: actionTypes.TOGGLE_FILTERS,
  params,
});
