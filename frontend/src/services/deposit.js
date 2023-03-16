import axios from "axios";

const API_URL = "http://localhost:5000/api/";

const getalldepositaccounts = (userID) => {
    var bodyFormData = new FormData();
    bodyFormData.append("userID", userID)

    return axios
    ({
        method: "post",
        url: API_URL + "get_all_deposit_accounts",
        data: bodyFormData,
    })
      .then((response) => {
        return response.data;
      });
  };

  const getDepositTransactionHistory = (userID) => {
    var bodyFormData = new FormData();
    bodyFormData.append("userID", userID)

    return axios
    ({
        method: "post",
        url: API_URL + "get_all_transaction",
        data: bodyFormData,
    })
      .then((response) => {
        return response.data;
      });
  };


const updateDepositAccount = (input) => {
  var bodyFormData = new FormData();
  bodyFormData.append("depositAccountID", input.depositAccountID)
  bodyFormData.append("newName", input.newName)
  bodyFormData.append("newColor", input.newColor)

  return axios
  ({
      method: "post",
      url: API_URL + "update_deposit_account",
      data: bodyFormData,
  })
    .then((response) => {
      return response.data;
    });
}; 

  const deposit_service = { 
    getalldepositaccounts,
    getDepositTransactionHistory,
    updateDepositAccount
  }

  export default deposit_service;