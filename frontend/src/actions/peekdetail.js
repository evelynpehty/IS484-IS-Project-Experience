import peekdetail_service from "../services/peekdetail.js";

export const peekDetail = (UserID) => (dispatch) => {
  return peekdetail_service.getPeekDetail(UserID).then(
    (data) => {
      if(data.code === 200){
        dispatch({
          type: "PEEK_DETAIL_SUCCESS",
          payload: { peek_detail_item: data.data },
        });
      }
      else{
        dispatch({
          type: "PEEK_DETAIL_FAIL"
        });

        dispatch({
          type: "SET_MESSAGE",
          payload: "No Details",
        });
        return Promise.reject();
      }

      return Promise.resolve();
    },
    (error) => {
      console.log(error)
      const message = error.message
      dispatch({
        type: "PEEK_DETAIL_FAIL",
      });

      dispatch({
        type: "SET_MESSAGE",
        payload: message,
      });

      return Promise.reject();
    }
  );
};

