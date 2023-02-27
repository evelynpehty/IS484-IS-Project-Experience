const initialState = {
    depositList: [],
    transactionHistoryList: []
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
    case "TRANSACTION_HISTORY_SUCCESS":
      return {
          ...state,
          transactionHistoryList: payload.transactionHistoryList,
      };
    case "TRANSACTION_HISTORY_FAIL":
    return {
        ...state,
        transactionHistoryList: []
    };
    
    default:
    return state;
}
  }

export default depositReducer;