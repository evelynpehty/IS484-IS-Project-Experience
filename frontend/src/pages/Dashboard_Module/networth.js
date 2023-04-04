import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import moment from "moment";
import { Link } from "react-router-dom";

import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Card, CardContent, Typography, AppBar, Toolbar, useTheme } from "@mui/material";


import { ReactComponent as IIcon } from "../../assets/icons/info-circle-line.svg";
import { ReactComponent as GreenOval } from "../../assets/icons/green-oval.svg";
import { ReactComponent as RedOval } from "../../assets/icons/red-oval.svg";
import { ReactComponent as OrangeOval } from "../../assets/icons/orange-oval.svg";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";

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
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            fontSize: "16px"
        },
        SavingsGradientText: {
            background: "linear-gradient(to top right, #FF7D1F, #DBBB9E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            fontSize: "16px"
        },
        LoansGradientText: {
            background: "linear-gradient(to top right, #E60000, #E69F9F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            fontSize: "16px"
        },
    }

    const navigate = useNavigate();
    const { netWorth } = useSelector((state) => state.dashboard);

    const [savings, setSavings] = useState(netWorth["deposit_net_worth"]["data"]); 
    const [loans, setLoans] = useState(netWorth["loan_net_worth"]["data"]); 
    const [securities, setSecurities] = useState(netWorth["net_worth_security_holdings"]["data"]); 
    const [netAmount, setNetAmount] = useState(netWorth["total_net_worth"]); 
    const [pieData, setPieData] = useState(netWorth["total_net_worth"]); 

    useEffect(()=>{
        // PIE CHART DATA
        const tempPieData = [
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
          ];
        setPieData(tempPieData)
    },[])

    const handleViewEF = () =>{
        navigate("/emergencyfund");
    }

    return (
        
            <>
        <SecondaryAppBar link="/dashboard" text="Dashboard" />
        <Container maxWidth="lg">
            <Box sx={{ pt: 10, pb: 10 }}>

                 {/*Net Worth*/}
                <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                    <Typography style={ styles.label } variant="h6">Net Worth</Typography>
                    <WhiteReusableButton function={handleViewEF} buttonText="EMERGENCY FUND" />
                </Grid>
                

                {/*Breakdown*/}
                <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                    <Typography style={ styles.label } variant="h6">Breakdown</Typography>
                </Grid>

                {/*Assets*/}
                <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                    <Typography sx={ {fontColor:"#4B4948", fontSize:"14px", fontWeight: "medium"} } variant="h6">Assets</Typography>
                </Grid>

                <Grid container spacing={2} columns={12} alignItems="stretch">
                    <Grid item xs={6}>
                        <Card style={styles.card2}>
                            <CardContent style={ styles.cardContent }>         
                                <Typography sx={{ fontSize: 14, fontWeight: "bold", fontColor:"#4B4948", mb:1 }} >
                                    <GreenOval />  Securities
                                </Typography>
                                <Typography sx={{ fontSize: 20, fontWeight:"bold",mb:1 }} style={styles.SecuritiesGradientText} color={ theme.palette.secondary.main }>
                                    {`S$${securities.toFixed(2).toLocaleString("en-US")}`}
                                </Typography>
                                <Typography sx={{ fontSize: 10 }} color={ theme.palette.secondary.main }>
                                    Your total holding value across all securities
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card style={styles.card2}>
                            <CardContent style={ styles.cardContent }>         
                                <Typography sx={{ fontSize: 14, fontWeight: "bold", fontColor:"#4B4948", mb:1 }} >
                                    <OrangeOval /> Savings
                                </Typography>
                                <Typography sx={{ fontSize: 20, fontWeight:"bold",mb:1 }} style={styles.SavingsGradientText} color={ theme.palette.secondary.main }>
                                    {`S$${savings.toFixed(2).toLocaleString("en-US")}`}
                                </Typography>
                                <Typography sx={{ fontSize: 10 }} color={ theme.palette.secondary.main }>
                                    Your total savings across all deposit accounts                               
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/*Liabilities*/}
                <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center" sx={{mt:4}}>
                    <Typography sx={ {fontColor:"#4B4948", fontSize:"14px", fontWeight: "medium"} } variant="h6">Liabilities</Typography>
                </Grid>
                <Grid container spacing={2} columns={12}>
                    <Grid item xs={6}>
                        <Card style={styles.card2}>
                            <CardContent style={ styles.cardContent }>         
                                <Typography sx={{ fontSize: 14, fontWeight: "bold", fontColor:"#4B4948", mb:1 }} >
                                    <RedOval /> Loans
                                </Typography>
                                <Typography sx={{ fontSize: 20, fontWeight:"bold", mb:1 }} style={styles.LoansGradientText} color={ theme.palette.secondary.main }>
                                    {`-S$${loans.toFixed(2).toLocaleString("en-US")}`}
                                </Typography>
                                <Typography sx={{ fontSize: 10 }} color={ theme.palette.secondary.main }>
                                    Your total debt across all loan accounts
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>



            </Box>
        </Container>
                    
        </>
    );
    
}

export default NetWorth;