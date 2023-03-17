const initialState = {
    peek_detail_item: {}
}

const peekDetailReducer = (state = initialState, action) => {
const { type, payload } = action;

switch (type) {
    case "PEEK_DETAIL_SUCCESS":
      return {
          ...state,
          peek_detail_item: payload.peek_detail_item,
      };
    case "PEEK_DETAIL_FAIL":
    return {
        ...state,
        peek_detail_item: []
    };
  
    default:
    return state;
}
}

export default peekDetailReducer;