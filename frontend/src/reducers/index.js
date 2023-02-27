import authReducer from "./auth.js";
import depositReducer from "./deposit.js";
import loanReducer from "./loan.js";
import messageReducer from "./message.js";
import {combineReducers} from "redux"

const allReducers = combineReducers({
    auth: authReducer,
    deposit: depositReducer,
    loan: loanReducer,
    message: messageReducer
})

export default allReducers

