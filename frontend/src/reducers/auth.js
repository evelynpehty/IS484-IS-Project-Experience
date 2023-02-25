//const user = JSON.parse(localStorage.getItem("user"));

/*
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };*/


const initialState = {
    isLoggedIn: false,
    user: undefined
}

const authReducer = (state = initialState, action) => {
const { type, payload } = action;

switch (type) {
    
    case "LOGIN_SUCCESS":
      return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
      };
    case "LOGIN_FAIL":
    return {
        ...state,
        isLoggedIn: false,
        user: null,
    };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
    };

    default:
    return state;
}
  }

export default authReducer;