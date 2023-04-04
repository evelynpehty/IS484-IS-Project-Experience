// Packages
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, useTheme, Card, CardContent, CardMedia, Paper, Button } from "@mui/material";

import { deposit, depositTransactionHistory } from "../../actions/deposit";
import { loan } from "../../actions/loan";
import { creditcard } from "../../actions/creditcard";
import { peekDetail } from "../../actions/peekdetail";
import { RemoveFirstLoad } from "../../actions/auth";

import Loading from "../../components/loading.js";

// Customised Components
import MainAppBar from "../../components/MainAppBar";
import WhiteReusableButton from "../../components/WhiteButton";

// Assets (Images & Icons)
import cardBG from "../../assets/images/cardBG.png"
import {ReactComponent as PieChartImage} from "../../assets/images/piechart.svg";
import { ReactComponent as RepaymentIcon } from "../../assets/icons/paper-fold-text-line.svg";
import { ReactComponent as WatchlistIcon } from "../../assets/icons/watchlist-line-red.svg";
import { ReactComponent as LinkIcon } from "../../assets/icons/link-line-red.svg";
import { ReactComponent as NextIcon } from "../../assets/icons/next-icon-red.svg";

// Recharts
// import {
//     PieChart,
//     Pie,
//     Cell
// } from "recharts";

// Functions
import { logout } from "../../actions/auth";


