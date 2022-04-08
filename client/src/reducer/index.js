const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  details: [],
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
        let weightMin = state.dogs.sort((a, b) => {
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
        let weightMax = state.dogs.sort((a, b) => {
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
        let orderedAToZ = state.dogs.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
        orderedDogs = orderedAToZ;
      } else {
        let orderedZToA = state.dogs.sort((a, b) => {
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
    case "ORDER_BY_CREATION":
      let doggies;
      if (action.payload === "apiDogs") {
        let dogsApi = state.allDogs.filter((e) => e.id.length < 4);
        doggies = dogsApi;
      }
      if (action.payload === "dbDogs") {
        let dogsDb = state.allDogs.filter((e) => e.id.length > 6);
        doggies = dogsDb;
      }
      return {
        ...state,
        dogs: doggies,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "FILTERED_BY_TEMP":
      let filteredDogies = state.allDogs.filter((el) => {
        if (el.temperament?.includes(action.payload)) return el;
      });
      return {
        ...state,
        dogs: filteredDogies,
      };
    case "GET_DOGS_NAME":
      return {
        ...state,
        dogs: action.payload,
      };
    case "POST_DOG":
      return {
        ...state,
      };
    case "GET_DETAILS":
      return {
        ...state,
        details: action.payload,
      };
    case "CLEANER":
      return {
        ...state,
        details: {},
      };
    default:
      return state;
  }
}

export default rootReducer;
