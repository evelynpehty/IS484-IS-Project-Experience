import axios from "axios";

const API_URL = "http://localhost:5000/api/";

const getallloanaccounts = (userID) => {
    var bodyFormData = new FormData();
    bodyFormData.append("userID", userID)

    return axios
    ({
        method: "post",
        url: API_URL + "get_all_loan_account",
        data: bodyFormData,
    })
      .then((response) => {
        return response.data;
      });
  };

const loanTransactionHistory = (userID) => {
  var bodyFormData = new FormData();
  bodyFormData.append("userID", userID)

  return axios
  ({
      method: "post",
      url: API_URL + "view_loan_transactions_by_user",
      data: bodyFormData,
  })
    .then((response) => {
      return response.data;
    });
};

const updateLoanAccount = (input) => {
  var bodyFormData = new FormData();
  bodyFormData.append("loanAccountID", input.loanAccountID)
  bodyFormData.append("newName", input.newName)
  bodyFormData.append("newColor", input.newColor)

  return axios
  ({
      method: "post",
      url: API_URL + "update_loan_account",
      data: bodyFormData,
  })
    .then((response) => {
      return response.data;
    });
}; 

const updateLoanReminder = (input) => {
  var bodyFormData = new FormData();
  bodyFormData.append("loanAccountID", input.loanAccountID)
  bodyFormData.append("ReminderType", input.ReminderType)

  return axios
  ({
      method: "post",
      url: API_URL + "update_new_reminder",
      data: bodyFormData,
  })
    .then((response) => {
      return response.data;
    });
};

const removeLoanReminder = (loanReminderID) => {
  var bodyFormData = new FormData();
  bodyFormData.append("loanReminderID", loanReminderID)

  return axios
  ({
      method: "post",
      url: API_URL + "remove_reminder",
      data: bodyFormData,
  })
    .then((response) => {
      return response.data;
    });
};

const loan_service = { 
  getallloanaccounts,
  loanTransactionHistory,
  updateLoanReminder,
  updateLoanAccount,
  removeLoanReminder
}

export default loan_service;