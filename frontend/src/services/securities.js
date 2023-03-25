import axios from "axios";

const API_URL = "http://localhost:5000/api/";

const getSecurities = (userID) => {
    var bodyFormData = new FormData();
    bodyFormData.append("userID", userID)

    return axios
    ({
        method: "post",
        url: API_URL + "get_info_for_all_securities",
        data: bodyFormData,
    })
      .then((response) => {
        return response.data;
      });
  };

  const securities_service = { 
    getSecurities
  }

  export default securities_service;