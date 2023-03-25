import account_service from "../services/account.js";

export const login = (username, password) => (dispatch) => {
    return account_service.login(username, password).then(
      (data) => {
        if(data.code === 200){
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: data },
          });
        }
        else{
          dispatch({
            type: "LOGIN_FAIL"
          });

          dispatch({
            type: "SET_MESSAGE",
            payload: "Incorrect login credentials. Please try again.",
          });
          return Promise.reject();
        }

        return Promise.resolve(data);
      },
      (error) => {
        console.log(error)
        const message = error.message
        dispatch({
          type: "LOGIN_FAIL",
        });
  
        dispatch({
          type: "SET_MESSAGE",
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

export const logout = () => (dispatch) => { 
  dispatch({
    type: "LOGOUT",
  });
};

export const QuickAction = (route) => (dispatch) => { 
  dispatch({
    type: "QUICK_ACTION",
    payload: route,
  });
};

export const DataLoaded = (route) => (dispatch) => { 
  dispatch({
    type: "DATA_LOADED",
  });
};


export const RemoveFirstLoad = () => (dispatch) => { 
  dispatch({
    type: "REMOVE_FIRST_LOAD",
  });
};