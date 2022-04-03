const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "ORDER_BY_WEIGHT":
      let filteredDogs;
      if (action.payload === "weightMin") {
        let weightMin = state.allDogs.sort((a, b) => {
          if (a.weightMin > b.weightMin) {
            return 1;
          }
          if (b.weightMin > a.weightMin) {
            return -1;
          }
          return 0;
        });
        filteredDogs = weightMin;
      }
      if (action.payload === "weightMax") {
        let weightMax = state.allDogs.sort((a, b) => {
          if (a.weightMax > b.weightMax) {
            return -1;
          }
          if (b.weightMax > a.weightMax) {
            return 1;
          }
          return 0;
        });
        filteredDogs = weightMax;
      }
      return {
        ...state,
        dogs: filteredDogs,
      };
    case "ORDER_BY_ATOZ":
      let orderedDogs;
      if (action.payload === "ascendente") {
        let orderedAToZ = state.allDogs.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
        orderedDogs = orderedAToZ;
      }
      if (action.payload === "descendente") {
        let orderedZToA = state.allDogs.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
        orderedDogs = orderedZToA;
      }
      return {
        ...state,
        dogs: orderedDogs,
      };
    case "CREATED_IN_DB":
      let doggies;
      if (action.payload === "apiDogs") {
        let dogsApi = state.allDogs;
        doggies = dogsApi;
      }
      if (action.payload === "dbDogs") {
        let dogsDb = state.allDogs.filter((e) => e.id.includes > "-");
        doggies = dogsDb;
      }
      return {
        ...state,
        dogs: doggies,
      };

    default:
      return state;
  }
}

export default rootReducer;