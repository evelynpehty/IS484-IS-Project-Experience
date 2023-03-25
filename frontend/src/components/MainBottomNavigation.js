import React, { useState, useEffect, useLayoutEffect  } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Paper, Box, BottomNavigation, BottomNavigationAction } from '@mui/material';

import { ReactComponent as Dashboard } from "../assets/icons/dashboard.svg";
import { ReactComponent as DashboardRed } from "../assets/icons/dashboard-red.svg";
import { ReactComponent as Savings } from "../assets/icons/savings.svg";
import { ReactComponent as SavingsRed } from "../assets/icons/savings-red.svg";
import { ReactComponent as Loans } from "../assets/icons/loans.svg";
import { ReactComponent as LoansRed } from "../assets/icons/loans-red.svg";
import { ReactComponent as Investments } from "../assets/icons/investments.svg";
import { ReactComponent as InvestmentsRed } from "../assets/icons/investments-red.svg";
import { Link } from "react-router-dom";


import "../styles/main.css";

export default function MainBottomNavigation() {
  const [value, setValue] = React.useState(0);

  let location = useLocation();

  const [routeArr, setRouteArr] = useState(["dashboard", "deposit", "loan", "securities"]);
  const [urlPage, setUrlPage] = useState("");

  useLayoutEffect (() => {
    if(location.pathname.substring(1).split("/")[0].includes("deposit")){
        setUrlPage("deposit")
    }
    if(location.pathname.substring(1).split("/")[0].includes("dashboard")){
        setUrlPage("dashboard")
    }
    if(location.pathname.substring(1).split("/")[0].includes("loan")){
        setUrlPage("loan")
    }
    if(location.pathname.substring(1).split("/")[0].includes("securities")){
        setUrlPage("securities")
    }
  }, [location]);
  

  return (
        <Box sx={{ width: 500 }}>
            <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value= { routeArr.indexOf(urlPage) }
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
            >
                <BottomNavigationAction sx={{ "& .Mui-selected": { color: "#E60000", fontWeight: "bold"} }} component={ Link } to={"/dashboard"} label="Dashboard" icon={routeArr.indexOf(urlPage) === 0 ? <DashboardRed /> : <Dashboard />} />
                <BottomNavigationAction sx={{ "& .Mui-selected": { color: "#E60000", fontWeight: "bold"} }} component={ Link } to={"/deposit"} label="Savings" icon={routeArr.indexOf(urlPage) === 1 ? <SavingsRed /> : <Savings /> } />
                <BottomNavigationAction sx={{ "& .Mui-selected": { color: "#E60000", fontWeight: "bold"} }} component={ Link } to={"/loan"} label="Loans" icon={routeArr.indexOf(urlPage) === 2 ? <LoansRed /> : <Loans /> } />
                <BottomNavigationAction sx={{ "& .Mui-selected": { color: "#E60000", fontWeight: "bold"} }} component={ Link } to={"/securities"} label="Securities" icon={routeArr.indexOf(urlPage) === 3 ? <InvestmentsRed /> : <Investments /> } />
            </BottomNavigation>
            </Paper>
        </Box>

        
  );
}