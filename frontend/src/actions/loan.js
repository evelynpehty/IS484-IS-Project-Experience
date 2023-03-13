import loan_service from "../services/loan.js";

export const loan = (UserID) => (dispatch) => {
  return loan_service.getallloanaccounts(UserID).then(
    (data) => {
      if(data.code === 200){
        dispatch({
          type: "LOAN_SUCCESS",
          payload: { loanList: data.data },
        });
      }
      else{
        dispatch({
          type: "LOAN_FAIL"
        });

        dispatch({
          type: "SET_MESSAGE",
          payload: "No Loan Account",
        });
        return Promise.reject();
      }

      return Promise.resolve();
    },
    (error) => {
      console.log(error)
      const message = error.message
      dispatch({
        type: "LOAN_FAIL",
      });

      dispatch({
        type: "SET_MESSAGE",
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const loanTransactionHistory = (UserID) => (dispatch) => {
  return loan_service.loanTransactionHistory(UserID).then(
    (data) => {
      if(data.code === 200){
        dispatch({
          type: "LOAN_TRANSACTION_HISTORY_SUCCESS",
          payload: { loan_transactionHistoryList: data.transactions },
        });
      }
      else{
        dispatch({
          type: "LOAN_TRANSACTION_HISTORY_FAIL"
        });

        dispatch({
          type: "SET_MESSAGE",
          payload: "No records of transaction history for this loan account",
        });
        return Promise.reject();
      }

      return Promise.resolve();
    },
    (error) => {
      console.log(error)
      const message = error.message
      dispatch({
        type: "LOAN_TRANSACTION_HISTORY_FAIL",
      });

      dispatch({
        type: "SET_MESSAGE",
        payload: message,
      });

      return Promise.reject();
    }
  );
};