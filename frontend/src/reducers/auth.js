//const user = JSON.parse(localStorage.getItem("user"));

/*
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };*/


const initialState = {
    isLoggedIn: false,
    isFirstLoad: false,
    isDataLoaded: false,
    user: undefined,
    route: undefined,
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
        isDataLoaded: false,
        isFirstLoad: false,
        route: undefined,
        user: null,
    };
    case "QUICK_ACTION":
      return {
          ...state,
          route: payload,
      };

      case "DATA_LOADED":
        return {
            ...state,
            isDataLoaded: true,
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