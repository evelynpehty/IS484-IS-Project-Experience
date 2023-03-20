const initialState = {
    loanList: [],
    loan_transactionHistoryList: []
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
    case "UPDATE_LOAN_SUCCESS":
      const { loanList } = state

      const arr = loanList.accountInformation

      for(let index = 0; index < arr.length; index++){
        if(arr[index].LoanAccountID === payload.loanAccountID){
          loanList.accountInformation[index].ChosenColor =payload.newColor;
          loanList.accountInformation[index].AccountName =payload.newName;
        }
      }

      return {
          ...state,
          loanList: loanList
      };      
    default:
    return state;
  }
}

export default loanReducer;