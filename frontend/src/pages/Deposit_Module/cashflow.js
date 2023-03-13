// Packages
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Card, CardContent, Typography, AppBar, Toolbar, Tab, Tabs } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar"
import WhiteReusableButton from "../../components/WhiteButton"

// Assets (Images & Icons)
import { ReactComponent as Arrow } from "../../assets/icons/arrow-red.svg";
import { ReactComponent as UpWhite } from "../../assets/icons/up-white.svg";
import { ReactComponent as UpBlack } from "../../assets/icons/up-black.svg";
import { ReactComponent as DownWhite } from "../../assets/icons/down-white.svg";
import { ReactComponent as DownBlack } from "../../assets/icons/down-black.svg";
import { ReactComponent as MenuWhite } from "../../assets/icons/menu-white.svg";
import { ReactComponent as MenuBlack } from "../../assets/icons/menu-black.svg";

import {
    AreaChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
  } from "recharts";

function CashFlow() {
    const styles = {
        grid: {
            marginBottom: "24px",
            paddingRight: "16px",
            paddingLeft: "16px"
        },

        grid2: {
            marginBottom: "16px"
        },

        label: {
            fontWeight: "bold",
            color: "#4B4948",
            fontSize: "16px"
        },

        button: {
            paddingTop: "8px",
            paddingBottom: "8px",
            borderRadius: "30px",
            fontSize: "12px",
            color: "#4B4948",
            backgroundColor: "#E5E7EC"
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
            marginTop: "24px",
            marginBottom: "24px",
            marginLeft: "16px",
            marginRight: "16px",
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
        },
        
        default: {
            background: "#FFFFFF",
            color: "#000000"
            
        }
    }

    const {state} = useLocation();
    const { transaction_item, id } = state;

    function filter_transaction_item(value){
        var result;
        if(value === "All"){
            result = transaction_item.filter(function (el)
            {
            return el.accountFrom === id || el.accountTo === id
            })
        }
        else if(value === "Income"){
            result = transaction_item.filter(function (el)
            {
            return el.accountTo === id
            })
        } 
        else if(value === "Expense"){
            result = transaction_item.filter(function (el)
            {
            return el.accountFrom === id
            })
        }
        return result.slice(0, 3)

    }


    const [value, setValue] = React.useState('Monthly');
    const [TransDisplay, setTransDisplay] = React.useState(filter_transaction_item("All"))
    const [clicked, setClicked] = React.useState("All")
    
    const [finalData, setFinalData] = React.useState([])
    const [selectedMonth, setSelectedMonth] = useState("");
    const [totalIncome, setTotalIncome] = useState("");
    const [totalExpense, setTotalExpense] = useState("");
    const [netCashFlow, setNetCashflow] = useState("");
    const [type, setType] = useState("");

    //income 
    const income_transaction_data = transaction_item.filter(function (el)
    {
        return el.accountTo === id 
    })

    //expenses 
    const expenses_transaction_item = transaction_item.filter(function (el)
    {
        return el.accountFrom === id 
    })

    function ByMonthData(){
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
            // monthRange.push(months[i%12])
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

        setFinalData(final_data)
    }   

    function ByYearData(){
        var current_Year = moment().year()
        var yearRange = []
        for(let x = 6; x >= 1; x--){
            yearRange.push(current_Year.toString())
            current_Year -= 1
        }

        yearRange = yearRange.reverse()
    
        const income_data = []
        const expense_data = []

        yearRange.forEach(yy => {
            var currentobj = {}
            currentobj["x"] = yy
            currentobj["y"] = 0
            expense_data.push(currentobj)
            income_data.push( Object.assign({},currentobj))
        });

    

        expenses_transaction_item.forEach(element => {
            const yearNum = moment(element.transactionDate).year()
            
            expense_data.forEach(obj =>{
                if (obj.x === yearNum){
                    obj.y += element.transactionAmount
                }
            })
        });

        income_transaction_data.forEach(element => {
            const yearNum = moment(element.transactionDate).year().toString()

            income_data.forEach(obj =>{
                if (obj.x === yearNum){
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

        setFinalData(final_data)
    }
    
    useEffect(() => {
        ByMonthData()
    }, []);
       
    function handleClick(select) {
        setClicked(select)
        setTransDisplay(filter_transaction_item(select))
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelectedMonth("")
        setTotalIncome("")
        setTotalExpense("")
        setNetCashflow("")
        setType("")

        if(newValue==="Monthly"){
            ByMonthData()
        } else {
            ByYearData()
        }
    };

    const navigate = useNavigate();
    const handleViewAllTrans = () =>{
        navigate('/view-transaction-history', {replace: true , state: { transaction_item: transaction_item, id: id, selectedFilter: clicked } })  
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
            <SecondaryAppBar link={ `/account-details/${id}` } text="Account Overview" />
            <Container maxWidth="lg" sx={{ p: 0 }}>
                <Box sx={{ pt: 10, pb: 10 }}>
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Cash Flow</Typography>
                        <WhiteReusableButton buttonText="VIEW INSIGHTS" />
                    </Grid>
       
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                        value={ value } 
                        onChange={ handleChange } 
                        aria-label="basic tabs example"
                        variant="fullWidth"
                        centered
                        sx={{ 
                            "& .MuiTab-root.Mui-selected": { color: "#4B4948", fontWeight: "bold" },
                            "& .MuiTabs-indicator": { backgroundColor: "#4B4948" }
                        }}
                        >
                            <Tab value="Monthly" label="By Month" />
                            <Tab value="Yearly" label="By Year" />
                        </Tabs>
                    </Box>
                    <Card style={ styles.card2 } elevation={ 4 }>

                        {/* Visualization */}
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
                                            {value==="Monthly" ? "For month of " + selectedMonth : "For year of " + selectedMonth}
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
                                            {value==="Monthly" ? "For month of " + selectedMonth : "For year of " + selectedMonth}
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

                    <Box style={{ padding: 20 }}>
                        <Grid container spacing={ 2 } style={ styles.grid2 } direction="row" justifyContent="space-between" alignItems="center">
                            <Grid xs={4}>
                                <Card elevation={ 4 } onClick={() => handleClick("All")} sx ={{background: clicked === "All" ? "#BFBFBF" : styles.default }}>
                                    <CardContent id="transactions" sx={{ textAlign: "center" }}>
                                        <Typography sx={{ color: clicked === "All" ? "#FFFFFF" : styles.default.color,fontSize: 14, fontWeight: "bold" }} gutterBottom>
                                        All
                                        </Typography>
                                        {clicked !== "All" && <MenuBlack />}
                                        {clicked === "All" && <MenuWhite />}
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid xs={4}>
                                <Card elevation={ 4 } onClick={() => handleClick("Income")} sx ={{background: clicked === "Income" ? "linear-gradient(to top right, #FFFFFF, #109878)" : styles.default }}>
                                    <CardContent sx={{ textAlign: "center" }}>
                                        <Typography sx={{color: clicked === "Income" ? "#FFFFFF" : styles.default.color, fontSize: 14, fontWeight: "bold" }} gutterBottom>
                                        Income
                                        </Typography>
                            
                                        {clicked !== "Income" && <UpBlack />}
                                        {clicked === "Income" && <UpWhite />}
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid xs={4}>
                                <Card elevation={ 4 } onClick={() => handleClick("Expense")} sx ={{background: clicked === "Expense" ? "linear-gradient(to top right, #FFFFFF, #E60000)" : styles.default }}>
                                    <CardContent sx={{ textAlign: "center" }}>
                                        <Typography sx={{color: clicked === "Expense" ? "#FFFFFF" : styles.default.color, fontSize: 14, fontWeight: "bold" }} gutterBottom>
                                        Expenses
                                        </Typography>
                                        {clicked !== "Expense" && <DownBlack />}
                                        {clicked === "Expense" && <DownWhite />}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>

                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">{clicked === "All" ? "Transactions" : clicked}</Typography>
                        <WhiteReusableButton function={ handleViewAllTrans } buttonText="VIEW ALL" />
                    </Grid>
                    
                    <Card style={ styles.card2 } elevation={ 4 }>
                        { TransDisplay.map (( value, index ) => {
                            return (
                                <CardContent style={ (index === TransDisplay.length - 1) ? styles.cardContent : styles.cardContent2 } key={ index }>
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

export default CashFlow;