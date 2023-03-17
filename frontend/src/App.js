// Main Packages
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// MUI Components
import { ThemeProvider, CssBaseline, Box } from "@mui/material";

// Pages
import PeekBalance from "./pages/Account_Module/peekBalance.js";
import Login from "./pages/Account_Module/login.js";
import DashBoard from './pages/Dashboard_Module/dashboard.js'
import DepositSummary from './pages/Deposit_Module/deposit-summary.js'
import AccountDetails from './pages/Deposit_Module/account-details.js'
import TransactionHistory from './pages/Deposit_Module/view-transaction-history.js'
import CashFlow from './pages/Deposit_Module/cashflow.js'
import LoanSummary from './pages/Loan_Module/loan-summary.js'
import LoanTransactionHistory from './pages/Loan_Module/view-loan-transaction-history.js'
import LoanAccountDetails from './pages/Loan_Module/loan-account-details.js'
import ManageDeposit from "./pages/Deposit_Module/manage-deposit.js"
import PaymentReminders from "./pages/Loan_Module/payment-reminders.js"

// Customised Components
import MainBottomNavigation from "./components/MainBottomNavigation";
import theme from "./paletteTheme"
import { clearMessage } from "./actions/message";

// Images
import backgroundImage from "./assets/images/bg.jpg";

function App() {
const [showAppBar, setAppBar] = useState(false);
const [showBottomNavigation, setBottomNavigation] = useState(false);

const { user: currentUser } = useSelector((state) => state.auth);
const dispatch = useDispatch();

let location = useLocation();

useEffect(() => {
  if (["/login", "/register"].includes(location.pathname)) {
    dispatch(clearMessage()); // clear message when changing location
  }
}, [dispatch, location]);


useEffect(() => {
  if (currentUser) {
    console.log(currentUser)
    setBottomNavigation(true);
    setAppBar(true);
    }
    else{
    //setCurrentUser(false)
    setBottomNavigation(false);
    setAppBar(false);
    }
  }, [currentUser]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundImage: `url(${ backgroundImage })`, minHeight: "100vh" }}>
        <header className="App-header">
          <CssBaseline enableColorScheme />
          <>
            <Routes>
              {/* Account Module */}
              <Route exact path={"/"} element= {!currentUser && <PeekBalance></PeekBalance>} />
              <Route exact path={"/login"} element= {<Login />} />
              <Route exact path={"/dashboard"} element={<DashBoard />} />

              {/* Loan */}
              <Route exact path={"/deposit"} element={<DepositSummary />} />
              <Route exact path={"/view-transaction-history"} element={<TransactionHistory />} />
              <Route exact path={"/account-details/:id"} element={<AccountDetails />} />
              <Route exact path={"/cashflow"} element={<CashFlow />} />
              <Route exact path={"/manage-deposit/:id"} element={<ManageDeposit />} />

              {/* Loan Module */}
              <Route exact path={"/loan"} element={<LoanSummary />} />
              <Route exact path={"/loan-account-details/:id"} element={<LoanAccountDetails />} />
              <Route exact path={"/view-loan-transaction-history"} element={<LoanTransactionHistory />} />
              <Route exact path={"/payment-reminders"} element={<PaymentReminders />} />
              
            </Routes>
            {(showBottomNavigation) && <MainBottomNavigation></MainBottomNavigation>}
          </>
        </header>
      </div>
    </ThemeProvider>

  )  
}

export default App;
