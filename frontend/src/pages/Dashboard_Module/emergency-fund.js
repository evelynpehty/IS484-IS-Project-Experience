// Packages
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import moment from "moment";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Card, CardContent, Typography, AppBar, Toolbar, SvgIcon, useTheme, styled, tooltipClasses, Paper, ClickAwayListener } from "@mui/material";

// Assets (Images & Icons)
import { ReactComponent as InfoIcon } from "../../assets/icons/info-circle-line.svg";
import { ReactComponent as GreenOval } from "../../assets/icons/green-oval.svg";
import { ReactComponent as RedOval } from "../../assets/icons/red-oval.svg";

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
    Cell,
    Label,
    LabelList
  } from "recharts";

function EmergencyFund() {
    // Styling 
    const theme = useTheme();

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
            paddingBottom: "1px"
        },

        card2: {
            marginBottom: "24px",
            borderRadius: "15px",
            padding: 8,
            height:"100%"
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
        },
        
        GreenGradientText: {
            background: "linear-gradient(to top right, #109878, #8AB8B2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        },

        RedGradientText: {
            background: "linear-gradient(to top right, #E60000, #E69F9F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        },

        wrapper: {
            position: "relative",
            width: "358px", 
            height: "320px"
        },

        centerContent: {
            position: "absolute",
            top: "65%",
            left: "47%",
            zIndex: 0,
            transform: "translate(-42%, -50%)",
            borderRadius: "50%",
            width: "50%",
            height: "50%",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        },

        popoverContent: {
            position: "absolute",
            top: "20%",
            left: "47%",
            zIndex: 0,
            transform: "translate(-42%, -50%)",
            borderRadius: "15px",
            width: "250px",
            justifyContent: "center",
            alignItems: "center",
            padding: "14px"
        }

    }

    const COLORS = [
        { start: "rgba(255,147,100,0.3)", end: "rgba(252,51,51,0.3)" },
        { start: "#109878", end: "#8AB8B2" },
    ];

    const { depositList } = useSelector((state) => state.deposit);
    const { transactionHistoryList } = useSelector((state) => state.deposit);

    const { emergencySaving } = useSelector((state) => state.dashboard);

    const [selectedMonth, setSelectedMonth] = useState("");
    const [totalIncome, setTotalIncome] = useState("");
    const [totalExpense, setTotalExpense] = useState("");
    const [netCashFlow, setNetCashflow] = useState("");
    const [type, setType] = useState("");

    // AREA CHART
    const [finalData, setFinalData] = useState([]); 

    // PIE CHART
    const [pieData, setPieData] = useState([]); 

    const [totalSavings, setTotalSavings] = useState(""); // DISPLAY THIS AS YOUR SAVINGS
    const [savingsNeeded, setSavingsNeeded] = useState(""); //DISPLAY THIS AS SAVINGS NEEDED
    const [emergencySavings, setEmergencySavings] = useState(emergencySaving["six_month_total_expense"]);

    // console.log(depositList)
    // console.log(transactionHistoryList)
    // console.log(emergencySaving)

    useEffect(() => {
        // AREA CHART DATA
        var final_data = []

        var temp_savings = 0

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
        
      
        depositList.forEach(ditem => {
            temp_savings += ditem.AvailBalance
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

        const sNeeded = emergencySavings-temp_savings

         // PIE CHART DATA
         const tempPieData = [
            {
                "name": "Savings Needed",
                "value": sNeeded,
            },
            {
                "name": "Your Savings",
                "value": temp_savings,
            },
        ];
        setPieData(tempPieData)
        setFinalData(final_data)
        setTotalSavings(temp_savings)
        setSavingsNeeded(sNeeded)
        
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

    const navigate = useNavigate();
    const handleViewSavings = () => {
        navigate("/deposit");
    }

    const [show, setShow] = useState(false);
    function handleTooltip() {
        setShow(prev => !prev);
    }

    console.log(pieData)
    
    return (
        <React.Fragment>
            <SecondaryAppBar link="/dashboard" text="Dashboard" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Emergency Fund</Typography>
                        <WhiteReusableButton function={ handleViewSavings } buttonText="VIEW SAVINGS" />
                    </Grid>

                    {/* PIE CHART */}
                    <div style={ styles.wrapper }>
                        <PieChart width={358} height={300}>
                            <defs>
                                {pieData.map((entry, index) => (
                                    <linearGradient id={`myGradient${index}`}>
                                    <stop
                                        offset="0%"
                                        stopColor={COLORS[index % COLORS.length].start}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor={COLORS[index % COLORS.length].end}
                                    />
                                    </linearGradient>
                                ))}
                            </defs>
                            
                            <Pie 
                                data={pieData} 
                                dataKey="value" 
                                nameKey="name" 
                                innerRadius={80} 
                                outerRadius={120} 
                                >
    
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />
                            ))}
                            </Pie>
                            <g onClick={ handleTooltip }>
                                <text x="47%" y="45%" dy={8} textAnchor="middle" fill="#7D8895" fontWeight="bold" fontSize="16px">
                                    Ideal Amount
                                </text>
                                <InfoIcon x="62%" y="43%"  />
                                <text x="50%" y="55%" dy={8} textAnchor="middle" fill="#303841" fontWeight="bold" fontSize="16px">
                                    S${ emergencySavings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
                                </text>
                            </g>
                        </PieChart>
                        { show && 
                            <Paper elevation={2} style={ styles.popoverContent }>
                                <Typography style={ styles.RedGradientText } sx={{ fontSize: 10, fontWeight: "bold" }}>How is the Ideal Amount calculated?</Typography>
                                <Typography sx={{ fontSize: 10 }} color={ theme.palette.secondary.main }>Based on your average monthly expenses, Monetari calculates a recommended amount 6 times your monthly expenses to be set aside in cash savings for emergencies </Typography>
                            </Paper>
                        }
                    </div>
                    
                    {/* YOUR SAVINGS & SAVINGS NEEDED */}
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={6}>
                            <Card style={styles.card2}>
                                <CardContent style={ styles.cardContent }>         
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold", mb:1 }} color={ theme.palette.secondary.main }>
                                        <GreenOval/> Your Savings
                                    </Typography>
                                    <Typography sx={{ fontSize: 20, fontWeight:"bold",mb:1 }} style={styles.GreenGradientText} color={ theme.palette.secondary.main }>
                                        {`$${totalSavings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                    </Typography>
                                    <Typography sx={{ fontSize: 10 }} color={ theme.palette.secondary.main }>
                                        Your total accessible savings in deposit accounts
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card style={styles.card2}>
                                <CardContent style={ styles.cardContent }>         
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold", mb:1 }} color={ theme.palette.secondary.main }>
                                        <RedOval/> Savings Needed
                                    </Typography>
                                    <Typography sx={{ fontSize: 20, fontWeight:"bold", mb:1 }} style={styles.RedGradientText}>
                                        {`$${savingsNeeded.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                    </Typography>
                                    <Typography sx={{ fontSize: 10 }} color={ theme.palette.secondary.main }>
                                        The amount needed to reach the ideal savings amount                              
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    
                    
                    
                    {/* Consolidated Cashflow */}
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center" sx={{mt:4}}>
                        <Typography style={ styles.label } variant="h6">Consolidated Cashflow</Typography>
                    </Grid>

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
                                                SGD ${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </Typography>
                                            <Typography sx={{ fontSize: 10 }} color="#9197A4">
                                                For month of {selectedMonth}
                                            </Typography>
                                        </Grid>
                                        <Grid xs={4}>
                                            <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                                NET CASH FLOW
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }} style={ netCashFlow < 0 ? styles.negative : styles.positive }>
                                                SGD ${netCashFlow.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </Typography>
                                            <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                                TOTAL EXPENSES
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, fontWeight:"bold" }} color="#E60000">
                                                SGD ${totalExpense.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                                                SGD ${totalExpense.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                                                SGD ${netCashFlow.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </Typography>
                                            <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                                TOTAL INCOME
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, fontWeight:"bold" }} color="#3BB537">
                                                SGD ${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }

                            </CardContent>} 
                    </Card>
                </Box>
            </Container>
        </React.Fragment>
    );
    
}

export default EmergencyFund;