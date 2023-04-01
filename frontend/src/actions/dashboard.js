import dashboard_service from "../services/dashboard.js";

export const userNetWorth = (UserID) => (dispatch) => {
  return dashboard_service.getUserNetWorth(UserID).then(
    (data) => {
      if(data.code === 200){
        dispatch({
          type: "NETWORTH_SUCCESS",
          payload: { netWorth: data.data },
        });
      }
      else{
        dispatch({
          type: "NETWORTH_FAIL"
        });

        dispatch({
          type: "SET_MESSAGE",
          payload: "No Result",
        });
        return Promise.reject();
      }

      return Promise.resolve();
    },
    (error) => {
      console.log(error)
      const message = error.message
      dispatch({
        type: "NETWORTH_FAIL",
      });

      dispatch({
        type: "SET_MESSAGE",
        payload: message,
      });

      return Promise.reject();
    }
  );
};

