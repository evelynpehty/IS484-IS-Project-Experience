import deposit_service from "../services/deposit.js";

export const deposit = (UserID) => (dispatch) => {
    return deposit_service.getalldepositaccounts(UserID).then(
      (data) => {
        if(data.code === 200){
          dispatch({
            type: "DEPOSIT_SUCCESS",
            payload: { depositList: data.data },
          });
        }
        else{
          dispatch({
            type: "DEPOSIT_FAIL"
          });

          dispatch({
            type: "SET_MESSAGE",
            payload: "No Deposit Account",
          });
          return Promise.reject();
        }

        return Promise.resolve();
      },
      (error) => {
        console.log(error)
        const message = error.message
        dispatch({
          type: "DEPOSIT_FAIL",
        });
  
        dispatch({
          type: "SET_MESSAGE",
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const depositTransactionHistory = (UserID) => (dispatch) => {
    return deposit_service.getDepositTransactionHistory(UserID).then(
      (data) => {
        console.log(data)
        if(data.code === 200){
          dispatch({
            type: "TRANSACTION_HISTORY_SUCCESS",
            payload: { transactionHistoryList: data.data },
          });
        }
        else{
          dispatch({
            type: "TRANSACTION_HISTORY_FAIL"
          });

          dispatch({
            type: "SET_MESSAGE",
            payload: "No Transaction History",
          });
          return Promise.reject();
        }

        return Promise.resolve();
      },
      (error) => {
        console.log(error)
        const message = error.message
        dispatch({
          type: "TRANSACTION_HISTORY_FAIL",
        });
  
        dispatch({
          type: "SET_MESSAGE",
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };