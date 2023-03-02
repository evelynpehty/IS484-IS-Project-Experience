import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import moment from "moment";
import * as V from 'victory';
import { Link } from "react-router-dom";

import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Card, CardContent, Typography, AppBar, Toolbar, Tab, Tabs, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { VictoryChart, VictoryLine, VictoryScatter, VictoryArea, VictoryAxis } from 'victory';

import { ReactComponent as Arrow } from "../../assets/icons/arrow-red.svg";
import { ReactComponent as UpWhite } from "../../assets/icons/up-white.svg";
import { ReactComponent as UpBlack } from "../../assets/icons/up-black.svg";
import { ReactComponent as DownWhite } from "../../assets/icons/down-white.svg";
import { ReactComponent as DownBlack } from "../../assets/icons/down-black.svg";
import { ReactComponent as MenuWhite } from "../../assets/icons/menu-white.svg";
import { ReactComponent as MenuBlack } from "../../assets/icons/menu-black.svg";

function CashFlow() {
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
            marginTop: "15px",
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

    // Expenses Static Data
    const data = [
        { x: "Jan", y: 2000 },
        { x: "Feb", y: 1500 },
        { x: "Mar", y: 4000 },
        { x: "Apr", y: 5000 },
        { x: "Jun", y: 3500 },
        { x: "Jul", y: 4000 }
    ]

    // Income Static Data
    const data2 = [
        { x: "Jan", y: 4000 },
        { x: "Feb", y: 4500 },
        { x: "Mar", y: 3200 },
        { x: "Apr", y: 2500 },
        { x: "Jun", y: 3000 },
        { x: "Jul", y: 5500 }
    ]

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

    var recent_transactions = transaction_item.slice(0, 3)

    // Tabs Value Change
    const [value, setValue] = React.useState('Monthly');

    const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
    };

    // // Toggle Button Change
    // const [alignment, setAlignment] = React.useState('web');

    // const handleChange2 = (event2, newAlignment) => {
    //   setAlignment(newAlignment);
    //   console.log(newAlignment)
    // };

    const allTransactions = () => {
        console.log("All Transactions Active");
        var transactionMainElement = document.getElementById("transaction");
        console.log(transactionMainElement)
    }

    const income = () => {
        
    }

    const expense = () => {
        
    }

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Arrow component={ Link } to={ `/account-details/${id}` } />
                    <Typography component={ Link } to={ `/account-details/${id}` } sx={{ flexGrow: 1, fontWeight: "bold", ml: 2 }} color="#4B4948">
                        Account Overview
                    </Typography>
                </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth="lg">
                <Box sx={{ mt: 10, mb: 10 }}>
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Cash Flow</Typography>
                        <Button style={ styles.button } variant="contained">VIEW INSIGHTS</Button>
                    </Grid>
                    {/* <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                        centered
                    >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box>
                            <Tab value="Yearly" label="Yearly" />
                            <Tab value="Monthly" label="Monthly" />
                            <Tab value="Weekly" label="Weekly" />
                        </Box>
                    </Tabs> */}

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                        value={ value } 
                        onChange={ handleChange } 
                        aria-label="basic tabs example"
                        centered
                        >
                            <Tab value="Yearly" label="Yearly" />
                            <Tab value="Monthly" label="Monthly" />
                            <Tab value="Weekly" label="Weekly" />
                        </Tabs>
                    </Box>
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
                                    tickLabels: { fill: '#454459' },
                                }}
                                tickValues = {[ 1000, 2000, 3000, 4000, 5000, 6000 ]}
                            />

                            {/* Expenses Line Chart */}
                            <VictoryLine
                                interpolation="natural"
                                data={ data }
                                style={{ 
                                    data: { stroke: "#E60000", strokeWidth: 6 },
                                    parent: { border: "1px solid #E60000"}
                                }}
                            />
                            <VictoryArea
                                interpolation="natural"
                                style={{ data: { fill: "#FF9364", fillOpacity: 0.3, stroke: "none" } }}
                                data={ data }
                            />
                            <VictoryScatter 
                                data={[
                                    { x: "Jul", y: 4000 }
                                ]}
                                size={ 7 }
                                style={{
                                    data: { fill: "#E60000", stroke: "#F3F3F3", strokeWidth: 3 }
                                }}
                            />

                            {/* Income Line Chart */}
                            <VictoryLine
                                interpolation="natural"
                                data={ data2 }
                                style={{ 
                                    data: { stroke: "#109878", strokeWidth: 6 },
                                }}
                            />
                            <VictoryArea
                                interpolation="natural"
                                style={{ data: { fill: "#01A099", fillOpacity: 0.3, stroke: "none"} }}
                                data={ data2 }
                            />
                            <VictoryScatter 
                                data={[
                                    { x: "Jul", y: 5500 }
                                ]}
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
                                        SGD $2,180.90
                                    </Typography>
                                    <Typography sx={{ fontSize: 10 }} color="#9197A4">
                                        For month of Jan 2023
                                    </Typography>
                                </Grid>
                                <Grid xs={4}>
                                    <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                        TOTAL INCOME
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }} color="#109878">
                                        SGD $4,500.90
                                    </Typography>
                                    <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                        TOTAL EXPENSES
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, fontWeight:"bold" }} color="#E60000">
                                        SGD $2,420.00
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center" spacing={ 2 }>
                        <Grid xs={4}>
                            <Card elevation={ 4 } onClick={ allTransactions }>
                                <CardContent id="transactions" sx={{ textAlign: "center" }}>
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                    All
                                    </Typography>
                                    <MenuBlack />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid xs={4}>
                            <Card elevation={ 4 } onClick={ income }>
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                    Income
                                    </Typography>
                                    <UpBlack />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid xs={4}>
                            <Card elevation={ 4 } onClick={ expense }>
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                    Expenses
                                    </Typography>
                                    <DownBlack />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange2}
                        fullWidth={ true }
                        sx={{ mb: 3 }}
                    >
                        <ToggleButton value="Transaction">All <MenuBlack sx={{ mr: 1 }} /></ToggleButton>
                        <ToggleButton value="Income">Income</ToggleButton>
                        <ToggleButton value="Expenses">Expenses</ToggleButton>
                    </ToggleButtonGroup> */}

                    {/* Need to be made into a component */}
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Transactions</Typography>
                        <Button style={ styles.button } variant="contained">VIEW ALL</Button>
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

export default CashFlow;