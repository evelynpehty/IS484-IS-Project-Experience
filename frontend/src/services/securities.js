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

  const getWatchList = (userID) => {
    var bodyFormData = new FormData();
    bodyFormData.append("userID", userID)

    return axios
    ({
        method: "post",
        url: API_URL + "get_watchlist_by_userID",
        data: bodyFormData,
    })
      .then((response) => {
        return response.data;
      });
  };

  const createWatchListName = (input) => {
    var bodyFormData = new FormData();
    bodyFormData.append("userID", input.userID)
    bodyFormData.append("watchlistName", input.watchlistName)

    return axios
    ({
        method: "post",
        url: API_URL + "create_watchlist",
        data: bodyFormData,
    })
      .then((response) => {
        return response.data;
      });
  };


  const updateWatchListName = (input) => {
    var bodyFormData = new FormData();
    bodyFormData.append("watchlistID", input.watchlistID)
    bodyFormData.append("newWatchlistGroupName", input.newWatchlistGroupName)

    return axios
    ({
        method: "post",
        url: API_URL + "update_watchlist_name",
        data: bodyFormData,
    })
      .then((response) => {
        return response.data;
      });
  };

  const deleteWatchList = (watchlistID) => {
    var bodyFormData = new FormData();
    bodyFormData.append("watchlistID", watchlistID)

    return axios
    ({
        method: "post",
        url: API_URL + "delete_watchlist",
        data: bodyFormData,
    })
      .then((response) => {
        return response.data;
      });
  };

  const addSecurities_WatchList = (input) => {
    var bodyFormData = new FormData();
    bodyFormData.append("watchlistID", input.watchlistID)
    bodyFormData.append("ticker", input.ticker)
    bodyFormData.append("watchlistName", input.watchlistName)

    return axios
    ({
        method: "post",
        url: API_URL + "insert_new_securities_into_watchlist",
        data: bodyFormData,
    })
      .then((response) => {
        return response.data;
      });
  };

  const removeSecurities_WatchList = (input) => {
    var bodyFormData = new FormData();
    bodyFormData.append("watchlistID", input.watchlistID)
    bodyFormData.append("ticker", input.ticker)
    
    return axios
    ({
        method: "post",
        url: API_URL + "remove_securities_from_watchlist",
        data: bodyFormData,
    })
      .then((response) => {
        return response.data;
      });
  };

  const securities_service = { 
    getSecurities,
    getWatchList, 
    createWatchListName,
    updateWatchListName,
    deleteWatchList,
    addSecurities_WatchList,
    removeSecurities_WatchList
  }



  export default securities_service;