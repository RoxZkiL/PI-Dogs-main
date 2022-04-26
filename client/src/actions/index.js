import axios from "axios";

export function getAllDogs() {
  return async function (dispatch) {
    try {
      let dog = await axios.get("/dogs");
      return dispatch({
        type: "GET_DOGS",
        payload: dog.data,
      });
    } catch (error) {
      console.log(error);
    }
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
  return {
    type: "ORDER_BY_CREATION",
    payload,
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    let temperaments = await axios.get("/temperament");
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

export function getCreatedDogs(payload) {
  return async function (dispatch) {
    let postDog = await axios.post("/dog", payload);
    return postDog;
  };
}

export function getDogsByQuery(payload) {
  return async function (dispatch) {
    try {
      let dogNames = await axios.get(`/dogs?name=${payload}`);
      return dispatch({
        type: "GET_DOGS_NAME",
        payload: dogNames.data,
      });
    } catch (error) {
      console.log(error);
      alert("Dog not found");
    }
  };
}

export function getDetails(payload) {
  return async function (dispatch) {
    try {
      const details = await axios.get(`/dogs/${payload}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: details.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteDog(id) {
  return async function (dispatch) {
    try {
      const deleteDog = await axios.delete(`/doggos/${id}`);
      return dispatch({
        type: "DELETED_DOG",
        payload: deleteDog,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function cleanDog() {
  return {
    type: "CLEAN_DOG",
    payload: {},
  };
}

export function cleaner() {
  return {
    type: "CLEANER",
    payload: {},
  };
}

// export function orderWeight() {
//   return async function (dispatch) {
//     let order = await axios.get("http://localhost:3001/order");
//     return dispatch({
//       type: "GET_ORDER",
//       payload: order.data,
//     });
//   };
// }
