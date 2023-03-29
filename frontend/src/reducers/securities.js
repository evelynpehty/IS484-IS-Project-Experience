const initialState = {
    securitiesList: [],
    watchList: []
}

const securitiesReducer = (state = initialState, action) => {
const { type, payload } = action;

switch (type) {
    case "SECURITIES_SUCCESS":
      return {
          ...state,
          securitiesList: payload.securitiesList,
      };
    case "SECURITIES_FAIL":
    return {
        ...state,
        securitiesList: []
    };
    case "WATCHLIST_SUCCESS":
    return {
        ...state,
        watchList: payload.watchList
    };
    case "WATCHLIST_FAIL":
    return {
        ...state,
        watchList: []
    };
  
    default:
    return state;
}
}

export default securitiesReducer;