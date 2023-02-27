import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Pages
import Login from "./pages/Account_Module/login";
import DashBoard from './pages/dashboard.js'
import DepositSummary from './pages/Deposit_Module/deposit-summary.js'

import { clearMessage } from "./actions/message";

// Navigation components
import MainAppBar from './components/MainAppBar';
import MainBottomNavigation from './components/MainBottomNavigation';

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
      <>
        {(showAppBar) && <MainAppBar></MainAppBar>}
        {(showBottomNavigation) && <MainBottomNavigation></MainBottomNavigation>}
        <Routes>
          <Route exact path={"/"} element= {!currentUser && <Login></Login>} />
          <Route exact path={"/dashboard"} element={<DashBoard />} />
          <Route exact path={"/deposit"} element={<DepositSummary />} />
        </Routes>
      </>
    )  
}

export default App;
