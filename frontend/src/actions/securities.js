import securities_service from "../services/securities";

export const securities = (UserID) => (dispatch) => {
  return securities_service.getSecurities(UserID).then(
    (data) => {
      if(data.code === 200){
        dispatch({
          type: "SECURITIES_SUCCESS",
          payload: { securitiesList: data },
        });
      }
      else{
        dispatch({
          type: "SECURITIES_FAIL"
        });

        dispatch({
          type: "SET_MESSAGE",
          payload: "No SECURITIES Account",
        });
        return Promise.reject();
      }

      return Promise.resolve();
    },
    (error) => {
      console.log(error)
      const message = error.message
      dispatch({
        type: "SECURITIES_FAIL",
      });

      dispatch({
        type: "SET_MESSAGE",
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const watchlist = (UserID) => (dispatch) => {
  return securities_service.getWatchList(UserID).then(
    (data) => {
      if(data.code === 200){
        dispatch({
          type: "WATCHLIST_SUCCESS",
          payload: { watchList: data.data },
        });
      }
      else{
        dispatch({
          type: "WATCHLIST_FAIL"
        });

        dispatch({
          type: "SET_MESSAGE",
          payload: "No Watch List",
        });
        return Promise.reject();
      }

      return Promise.resolve();
    },
    (error) => {
      console.log(error)
      const message = error.message
      dispatch({
        type: "WATCHLIST_FAIL",
      });

      dispatch({
        type: "SET_MESSAGE",
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const createWatchListName = (input) => (dispatch) => {
  return securities_service.createWatchListName(input).then(
    (data) => {
        if(data.code === 200){
          /*dispatch({
            type: "CREATE_WATCHLIST_SUCCESS",
            payload: input
          });*/
          return Promise.resolve(data);
        }
        
    },
    (error) => {
      console.log(error)
      return Promise.reject(error);
    }
  );
};

export const updateWatchListName = (input) => (dispatch) => {
  return securities_service.updateWatchListName(input).then(
    (data) => {
        if(data.code === 200){
          /*dispatch({
            type: "CREATE_WATCHLIST_SUCCESS",
            payload: input
          });*/
          return Promise.resolve(data);
        }
        
    },
    (error) => {
      console.log(error)
      return Promise.reject(error);
    }
  );
};

export const deleteWatchList = (input) => (dispatch) => {
  return securities_service.deleteWatchList(input).then(
    (data) => {
        if(data.code === 200){
          /*dispatch({
            type: "CREATE_WATCHLIST_SUCCESS",
            payload: input
          });*/
          return Promise.resolve(data);
        }
        
    },
    (error) => {
      console.log(error)
      return Promise.reject(error);
    }
  );
};

export const addSecurities_WatchList = (input) => (dispatch) => {
  return securities_service.addSecurities_WatchList(input).then(
    (data) => {
        if(data.code === 200){
          /*dispatch({
            type: "CREATE_WATCHLIST_SUCCESS",
            payload: input
          });*/
          return Promise.resolve(data);
        }
        
    },
    (error) => {
      console.log(error)
      return Promise.reject(error);
    }
  );
};

export const removeSecurities_WatchList = (input) => (dispatch) => {
  return securities_service.removeSecurities_WatchList(input).then(
    (data) => {
        if(data.code === 200){
          /*dispatch({
            type: "CREATE_WATCHLIST_SUCCESS",
            payload: input
          });*/
          return Promise.resolve(data);
        }
        
    },
    (error) => {
      console.log(error)
      return Promise.reject(error);
    }
  );
};



