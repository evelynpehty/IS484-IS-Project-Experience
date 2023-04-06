import axios from "axios";

const API_URL = "http://localhost:5000/api/";

const getUserNetWorth = (userID) => {
    var bodyFormData = new FormData();
    bodyFormData.append("userID", userID)

    return axios
    ({
        method: "post",
        url: API_URL + "get_user_net_worth",
        data: bodyFormData,
    })
      .then((response) => {
        return response.data;
      });
};

const getEmergencySaving = (userID) => {
  var bodyFormData = new FormData();
  bodyFormData.append("userID", userID)

  return axios
  ({
      method: "post",
      url: API_URL + "emergency_saving_target_amount",
      data: bodyFormData,
  })
    .then((response) => {
      return response.data;
    });
};


const dashboard_service = { 
getUserNetWorth,
getEmergencySaving
}

export default dashboard_service;