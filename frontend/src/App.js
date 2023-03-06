// Main Packages
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// MUI Components
import { ThemeProvider, CssBaseline, Box } from "@mui/material";

// Pages
import Login from "./pages/Account_Module/login";
import DashBoard from './pages/dashboard.js'
import DepositSummary from './pages/Deposit_Module/deposit-summary.js'
import AccountDetails from './pages/Deposit_Module/account-details.js'
import TransactionHistory from './pages/Deposit_Module/view-transaction-history.js'
import CashFlow from './pages/Deposit_Module/cashflow.js'

import { clearMessage } from "./actions/message";

// Custom Components
import { appTheme } from "./paletteTheme"
import MainAppBar from "./components/MainAppBar";
import MainBottomNavigation from "./components/MainBottomNavigation";

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
      <div className="App" style={{ backgroundImage: `url(${ backgroundImage })`, height: "100vh" }}>
        <header className="App-header">
          <ThemeProvider theme={ appTheme }>
            <CssBaseline enableColorScheme />
            <>
              {(showAppBar) && <MainAppBar></MainAppBar>}
              {(showBottomNavigation) && <MainBottomNavigation></MainBottomNavigation>}
              <Routes>
                <Route exact path={"/"} element= {!currentUser && <Login></Login>} />
                <Route exact path={"/dashboard"} element={<DashBoard />} />
                <Route exact path={"/deposit"} element={<DepositSummary />} />
                <Route exact path={"/view-transaction-history"} element={<TransactionHistory />} />
                <Route exact path={"/account-details/:id"} element={<AccountDetails />} />
                <Route exact path={"/cashflow/:id"} element={<CashFlow />} />
              </Routes>
            </>
          </ThemeProvider>
        </header>
      </div>

    )  
}

export default App;