function DashBoard() {
    // Styling for Dashboard Page
    const theme = useTheme();
    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: theme.palette.secondary.main,
            fontSize: "18px"
        },

        smallerLabel: {
            fontWeight: "bold",
            color: theme.palette.secondary.main,
            fontSize: "16px"
        },

        card: {
            background: theme.palette.neutral.main,
            marginBottom: "24px",
            borderRadius: "10px",
            padding: 10
        },

        cardContent: {
            padding: "8px"
        },

        card2: {
            position: "relative"
        },

        paper: {
            backgroundColor: "#FBFBFB",
            borderRadius: "10px",
            padding: 10
        },

        positive: {
            color: "#3BB537"
        },

        negative: {
            color: "#E60000"
        },

        overlay: {
            position: 'absolute',
            top: '20px',
            left: '20px',
        },

        button: {
            paddingLeft: 0,
            textTransform: "initial"
        }
    }

    const COLORS = [
        { start: "#FF9364", end: "#F25F33" },
        { start: "#FF9364", end: "#F25F33" },
        { start: "#109878", end: "#8AB8B2" },
    ];

    const { isFirstLoad } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const UserID = user.data.UserID
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logout());
        navigate("/")
    };

    const handleWatchlist = () => {
        navigate("/view-watchlist");
    }

    // Mock Data
    const data = [
        {
          "name": "Group A",
          "value": 300
        },
        {
          "name": "Group B",
          "value": 300
        },
        {
          "name": "Group C",
          "value": 300
        }
    ];

    let renderLabel = function(entry) {
        return entry.name;
    }

    return (
        <React.Fragment>
            <MainAppBar />
                <Container maxWidth="lg">
                    <Box sx={{ pt: 10, pb: 10 }}>
                        <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                            <Typography style={ styles.label } variant="h6">Deposit Accounts</Typography>
                            <WhiteReusableButton function={ handleLogOut } buttonText="LOGOUT" />           
                        </Grid>

                        {/* Consolidation Card Segment */}
                        <Link to={`/net-worth`}>
                            <Card style={ styles.card }>
                                <CardContent style={ styles.cardContent }>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Grid xs={5}>
                                            <Typography sx={{ fontSize: 20, fontWeight:"bold", mb: 2 }} color={ theme.palette.primary.main }>
                                                Wealth
                                            </Typography>
                                            <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                                YOUR NET WORTH
                                            </Typography>
                                            <Typography sx={{ fontSize: 20, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                                S$8719.05
                                            </Typography>
                                            <Typography sx={{ fontSize: 10 }} color={ theme.palette.secondary.main }>
                                                Total assets & liabilities
                                            </Typography>
                                        </Grid>
                                        <Grid xs={7} textAlign="end">
                                            <PieChartImage />
                                            {/* <Box
                                                component="img"
                                                sx={{
                                                    maxHeight: { xs: 400, sm: 400, md: 200, lg: 230, xl: 300 },
                                                    maxWidth: { xs: 400, sm: 400, md: 200, lg: 230, xl: 300 }
                                                }}
                                                alt="piechart"
                                                src={ piechart }
                                            /> */}
                                            {/* <PieChart width={400} height={150}>
                                                <Pie 
                                                    data={ data } 
                                                    dataKey="value" 
                                                    nameKey="name" 
                                                    cx="27%" 
                                                    cy="50%" 
                                                    innerRadius={5} 
                                                    outerRadius={20}
                                                    labelLine={ false }
                                                    label={ renderLabel } 
                                                >
                                                </Pie>
                                                <g>
                                                    <text x="50%" y="50%" dy={8} textAnchor="middle" fill="black">
                                                        Name
                                                    </text>
                                                </g>
                                            </PieChart> */}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Link>
                        
                        {/* Quick Actions Segment */}
                        <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                            <Typography style={ styles.smallerLabel } >Quick Actions</Typography> 
                            <Box
                                sx={{
                                    p: 1,
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr 1fr 1fr' },
                                    gap: 2,
                                }}
                            >
                                <Card style={styles.card2}>
                                    <CardContent sx={{ pt: "24px", textAlign: "center" }}>
                                        <RepaymentIcon />
                                        <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                            Repayments
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card style={styles.card2}>
                                    <CardContent sx={{ pt: "24px", textAlign: "center" }}>
                                        <WatchlistIcon />
                                        <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                            Watchlist
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card style={styles.card2}>
                                    <CardContent sx={{ pt: "24px", textAlign: "center" }}>
                                        <LinkIcon />
                                        <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                            Link Accounts
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                        
                        <Link to={"/ emergencyfund"}> 
                            <Card style={ styles.card }>
                                <CardContent style={ styles.cardContent }>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Grid xs={6}>
                                            <Typography sx={{ fontSize: 20, fontWeight:"bold", mb: 2 }} color={ theme.palette.primary.main }>
                                                Financial Health
                                            </Typography>
                                            <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                                IDEAL EMERGENCY FUND
                                            </Typography>
                                            <Typography sx={{ fontSize: 20, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                                S$18,600.00
                                            </Typography>
                                            <Typography sx={{ fontSize: 10 }} color={ theme.palette.secondary.main }>
                                                Based on your cash flow
                                            </Typography>
                                        </Grid>

                                        <Grid xs={5}>
                                            <Paper style={ styles.paper } elevation={1} sx={{ mb: 2 }}>
                                                <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#979797">
                                                    CURRENT SAVINGS
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color={ theme.palette.secondary.main }>
                                                    S$15,526.70
                                                </Typography>
                                            </Paper>
                                            <Paper style={ styles.paper } elevation={1}>
                                                <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#979797">
                                                    SAVINGS NEEDED
                                                </Typography>
                                                <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color={ styles.negative }>
                                                    S$3,073.30
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Link>

                        <Card style={ styles.card2 }>
                            <CardMedia component="img" image={cardBG} style={styles.media}/>
                            <Box style={styles.overlay}>
                                <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                    View Profit & Loss Analysis
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color={ styles.negative }>
                                    Recommended entry/exit prices
                                </Typography>

                                <Button onClick={ handleWatchlist } style={ styles.button } endIcon={ <NextIcon /> } sx={{ mt: 2 }}>View in Watchlist</Button>
                            </Box>
                        </Card>
                    </Box>
                </Container>
        </React.Fragment>
    )
  
}

export default DashBoard;
