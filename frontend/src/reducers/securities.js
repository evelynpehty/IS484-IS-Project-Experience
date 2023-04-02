const initialState = {
    securitiesList: [],
    allSecuritiesList: [],
    watchList: []
}

const securitiesReducer = (state = initialState, action) => {
const { type, payload } = action;
const {watchList} = state
switch (type) {
    case "SECURITIES_SUCCESS":
      return {
          ...state,
          securitiesList: payload.securitiesList,
      };
    case "SECURITIES_FAIL":
    return {
        ...state,
        securitiesList: []
    };
    case "ALL_SECURITIES_SUCCESS":
      return {
          ...state,
          allSecuritiesList: payload.allSecuritiesList,
      };
    case "ALL_SECURITIES_FAIL":
    return {
        ...state,
        allSecuritiesList: []
    };
    case "WATCHLIST_SUCCESS":
    return {
        ...state,
        watchList: payload.watchList
    };
    case "WATCHLIST_FAIL":
    return {
        ...state,
        watchList: []
    };
    case "UPDATE_WATCHLISTNAME_SUCCESS":
        watchList.forEach(el => {
            if(el.WatchlistID === payload.watchlistID){
                el.WatchlistGroupName =payload.newWatchlistGroupName;
            }
        });
        return {
            ...state,
            watchList: watchList
        };
    case "DELETE_WATCHLIST_SUCCESS":

        watchList.forEach(el => {
            if(el.WatchlistID === payload){
                const index = watchList.indexOf(el);
                watchList.splice(index, 1);
            }
        });
        return {
            ...state,
            watchList: watchList
        };
    default:
    return state;
}
}

export default securitiesReducer;