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

