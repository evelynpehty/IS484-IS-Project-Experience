import axios from "axios";

const API_URL = "http://localhost:5000/api/";

const getCreditCard = (userID) => {
    var bodyFormData = new FormData();
    bodyFormData.append("userID", userID)

    return axios
    ({
        method: "post",
        url: API_URL + "get_view_all_credit_card",
        data: bodyFormData,
    })
      .then((response) => {
        return response.data;
      });
  };

  const creditcard_service = { 
    getCreditCard
  }

  export default creditcard_service;