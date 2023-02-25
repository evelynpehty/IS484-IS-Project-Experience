import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//pages
import Login from "./pages/login";
import DashBoard from './pages/dashboard.js'
import Deposit from './pages/deposit.js'

import { clearMessage } from "./actions/message";

//navigation components
import AppBar from './components/AppBar';
import BottomNavigation from './components/BottomNavigation';

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
        {(showAppBar) && <AppBar></AppBar>}
        {(showBottomNavigation) && <BottomNavigation></BottomNavigation>}
        <Routes>
          <Route exact path={"/"} element= {!currentUser && <Login></Login>} />
          <Route exact path={"/dashboard"} element={<DashBoard />} />
          <Route exact path={"/deposit"} element={<Deposit />} />
        </Routes>
      </>
    )  
}

export default App;
