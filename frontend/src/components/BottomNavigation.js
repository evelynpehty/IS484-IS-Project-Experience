import * as React from 'react';
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

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
        <Box sx={{ width: 500 }}>
            <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
            >
                <BottomNavigationAction component={ Link } to={"/dashboard"} label="Dashboard" icon={value === 0 ? <DashboardRed /> : <Dashboard />} />
                <BottomNavigationAction component={ Link } to={"/deposit"} label="Savings" icon={value === 1 ? <SavingsRed /> : <Savings /> } />
                <BottomNavigationAction label="Loans" icon={value === 2 ? <LoansRed /> : <Loans /> } />
                <BottomNavigationAction label="Investments" icon={value === 3 ? <InvestmentsRed /> : <Investments /> } />
            </BottomNavigation>
            </Paper>
        </Box>

        
  );
}