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

  const loan_service = { 
    getallloanaccounts
  }

  export default loan_service;