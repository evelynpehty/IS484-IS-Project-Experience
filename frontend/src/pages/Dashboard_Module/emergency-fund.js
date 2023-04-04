import React from "react";
import { useState, useEffect } from "react";
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
    PieChart, 
    Pie,
    Label
  } from "recharts";
import { DensityMedium } from "@mui/icons-material";

function EmergencyFund() {
    // Styling 
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

    const { depositList } = useSelector((state) => state.deposit);
    const { transactionHistoryList } = useSelector((state) => state.deposit);

    const [selectedMonth, setSelectedMonth] = useState("");
    const [totalIncome, setTotalIncome] = useState("");
    const [totalExpense, setTotalExpense] = useState("");
    const [netCashFlow, setNetCashflow] = useState("");
    const [type, setType] = useState("");
    const [finalData, setFinalData] = useState([]);

    console.log(depositList)
    console.log(transactionHistoryList)

    useEffect(() => {
        // DATA
        var final_data = []

        // X-Axis
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        var current_Year = moment().year()
        const currentMonth = moment().month()
        const sixMonthAgo = moment().subtract(5, 'months').format("MMM")
        
        const indexof = months.indexOf(sixMonthAgo)
        const limit = indexof + 5

        for (let i = indexof; i <= limit; i++) {
            var y = current_Year
            if((i%12) > currentMonth){
                y = current_Year - 1
            }
            const label = months[i%12] + " " + y
            var temp_obj = {"Name": label, "Income": 0, "Expense": 0, "Net": 0}
            final_data.push(temp_obj)
        }
        
        var didArray = []
        depositList.forEach(ditem => {
            didArray.push(ditem.DepositAccountID)
            const id = ditem.DepositAccountID
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
        
                final_data.forEach(obj =>{
                    if (obj.Name === temp_str){
                        obj.Expense += element.transactionAmount
                    }
                })
            });
        
            income_transaction_data.forEach(element => {
                const yearNum = moment(element.transactionDate).year()
                const monthNum = moment(element.transactionDate).month() + 1
                var monthName = moment(monthNum, 'MM').format('MMM');
        
                const temp_str = monthName + " " + yearNum
        
                final_data.forEach(obj =>{
                    if (obj.Name === temp_str){
                        obj.Income += element.transactionAmount
                    }
                })
            });


        });

        // Calculate Net
        final_data.forEach(item => {
            item["Net"] = item["Income"] - item["Expense"]
        });

        setFinalData(final_data)
        
       
    }, []);

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

      const handleViewSavings = () => {

      }
    

    return (
        <>
        <SecondaryAppBar link="/dashboard" text="Dashboard" />
        <Container maxWidth="lg">
            <Box sx={{ pt: 10, pb: 10 }}>
                <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                    <Typography style={ styles.label } variant="h6">Emergency Fund</Typography>
                    <WhiteReusableButton function={handleViewSavings} buttonText="VIEW SAVINGS" />
                </Grid>
                

                {/* PIE CHART */}



                {/* YOUR SAVINGS & SAVINGS NEEDED */}

               
                {/* Consolidated Cashflow */}
                <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                    <Typography style={ styles.label } variant="h6">Consolidated Cashflow</Typography>
                </Grid>

                {/* Visualization */}
                <Card style={ styles.card2 } elevation={ 4 }>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart width={730} height={250} data={finalData}
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
            </Box>
        </Container>
        </>
    );
    
}

export default EmergencyFund;