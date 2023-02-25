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

  const deposit_service = { 
    getalldepositaccounts
  }

  export default deposit_service;