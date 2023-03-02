import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import moment from "moment";
import * as V from 'victory';
import { Link } from "react-router-dom";

import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Card, CardContent, Typography, AppBar, Toolbar } from "@mui/material";
import { VictoryChart, VictoryLine, VictoryScatter, VictoryArea, VictoryAxis } from 'victory';

import { ReactComponent as Arrow } from "../../assets/icons/arrow-red.svg";
import { ModeCommentSharp, Savings } from "@mui/icons-material";

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
    //const currentMonth = moment().month()
    //const currentMontName = moment(currentMonth+1, 'MM').format('MMM')
    const sixMonthAgo = moment().subtract(5, 'months').format("MMM")
    
    var monthRange = []
    const indexof = months.indexOf(sixMonthAgo)
    const limit = indexof + 5


    for (let i = indexof; i <= limit; i++) {
        monthRange.push(months[i%12])
      }
    
    const income_data = []
    const expense_data = []
    monthRange.forEach(month => {
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
        const monthNum = moment(element.transactionDate).month() + 1
        var monthName = moment(monthNum, 'MM').format('MMM');

        expense_data.forEach(obj =>{
            if (obj.x === monthName){
                obj.y += element.transactionAmount
            }
        })
        // const newTransactionDate = moment(transactionDate, "DD-MM-YYYY")
    });

    income_transaction_data.forEach(element => {
        const monthNum = moment(element.transactionDate).month() + 1
        var monthName = moment(monthNum, 'MM').format('MMM');

        income_data.forEach(obj =>{
            if (obj.x === monthName){
                obj.y += element.transactionAmount
            }
        })
    });

    const expense_latest_obj = [expense_data[5]]
    const income_latest_obj = [income_data[5]]

    const latest_month = income_latest_obj[0].x
    const total_income = income_latest_obj[0].y
    const total_expense = expense_latest_obj[0].y

    var expense_max = expense_data.reduce(
        (prev, current) => {
          return prev.y > current.y ? prev : current
        }
      );
    var income_max = income_data.reduce(
        (prev, current) => {
          return prev.y > current.y ? prev : current
        }
      );

    var max = 0
  
    if (income_max.y > expense_max.y){
       max = income_max.y
    } else{
       max = expense_max.y
    }

    const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
    );
    var tickers = arrayRange(0, max+5000, 5000)
    console.log(tickers)

    var recent_transactions = transaction_item.slice(0, 3)

    const handleViewAll = () => {
        navigate('/view-transaction-history', {replace: true , state: { transaction_item: transaction_item, id: id } })  
    }

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Arrow component={ Link } to={  "/deposit" } />
                    <Typography component={ Link } to={  "/deposit" } sx={{ flexGrow: 1, fontWeight: "bold", ml: 2 }} color="#4B4948">
                        All Accounts
                    </Typography>
                </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth="lg">
                <Box sx={{ mt: 10, mb: 10 }}>
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
                        <Button component={ Link } to={ `/cashflow/${id}` } style={ styles.button } variant="contained">EXPAND</Button>
                    </Grid>

                    <Card style={ styles.card2 } elevation={ 4 }>
                        <VictoryChart>
                            <VictoryAxis
                                style={{
                                    axis: { stroke: 'none' },
                                    ticks: { stroke: 'none' },
                                    tickLabels: { fill: '#454459' },
                                }}
                            />
                            <VictoryAxis
                                dependentAxis
                                style={{
                                    axis: { stroke: 'none' },
                                    ticks: { stroke: 'none' },
                                    tickLabels: { fill: '#454459' }
                                }}
                                tickValues={tickers}
                            />

                            {/* Expenses Line Chart */}
                            <VictoryLine
                                interpolation="natural"
                                data={ expense_data }
                                style={{ 
                                    data: { stroke: "#E60000", strokeWidth: 6 },
                                    parent: { border: "1px solid #E60000"}
                                }}
                            />
                            <VictoryArea
                                interpolation="natural"
                                style={{ data: { fill: "#FF9364", fillOpacity: 0.3, stroke: "none" } }}
                                data={ expense_data }
                            />
                            <VictoryScatter 
                                data={expense_latest_obj}
                                size={ 7 }
                                style={{
                                    data: { fill: "#E60000", stroke: "#F3F3F3", strokeWidth: 3 }
                                }}
                            />

                            {/* Income Line Chart */}
                            <VictoryLine
                                interpolation="natural"
                                data={ income_data }
                                style={{ 
                                    data: { stroke: "#109878", strokeWidth: 6 },
                                }}
                            />
                            <VictoryArea
                                interpolation="natural"
                                style={{ data: { fill: "#01A099", fillOpacity: 0.3, stroke: "none"} }}
                                data={ income_data }
                            />
                            <VictoryScatter 
                                data={income_latest_obj}
                                size={ 7 }
                                style={{
                                    data: { fill: "#109878", stroke: "#F3F3F3", strokeWidth: 3 }
                                }}
                            />
                        </VictoryChart>
                        <CardContent style={ styles.cardContent }>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Grid xs={8}>
                                    <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                        NET CASH FLOW
                                    </Typography>
                                    <Typography sx={{ fontSize: 18, fontWeight:"bold" }} color="#4B4948">
                                        SGD ${total_income-total_expense.toLocaleString("en-US")}
                                    </Typography>
                                    <Typography sx={{ fontSize: 10 }} color="#9197A4">
                                        For month of {latest_month} 2023
                                    </Typography>
                                </Grid>
                                <Grid xs={4}>
                                    <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                        TOTAL INCOME
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }} color="#3BB537">
                                        SGD ${total_income.toLocaleString("en-US")}
                                    </Typography>
                                    <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                        TOTAL EXPENSES
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, fontWeight:"bold" }} color="#E60000">
                                        SGD ${total_expense.toLocaleString("en-US")}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Recent Transactions</Typography>
                        <Button style={ styles.button } variant="contained" onClick={handleViewAll}>VIEW ALL</Button>
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