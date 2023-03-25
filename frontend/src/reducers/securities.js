const initialState = {
    securitiesList: []
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
  
    default:
    return state;
}
}

export default securitiesReducer;