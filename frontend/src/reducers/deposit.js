const initialState = {
    depositList: []
}

const depositReducer = (state = initialState, action) => {
const { type, payload } = action;

switch (type) {
    case "DEPOSIT_SUCCESS":
      return {
          ...state,
          depositList: payload.depositList,
      };
    case "DEPOSIT_FAIL":
    return {
        ...state,
        depositList: []
    };
    
    default:
    return state;
}
  }

export default depositReducer;