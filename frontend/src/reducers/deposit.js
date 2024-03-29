const initialState = {
    depositList: [],
    cashflow_this_month:{},
    totalBalance:0,
    transactionHistoryList: []
}

const depositReducer = (state = initialState, action) => {
const { type, payload } = action;

switch (type) {
    case "DEPOSIT_SUCCESS":
      return {
          ...state,
          depositList: payload.depositList.accountInfo,
          cashflow_this_month: payload.depositList.cashflow_this_month,
          totalBalance: payload.depositList.totalBalance

      };
    case "DEPOSIT_FAIL":
    return {
        ...state,
        depositList: [],
        cashflow_this_month:{},
        totalBalance:0,
        transactionHistoryList: []
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
    case "UPDATE_DEPOSIT_SUCCESS":
      const {depositList} = state

      depositList.forEach(el => {
        if(el.DepositAccountID === payload.depositAccountID){
          el.ChosenColor =payload.newColor;
          el.AccountName = payload.newName
        }
      });
  
      return {
          ...state,
          depositList: depositList
      };
    
    default:
    return state;
}
  }

export default depositReducer;