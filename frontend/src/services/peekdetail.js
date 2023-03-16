import axios from "axios";

const API_URL = "http://localhost:5000/api/peek_detail";

const getPeekDetail = (userID) => {
    var bodyFormData = new FormData();
    bodyFormData.append("userID", userID)

    return axios
    ({
        method: "post",
        url: API_URL,
        data: bodyFormData,
    })
      .then((response) => {
        return response.data;
      });
  };

  const peekdetail_service = { 
    getPeekDetail
  }

  export default peekdetail_service;