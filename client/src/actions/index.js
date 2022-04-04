import axios from "axios";

export function getAllDogs() {
  return async function (dispatch) {
    let dogs = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: dogs.data,
    });
  };
}

export function orderAlphabetically(payload) {
  return {
    type: "ORDER_BY_ATOZ",
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}

export function createdInDb(payload) {
  console.log(payload);
  return {
    type: "ORDER_BY_CREATION",
    payload,
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    let temperaments = await axios.get("http://localhost:3001/temperament");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: temperaments.data,
    });
  };
}

export function filteredByTemperament(payload) {
  return {
    type: "FILTERED_BY_TEMP",
    payload,
  };
}
