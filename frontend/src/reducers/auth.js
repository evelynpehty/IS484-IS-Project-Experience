//const user = JSON.parse(localStorage.getItem("user"));

/*
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };*/


const initialState = {
    isLoggedIn: false,
    isFirstLoad: false,
    user: undefined,
}

const authReducer = (state = initialState, action) => {
const { type, payload } = action;

switch (type) {
    
    case "LOGIN_SUCCESS":
      return {
          ...state,
          isLoggedIn: true,
          isFirstLoad: true,
          user: payload.user,
      };
    case "LOGIN_FAIL":
    return {
        ...state,
        isLoggedIn: false,
        isFirstLoad: false,
        user: null,
    };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        isFirstLoad: false,
        user: null,
    };
    case "REMOVE_FIRST_LOAD":
      return {
          ...state,
          isFirstLoad: false,
      };

    default:
    return state;
}
  }

export default authReducer;