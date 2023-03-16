const initialState = {
    loanList: [],
    loan_transactionHistoryList: [],
    loan_reminder: []
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
    case "LOAN_TRANSACTION_HISTORY_SUCCESS":
      return {
          ...state,
          loan_transactionHistoryList: payload.loan_transactionHistoryList,
      };
    case "LOAN_TRANSACTION_HISTORY_FAIL":
    return {
        ...state,
        loan_transactionHistoryList: []
    };
    case "LOAN_REMINDER_SUCCESS":
      return {
          ...state,
          loan_reminder: payload.loan_reminder,
      };
    case "LOAN_REMINDER_FAIL":
    return {
        ...state,
        loan_reminder: []
    };
    
    default:
    return state;
  }
}

export default loanReducer;