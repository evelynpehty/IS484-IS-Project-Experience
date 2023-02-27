import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from '@mui/material/Unstable_Grid2';
import { Container, TextField, Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Stack } from '@mui/system';

import MainAppBar from "../../components/MainAppBar";
import MainBottomNavigation from "../../components/MainBottomNavigation";

import "../../styles/main.css";

import moment from 'moment';


function DepositSummary() {

    //get list of deposit account from state
    const { depositList } = useSelector((state) => state.deposit);
    const { transactionHistoryList } = useSelector((state) => state.deposit);


    /*var newArray = transactionHistoryList.filter(function (el)
    {
        //var transactionDate = new Date(el.transactionDate);
        const transactionDate = moment(el.transactionDate).format("DD-MM-YYYY")
        const newTransactionDate = moment(transactionDate, "DD-MM-YYYY")
        const startDate = moment("15-01-2023", "DD-MM-YYYY")
        const endDate = moment("01-02-2023","DD-MM-YYYY")
       
        return newTransactionDate.isBetween(startDate, endDate,undefined,[]) 
        //return transactionDate <= endDate && transactionDate >= startDate
    }
    );
    console.log(newArray);*/

    
    /*var newArray = depositList.filter(function (el)
    {
      return el.DepositAccountID === "4567"
    }
    );
    console.log(newArray);*/

    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <Box sx={{ mt: 15, mb: 15 }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1">Deposit Accounts</Typography>
                        <Button variant="contained">Manage Accounts</Button>
                    </Grid>
                </Box>

                {/*display list of deposit*/}
                {depositList.map((value,index)=>{
                        return <p key={index}>{value.AvailBalance}</p>
                  }) 
                }

            </Container>
        
    
  
        </React.Fragment>
    );
}

export default DepositSummary;