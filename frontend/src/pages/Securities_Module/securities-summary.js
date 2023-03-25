// Packages
import React, { useState, useEffect } from "react";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, Card, CardContent, useTheme, Paper, Chip, Button } from "@mui/material";

// Customised Components
import MainAppBar from "../../components/MainAppBar";
import WhiteReusableButton from "../../components/WhiteButton";

// Assets (Images & Icons)
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrow-up-green.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/icons/arrow-down-red.svg";
import { ReactComponent as CalculatorIcon } from "../../assets/icons/calculator-line-red.svg";
import { ReactComponent as LinkIcon } from "../../assets/icons/link-line-red.svg";

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

    return (
        <React.Fragment>
        <MainAppBar />
        <Container maxWidth="lg">
            <Box sx={{ pt: 10, pb: 10 }}>
                {/* Securities Summary */}
                <Grid container style={styles.grid} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography style={styles.label} variant="h6">Securities</Typography>
                    <WhiteReusableButton buttonText="WATCHLIST" />
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
                                    S$18,727.25
                                </Typography>
                                <Grid xs={12}>
                                    <Typography variant="p" sx={{ fontSize: 12, mr: 1 }} color="#9197A4">
                                        1D Change
                                    </Typography>
                                    <Typography variant="p" sx={{ fontSize: 12 }} color="#109878">
                                        <ArrowUpIcon style={ styles.arrowIcon } />
                                        S$17.28
                                    </Typography>
                                </Grid>       
                            </Grid>
                            <Grid xs={4}>
                                <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                    TOTAL INVESTED
                                </Typography>
                                <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }}>
                                    S$18,500.00 
                                </Typography>
                                <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#4B4948">
                                    OVERALL RETURNS
                                </Typography>
                                <Typography sx={{ fontSize: 14, fontWeight:"bold" }} color="#109878">
                                    <ArrowUpIcon style={ styles.arrowIcon } />
                                    S$227.35
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
                    <Card>
                        <CardContent sx={{ textAlign: "center" }}>
                            <CalculatorIcon />
                            <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                Performance Analysis
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
                
                <Card style={ styles.card2 }>
                    <CardContent>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="p" sx={{ fontSize: 16, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                AAPL
                                <Typography variant="p" sx={{ fontSize: 12, fontWeight:"regular", ml: 2 }}>
                                    Apple Inc.
                                </Typography>
                            </Typography>
                            
                            <Typography variant="p" sx={{ fontSize: 12 }} textAlign="end" color="#9197A4">
                                Qty 30
                                <Typography variant="p" sx={{ fontSize: 12, fontWeight:"regular", ml: 2 }} color={ styles.positive }>
                                    <ArrowUpIcon />
                                    175.18
                                </Typography>
                            </Typography>
                            
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="p" sx={{ fontSize: 14 }} color={ theme.palette.secondary.main }>
                                US$155.09
                                <Typography variant="p" sx={{ fontSize: 12, fontWeight:"regular", ml: 2 }} color={ styles.negative } >
                                    -0.13%
                                </Typography>
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="#4B4948">
                                SGD $6,234.62
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>

                <Card style={ styles.card2 }>
                    <CardContent>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="p" sx={{ fontSize: 16, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                TSLA
                                <Typography variant="p" sx={{ fontSize: 12, fontWeight:"regular", ml: 2 }}>
                                    Tesla Inc.
                                </Typography>
                            </Typography>
                            
                            <Typography variant="p" sx={{ fontSize: 12 }} textAlign="end" color="#9197A4">
                                Qty 20
                                <Typography variant="p" sx={{ fontSize: 12, fontWeight:"regular", ml: 2 }} color={ styles.negative }>
                                    <ArrowDownIcon />
                                    91.36
                                </Typography>
                            </Typography>
                            
                        </Grid>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="p" sx={{ fontSize: 14 }} color={ theme.palette.secondary.main }>
                                US$180.83
                                <Typography variant="p" sx={{ fontSize: 12, fontWeight:"regular", ml: 2 }} color={ styles.negative } >
                                    -2.68%
                                </Typography>
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="#4B4948">
                                SGD $4,191.45
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Container>
        </React.Fragment>
    );
}


export default SecuritiesSummary;