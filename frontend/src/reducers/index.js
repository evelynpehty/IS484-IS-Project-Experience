import authReducer from "./auth.js";
import depositReducer from "./deposit.js";
import creditCardReducer from "./creditcard";
import loanReducer from "./loan.js";
import peekDetailReducer from "./peekdetail";
import messageReducer from "./message.js";
import securitiesReducer from "./securities.js";
import dashboardReducer from "./dashboard.js";
import {combineReducers} from "redux"

const allReducers = combineReducers({
    auth: authReducer,
    deposit: depositReducer,
    loan: loanReducer,
    securities: securitiesReducer,
    peekDetail: peekDetailReducer,
    creditcard: creditCardReducer,
    dashboard: dashboardReducer,
    message: messageReducer
})

export default allReducers

