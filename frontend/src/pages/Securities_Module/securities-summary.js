// Packages
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, Card, CardContent, useTheme, Paper, Chip, Button} from "@mui/material";

// Customised Components
import MainAppBar from "../../components/MainAppBar";
import WhiteReusableButton from "../../components/WhiteButton";

// Assets (Images & Icons)
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrow-up-green.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/icons/arrow-down-red.svg";
import { ReactComponent as CalculatorIcon } from "../../assets/icons/calculator-line-red.svg";
import { ReactComponent as LinkIcon } from "../../assets/icons/link-line-red.svg";
import { ReactComponent as PnLIcon } from "../../assets/icons/pnl-analysis.svg";


function SecuritiesSummary() {
    // Styling for Securities Summary Page
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
    
    const { securitiesList } = useSelector((state) => state.securities);
    const navigate = useNavigate();

    const handleViewWatchList = () => {
        navigate('/view-watchlist')  
    }

    return (
        <React.Fragment>
        <MainAppBar />
        <Container maxWidth="lg">
            <Box sx={{ pt: 10, pb: 10 }}>
                {/* Securities Summary */}
                <Grid container style={styles.grid} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography style={styles.label} variant="h6">Securities</Typography>
                    <WhiteReusableButton function={ handleViewWatchList } buttonText="WATCHLIST" />
                </Grid>

                {/* Consolidated Securities Card */}
                <Card style={ styles.card2 } elevation={ 4 }>
                    <CardContent style={ styles.cardContent }>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid xs={8}>
                                <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                    CURRENT HOLDINGS
                                </Typography>
                                <Typography sx={{ fontSize: 20, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                    { `S$${ securitiesList.crr_holding_SGD.toFixed(2).toLocaleString("en-US") }` }
                                </Typography>
                                <Grid xs={12}>
                                    <Typography variant="p" sx={{ fontSize: 12, mr: 1 }} color="#9197A4">
                                        1D Change
                                    </Typography>
                                    <Typography variant="p" sx={{ fontSize: 12 }} style={ securitiesList["1_day_change"] < 0 ? styles.negative : styles.positive } >
                                        { securitiesList["1_day_change"] < 0 && <ArrowDownIcon style={ styles.arrowIcon } />}
                                        { securitiesList["1_day_change"] >= 0 && <ArrowUpIcon style={ styles.arrowIcon } />}
                                        
                                        { `S$${ securitiesList["1_day_change"].toFixed(2).toLocaleString("en-US") }` }
                                    </Typography>
                                </Grid>       
                            </Grid>
                            <Grid xs={4}>
                                <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                    TOTAL INVESTED
                                </Typography>
                                <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }}>
                                    { `S$${ securitiesList["total_invest_SGD"].toFixed(2).toLocaleString("en-US") }` }
                                </Typography>
                                <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                    OVERALL RETURNS
                                </Typography>
                                <Typography sx={{ fontSize: 14, fontWeight:"bold" }} color="#109878" style={ securitiesList["overall_return_SGD"] < 0 ? styles.negative : styles.positive }>
                                    { securitiesList["overall_return_SGD"] < 0 && <ArrowDownIcon style={ styles.arrowIcon } />}
                                    { securitiesList["overall_return_SGD"] >= 0 && <ArrowUpIcon style={ styles.arrowIcon } />}
                                    
                                    { `S$${ securitiesList["overall_return_SGD"].toFixed(2).toLocaleString("en-US") }` }
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Grid container style={styles.grid} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography style={styles.label} variant="h6">Quick Actions</Typography>
                </Grid>
                <Box
                    sx={{
                        mb: 3,
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr 1fr 1fr' },
                        gap: 2,
                    }}
                >
                    <Card>
                        <CardContent sx={{ textAlign: "center" }}>
                            <CalculatorIcon />
                            <Typography sx={{ fontSize: 10, fontWeight: "bold", mt: "10px" }} color="text.secondary" gutterBottom>
                                Net Worth
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card onClick={ handleViewWatchList }>
                        <CardContent sx={{ textAlign: "center" }}>
                            <PnLIcon />
                            <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                P&L Analysis
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent sx={{ textAlign: "center" }}>
                            <LinkIcon />
                            <Typography sx={{ fontSize: 10, fontWeight: "bold", mt: "5px" }} color="text.secondary" gutterBottom>
                                Link Accounts
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                {/* Securities Holdings */}
                <Grid container style={styles.grid} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography style={styles.label} variant="h6">Holdings</Typography>
                </Grid>


                {securitiesList.detail.map((item, index)=>{
                    return  (
                        <>
                        <Link to={`/securities-details/${item.ticker}`} key={item.ticker}> 
                             <Card style={ styles.card2 }>
                                <CardContent>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="p" sx={{ fontSize: 16, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                            {item.ticker}
                                            <Typography variant="p" sx={{ fontSize: 12, fontWeight:"regular", ml: 2 }}>
                                                {item.stock_name}
                                            </Typography>
                                        </Typography>
                                        
                                        <Typography variant="p" sx={{ fontSize: 12 }} textAlign="end" color="#9197A4">
                                            Qty {item.qty}
                                            <Typography variant="p" sx={{ fontSize: 12, fontWeight:"regular", ml: 2 }} style={ item["1_day_change_per_each"] < 0 ? styles.negative : styles.positive }>
                                                { item["1_day_change_per_each"] < 0 && <ArrowDownIcon style={ styles.arrowIcon } />}
                                                { item["1_day_change_per_each"] >= 0 && <ArrowUpIcon style={ styles.arrowIcon } />}
                                                
                                                { `S$${ item["1_day_change_per_each"].toFixed(2).toLocaleString("en-US") }` }
                                            </Typography>
                                        </Typography>
                                        
                                    </Grid>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="p" sx={{ fontSize: 14 }} color={ theme.palette.secondary.main }>
                                            
                                            { `US$${ item["current_price_USD"].toFixed(2).toLocaleString("en-US") }` }
                                            <Typography variant="p" sx={{ fontSize: 12, fontWeight:"regular", ml: 2 }} style={ item["change_rate"] < 0 ? styles.negative : styles.positive } >
                                               {item.change_rate.toFixed(2)}%
                                            </Typography>
                                        </Typography>
                                        <Typography sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="#4B4948">
                                            { `SGD $${ item["current_price_SGD"].toFixed(2).toLocaleString("en-US") }` }
                                        </Typography>
                                    </Grid>
                                </CardContent>
                            </Card>   
                        </Link>
                        </>
                    )
                })}
            </Box>
        </Container>
        </React.Fragment>
    );
}


export default SecuritiesSummary;