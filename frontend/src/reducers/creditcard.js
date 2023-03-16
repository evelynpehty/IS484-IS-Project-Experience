const initialState = {
    creditCardList: []
}

const creditCardReducer = (state = initialState, action) => {
const { type, payload } = action;

switch (type) {
    case "CREDITCARD_SUCCESS":
      return {
          ...state,
          creditCardList: payload.creditCardList,
      };
    case "CREDITCARD_FAIL":
    return {
        ...state,
        creditCardList: []
    };
  
    default:
    return state;
}
}

export default creditCardReducer;