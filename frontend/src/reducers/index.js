import authReducer from "./auth.js";
import depositReducer from "./deposit.js";
import creditCardReducer from "./creditcard";
import loanReducer from "./loan.js";
import peekDetailReducer from "./peekdetail";
import messageReducer from "./message.js";
import {combineReducers} from "redux"

const allReducers = combineReducers({
    auth: authReducer,
    deposit: depositReducer,
    loan: loanReducer,
    peekDetail: peekDetailReducer,
    creditcard: creditCardReducer,
    message: messageReducer
})

export default allReducers

