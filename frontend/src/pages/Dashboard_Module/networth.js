// Packages
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import moment from "moment";
import { Link } from "react-router-dom";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Card, CardContent, Typography, AppBar, Toolbar, useTheme, Paper } from "@mui/material";

// Assets (Images & Icons)
import { ReactComponent as InfoIcon } from "../../assets/icons/info-circle-line.svg";
import { ReactComponent as GreenOval } from "../../assets/icons/green-oval.svg";
import { ReactComponent as RedOval } from "../../assets/icons/red-oval.svg";
import { ReactComponent as OrangeOval } from "../../assets/icons/orange-oval.svg";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";

// Recharts Components
import {
    PieChart, 
    Pie,
    Cell,
  } from "recharts";

function NetWorth() {
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
            padding: 10,
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

        SecuritiesGradientText: {
            background: "linear-gradient(to top right, #109878, #8AB8B2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        },

        SavingsGradientText: {
            background: "linear-gradient(to top right, #FF7D1F, #DBBB9E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        },

        LoansGradientText: {
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
        },
        RedGradientText: {
            background: "linear-gradient(to top right, #E60000, #E69F9F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        },
    }

    const COLORS = [
        { start: "#109878", end: "#8AB8B2" }, //securities
        { start: "#FF7D1F", end: "#DBBB9E" }, //deposit
        { start: "rgba(255,147,100,0.3)", end: "rgba(252,51,51,0.3)" }, //loan
    ];

    const navigate = useNavigate();
    const { netWorth } = useSelector((state) => state.dashboard);

    const [savings, setSavings] = useState(netWorth["deposit_net_worth"]["data"]); 
    const [loans, setLoans] = useState(netWorth["loan_net_worth"]["data"]); 
    const [securities, setSecurities] = useState(netWorth["net_worth_security_holdings"]["data"]); 
    const [netAmount, setNetAmount] = useState(netWorth["total_net_worth"]); 
    const [pieData, setPieData] = useState([
        {
            "name": "Securities",
            "value": securities,
        },
        {
            "name": "Savings",
            "value": savings,
        },
        {
            "name": "Loans",
            "value": loans,
        }
      ]); 

    const [show, setShow] = useState(false);
    function handleTooltip() {
        setShow(prev => !prev);
    }

    const handleViewEF = () =>{
        navigate("/emergencyfund");
    }

    return (
        <React.Fragment>
            <SecondaryAppBar link="/dashboard" text="Dashboard" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>

                    {/*Net Worth*/}
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Net Worth</Typography>
                        <WhiteReusableButton function={handleViewEF} buttonText="EMERGENCY FUND" />
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
                                    Net Amount
                                </text>
                                <InfoIcon x="62%" y="43%"  />
                                <text x="50%" y="55%" dy={8} textAnchor="middle" fill="#303841" fontWeight="bold" fontSize="16px">
                                   
                                    {netAmount<0 &&  `-S$${netAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).slice(1)}`}
                                    {netAmount >= 0 &&  `S$${netAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                </text>
                            </g>
                        </PieChart>
                        { show && 
                            <Paper elevation={2} style={ styles.popoverContent }>
                                <Typography style={ styles.RedGradientText } sx={{ fontSize: 10, fontWeight: "bold" }}>How is the Net Worth calculated?</Typography>
                                <Typography sx={{ fontSize: 10 }} color={ theme.palette.secondary.main }>Net worth is equivalent to the amount that remains if you were to sell all your assets and use the cash you gained to pay off all liabilities.</Typography>
                            </Paper>
                        }
                    </div>
                    
                    {/*Breakdown*/}
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Breakdown</Typography>
                    </Grid>

                    {/*Assets*/}
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{fontSize:"14px", fontWeight: "bold"} } color={ theme.palette.secondary.main }>Assets</Typography>
                    </Grid>

                    <Grid container spacing={2} columns={12} alignItems="stretch">
                        <Grid item xs={6}>
                            <Card style={styles.card2}>
                                <CardContent style={ styles.cardContent }>         
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold", mb:1 }} color={ theme.palette.secondary.main }>
                                        <GreenOval />  Securities
                                    </Typography>
                                    <Typography sx={{ fontSize: 18, fontWeight:"bold",mb:1 }} style={styles.SecuritiesGradientText}>
                                        {`S$${securities.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                    </Typography>
                                    <Typography sx={{ fontSize: 10 }} color="#7D8895">
                                        Your total holding value across all securities
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card style={styles.card2}>
                                <CardContent style={ styles.cardContent }>         
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold", mb:1 }} color={ theme.palette.secondary.main }>
                                        <OrangeOval /> Savings
                                    </Typography>
                                    <Typography sx={{ fontSize: 18, fontWeight:"bold", mb:1 }} style={styles.SavingsGradientText}>
                                        {`S$${savings.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                    </Typography>
                                    <Typography sx={{ fontSize: 10 }} color="#7D8895">
                                        Your total savings across all deposit accounts                               
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/*Liabilities*/}
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center" sx={{mt:4}}>
                        <Typography sx={{fontSize:"14px", fontWeight: "bold"} } color={ theme.palette.secondary.main }>Liabilities</Typography>
                    </Grid>
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={6}>
                            <Card style={styles.card2}>
                                <CardContent style={ styles.cardContent }>         
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold", mb:1 }} color={ theme.palette.secondary.main }>
                                        <RedOval /> Loans
                                    </Typography>
                                    <Typography sx={{ fontSize: 18, fontWeight:"bold", mb:1 }} style={styles.LoansGradientText}>
                                        {`-S$${loans.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                    </Typography>
                                    <Typography sx={{ fontSize: 10 }} color="#7D8895">
                                        Your total debt across all loan accounts
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
    
}

export default NetWorth;