const initialState = {
    loanList: []
}

const loanReducer = (state = initialState, action) => {
const { type, payload } = action;

switch (type) {
    case "LOAN_SUCCESS":
      return {
          ...state,
          loanList: payload.loanList,
      };
    case "LOAN_FAIL":
    return {
        ...state,
        loanList: []
    };
    
    default:
    return state;
}
  }

export default loanReducer;