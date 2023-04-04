const initialState = {
    netWorth: {},
    emergencySaving: {}
}

const dashboardReducer = (state = initialState, action) => {
const { type, payload } = action;

switch (type) {
    case "NETWORTH_SUCCESS":
      return {
          ...state,
          netWorth: payload.netWorth,
      };
    case "NETWORTH_FAIL":
    return {
        ...state,
        netWorth: {}
    };
    case "EMERGENCY_SUCCESS":
      return {
          ...state,
          emergencySaving: payload.emergencySaving,
      };
    case "EMERGENCY_FAIL":
    return {
        ...state,
        netWorth: {}
    };
  
    default:
    return state;
}
}

export default dashboardReducer;