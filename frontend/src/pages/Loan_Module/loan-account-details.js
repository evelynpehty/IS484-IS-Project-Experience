// Packages
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { Link, useParams } from "react-router-dom";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Card, CardContent, Typography, Chip, useTheme } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";

// Assets (Images & Icons)
import { ReactComponent as BellIcon } from "../../assets/icons/bell-red.svg";

// Recharts
import {
    AreaChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
  } from "recharts";

function LoanAccountDetails() {
    // Styling for Loan Account Details Page
    const theme = useTheme()
    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: "#4B4948",
            fontSize: "16px"
        },

        chip: {
            fontWeight: "bold",
            fontSize: "12px",
            color: theme.palette.neutral.main,
            paddingLeft: "8px",
            paddingRight: "8px",
            background: "linear-gradient(to top right, #FF9364, #F25F33)",
        },

        card: {
            background: "linear-gradient(to top right, #E69F9F, #E60000)",
            marginBottom: "24px",
            borderRadius: "15px",
            padding: 10
        },

        cardContent: {
            paddingBottom: "16px"
        },

        card2: {
            marginBottom: "24px",
            borderRadius: "15px",
            padding: 10
        },

        cardContent2: {
            paddingBottom: "16px",
            borderBottom: "1px dashed #BFBFBF"
        },

        positive: {
            color: "#3BB537"
        },

        negative: {
            color: "#E60000"
        }
    }

    // Fetch Loan Account
    const navigate = useNavigate();
    const { id } = useParams()
    const { loanList } = useSelector((state) => state.loan);
    const loan_DisplayArray = loanList.accountInformation
    const loan_item = loan_DisplayArray.filter(function (el)
    {
        return el.LoanAccountID === id
    })
    console.log(loanList)

    // Fetch Loan Transaction Repayment History
    const { loan_transactionHistoryList } = useSelector((state) => state.loan);
    const transaction_item = loan_transactionHistoryList.filter(function (el)
    {
      return el.accountFrom === id || el.accountTo === id
    })

    // Get 3 recent transactions
    var recent_transactions = transaction_item.slice(0, 3)
    console.log(recent_transactions)

    // Navigation to View All Loan Repayment Transaction
    const handleViewAll = () => {
        navigate('/view-loan-transaction-history', {replace: true , state: { transaction_item: transaction_item, id: id } })  
    }

    // Testing Data
    const data = [
        {
          "name": "Page A",
          "uv": 4000,
          "amt": 2400
        },
        {
          "name": "Page B",
          "uv": 3000,
          "amt": 2210
        },
        {
          "name": "Page C",
          "uv": 2000,
          "amt": 2290
        },
        {
          "name": "Page D",
          "uv": 1000,
          "amt": 2000
        },
        {
          "name": "Page E",
          "uv": 0,
          "amt": 2181
        }
      ]

    return (
        <React.Fragment>
            <SecondaryAppBar link="/loan" text="All Loans" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    <Card style={ styles.card }>
                        <CardContent style={ styles.cardContent }>
                            <Typography sx={{ fontSize: 12 }} color="white">
                                { loan_item[0].ProductName }
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color="white">
                                { loan_item[0].AccountName }
                            </Typography>
                            <Chip style={ styles.chip } label={ `${loan_item[0].InterestRate} %` } />
                            <Typography sx={{ fontSize: 12 }} textAlign="end" color="white">
                                Outstanding Amount
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="white">
                                SGD ${ loan_item[0].LoanBalance.toLocaleString("en-US") }
                            </Typography>
                        </CardContent>
                    </Card>

                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Debt Paydown</Typography>
                        <WhiteReusableButton icon={ <BellIcon /> } buttonText="REMINDERS" />
                    </Grid>

                    <Card style={ styles.card2 } elevation={ 4 }>
                        <ResponsiveContainer width="100%" height={300}>
                        <AreaChart width={730} height={250} data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="step" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                        </ResponsiveContainer>
                    </Card>

                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Repayment History</Typography>
                        <WhiteReusableButton function={ handleViewAll } buttonText="VIEW ALL" />
                    </Grid>

                    <Card style={ styles.card2 } elevation={ 4 }>
                        { recent_transactions.map (( value, index ) => {
                            return (
                                <CardContent style={ (index === recent_transactions.length - 1) ? styles.cardContent : styles.cardContent2 } key={ index }>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color="#4B4948">
                                            {value.transactionID}
                                        </Typography>
                                        <Typography style={ (value.accountTo === id) ? styles.negative : styles.positive } sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="#4B4948">
                                            {(value.accountTo === id) ? `- SGD $${ value.transactionAmount.toLocaleString("en-US") }` : `SGD $${ value.transactionAmount.toLocaleString("en-US") }` }
                                        </Typography>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography sx={{ fontSize: 12 }} color="#9197A4">
                                            Bills Payment: BIR
                                        </Typography>
                                        <Typography sx={{ fontSize: 12 }} textAlign="end" color="#9197A4">
                                            { value.transactionDate.replace(" GMT", "") }
                                        </Typography>
                                    </Grid>
                                </CardContent>
                            )
                        })}
                    </Card>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default LoanAccountDetails;