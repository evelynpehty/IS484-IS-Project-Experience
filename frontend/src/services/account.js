import axios from "axios";

const API_URL = "http://localhost:5000/api/login";

const login = (username, password) => {
    var bodyFormData = new FormData();
   
    bodyFormData.append("username", (username))
    bodyFormData.append("password", (password))

    return axios
    ({
        method: "post",
        url: API_URL,
        data: bodyFormData,
    })
      .then((response) => {
        console.log(response)
        /*if (response.data.code === 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }*/
        return response.data;
      });
  };

  const account_service = { 
    login
  }

  export default account_service;