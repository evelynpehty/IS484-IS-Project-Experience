import creeditcard_service from "../services/creditcard.js";

export const creditcard = (UserID) => (dispatch) => {
  return creeditcard_service.getCreditCard(UserID).then(
    (data) => {
      if(data.code === 200){
        dispatch({
          type: "CREDITCARD_SUCCESS",
          payload: { creditCardList: data.data },
        });
      }
      else{
        dispatch({
          type: "CREDITCARD_FAIL"
        });

        dispatch({
          type: "SET_MESSAGE",
          payload: "No Credit Card Account",
        });
        return Promise.reject();
      }

      return Promise.resolve();
    },
    (error) => {
      console.log(error)
      const message = error.message
      dispatch({
        type: "LOAN_FAIL",
      });

      dispatch({
        type: "SET_MESSAGE",
        payload: message,
      });

      return Promise.reject();
    }
  );
};

