import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import moment from "moment";
import { Link } from "react-router-dom";

import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Card, CardContent, Typography, AppBar, Toolbar } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";

import {
    AreaChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
  } from "recharts";

function AccountDetails() {
    // Styling for Account Details Page
    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: "#4B4948",
            fontSize: "16px"
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

    var months = ["Jan","Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var current_Year = moment().year()
    const currentMonth = moment().month()
    const sixMonthAgo = moment().subtract(5, 'months').format("MMM")

   // var monthRange = []
    var monthRangeYear = []
    const indexof = months.indexOf(sixMonthAgo)
    const limit = indexof + 5

    for (let i = indexof; i <= limit; i++) {
        var y = current_Year
        if((i%12) > currentMonth){
            y = current_Year - 1
        }
        const label = months[i%12] + " " + y
        //monthRange.push(months[i%12])
        monthRangeYear.push(label)
    }
    const income_data = []
    const expense_data = []
    monthRangeYear.forEach(month => {
        var currentobj = {}
        currentobj["x"] = month
        currentobj["y"] = 0
        expense_data.push(currentobj)
        income_data.push( Object.assign({},currentobj))
    });

    const navigate = useNavigate();
    const { id } = useParams()
    const { depositList } = useSelector((state) => state.deposit);
    const { transactionHistoryList } = useSelector((state) => state.deposit);

    const [selectedMonth, setSelectedMonth] = useState("");
    const [totalIncome, setTotalIncome] = useState("");
    const [totalExpense, setTotalExpense] = useState("");
    const [netCashFlow, setNetCashflow] = useState("");
    const [type, setType] = useState("");

    const deposit_item = depositList.filter(function (el)
    {
      return el.DepositAccountID === id
    })

    const transaction_item = transactionHistoryList.filter(function (el)
    {
      return el.accountFrom === id || el.accountTo === id
    })

    //income 
    const income_transaction_data = transactionHistoryList.filter(function (el)
    {
      return el.accountTo === id 
    })

    //expenses 
    const expenses_transaction_item = transactionHistoryList.filter(function (el)
    {
      return el.accountFrom === id 
    })

    expenses_transaction_item.forEach(element => {
        const yearNum = moment(element.transactionDate).year()
        const monthNum = moment(element.transactionDate).month() + 1
        var monthName = moment(monthNum, 'MM').format('MMM');

        const temp_str = monthName + " " + yearNum

        expense_data.forEach(obj =>{
            if (obj.x === temp_str){
                obj.y += element.transactionAmount
            }
        })
        // const newTransactionDate = moment(transactionDate, "DD-MM-YYYY")
    });

    income_transaction_data.forEach(element => {
        const yearNum = moment(element.transactionDate).year()
        const monthNum = moment(element.transactionDate).month() + 1
        var monthName = moment(monthNum, 'MM').format('MMM');

        const temp_str = monthName + " " + yearNum

        income_data.forEach(obj =>{
            if (obj.x === temp_str){
                obj.y += element.transactionAmount
            }
        })
    });

    const final_data = []

    for(let ll = 0; ll<6; ll++){
        var temp_obj = {"Name": "", "Income": 0, "Expense": 0, "Net": 0}
        temp_obj["Name"] = income_data[ll].x
        temp_obj["Income"] = income_data[ll].y
        temp_obj["Expense"] = expense_data[ll].y
        temp_obj["Net"] = temp_obj["Income"] - temp_obj["Expense"]
        final_data.push(temp_obj)
    }
    console.log(final_data)

    var recent_transactions = transaction_item.slice(0, 3)

    const handleViewAll = () => {
        navigate('/view-transaction-history', {replace: true , state: { transaction_item: transaction_item, id: id } })  
    }

    const handleExpand = () => {
        navigate('/cashflow', {replace: true , state: { transaction_item: transaction_item, id: id } })  

    }

    const handleIncome = (event,payload) => {
       const datapoint = payload.payload
       setSelectedMonth(datapoint["Name"])
       setTotalIncome(datapoint["Income"])
       setTotalExpense(datapoint["Expense"])
       setNetCashflow(datapoint["Net"])
       setType("Income")
    }

    const handleExpense = (event,payload) => {
        const datapoint = payload.payload
        setSelectedMonth(datapoint["Name"])
        setTotalIncome(datapoint["Income"])
        setTotalExpense(datapoint["Expense"])
        setNetCashflow(datapoint["Net"])
        setType("Expense")
     }

    return (
        <React.Fragment>
            <SecondaryAppBar link="/deposit" text="All Accounts" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    <Card style={ styles.card }>
                        <CardContent style={ styles.cardContent }>
                            <Typography sx={{ fontSize: 12 }} color="white">
                                UBS
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color="white">
                                Savings Account #1
                            </Typography>
                            <Typography sx={{ fontSize: 12 }} color="white">
                                { deposit_item[0].DepositAccountID.substr(0, 4) } { deposit_item[0].DepositAccountID.substr(4, 4) } { deposit_item[0].DepositAccountID.substr(8, 4) }
                            </Typography>
                            <Typography sx={{ fontSize: 12 }} textAlign="end" color="white">
                                Available Balance
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="white">
                                SGD ${ deposit_item[0].AvailBalance.toLocaleString("en-US") }
                            </Typography>
                        </CardContent>
                    </Card>

                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Cash Flow</Typography>
                        <WhiteReusableButton function={handleExpand} buttonText="EXPAND" />
                    </Grid>


                    <Card style={ styles.card2 } elevation={ 4 }>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart width={730} height={250} data={final_data}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }} >
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#109878" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#109878" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E60000" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#E60000" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="Name" />
                                <YAxis tickCount={3}/>
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area type="monotone" stackId="1" dataKey="Income" stroke="#109878" strokeWidth="5" fillOpacity={1} fill="url(#colorUv)" activeDot={{ r:8, onClick: handleIncome }} />
                                <Area type="monotone"  dataKey="Expense" stroke="#E60000" strokeWidth="5" fillOpacity={1} fill="url(#colorPv)" activeDot={{ r:8, onClick: handleExpense }} />
                            </AreaChart>
                        </ResponsiveContainer>
                       
                       {selectedMonth!=="" && 
                       <CardContent style={ styles.cardContent }>
                            {type==="Income" &&  
                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid xs={8}>
                                        <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                            TOTAL INCOME
                                        </Typography>
                                        <Typography sx={{ fontSize: 18, fontWeight:"bold" }} color="#3BB537">
                                            SGD ${totalIncome.toLocaleString("en-US")}
                                        </Typography>
                                        <Typography sx={{ fontSize: 10 }} color="#9197A4">
                                            For month of {selectedMonth}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                            NET CASH FLOW
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }} style={ netCashFlow<0 ? styles.negative : styles.positive }>
                                            SGD ${netCashFlow.toLocaleString("en-US")}
                                        </Typography>
                                        <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                            TOTAL EXPENSES
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight:"bold" }} color="#E60000">
                                            SGD ${totalExpense.toLocaleString("en-US")}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            }

                            {type==="Expense" &&  
                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid xs={8}>
                                        <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                            TOTAL EXPENSE
                                        </Typography>
                                        <Typography sx={{ fontSize: 18, fontWeight:"bold" }} color="#E60000">
                                            SGD ${totalExpense.toLocaleString("en-US")}
                                        </Typography>
                                        <Typography sx={{ fontSize: 10 }} color="#9197A4">
                                            For month of {selectedMonth}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                            NET CASH FLOW
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }} style={ netCashFlow<0 ? styles.negative : styles.positive }>
                                            SGD ${netCashFlow.toLocaleString("en-US")}
                                        </Typography>
                                        <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                            TOTAL INCOME
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight:"bold" }} color="#3BB537">
                                            SGD ${totalIncome.toLocaleString("en-US")}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            }

                        </CardContent>} 
                    </Card>

                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Recent Transactions</Typography>
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
                                        <Typography style={ (value.accountFrom === id) ? styles.negative : styles.positive } sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="#4B4948">
                                            {(value.accountFrom === id) ? `- SGD $${ value.transactionAmount.toLocaleString("en-US") }` : `SGD $${ value.transactionAmount.toLocaleString("en-US") }` }
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
    );
}

export default AccountDetails;