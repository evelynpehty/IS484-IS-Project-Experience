// Packages
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QuickAction } from "../../actions/auth";



// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Stack, Card, CardContent, Typography, useTheme } from "@mui/material";

// Assets (Images & Icons)
import logo from "../../assets/images/logo.png";
import { ReactComponent as LoginIcon } from '../../assets/icons/login-key-white.svg';
import { ReactComponent as PeekBalanceIcon } from '../../assets/icons/peek.svg';
import { ReactComponent as Savings } from "../../assets/icons/savings-red.svg";
import { ReactComponent as Loans } from "../../assets/icons/loans-red.svg";
import { ReactComponent as Investments } from "../../assets/icons/investments-red.svg";
import { ReactComponent as Personalise } from "../../assets/icons/personalise-red.svg";

function PeekBalance() {
    // Styling for Account Details Page
    const theme = useTheme();
    const styles = {
        grid: {
            margin: "auto"
        },

        loginButton: {
            background: "linear-gradient(to top right, #E69F9F, #E60000)"
        },

        card: {
            backgroundColor: theme.palette.neutral.main,
            boxShadow: "inset 0px 0px 40px 10px #F7E6E6",
            borderRadius: 10
        },

        card2: {
            backgroundColor: theme.palette.neutral.main,
            borderRadius: 10
        },

        label: {
            color: "#4B4948",
            fontSize: "18px",
            paddingLeft: "16px",
            marginTop: "16px"
        },

        terms: {
            marginTop: "20px",
            color: theme.palette.neutral.gray,
            fontSize: "14px"
        },

        peekBox: {
            boxShadow: "0 0 2em rgba(230, 0, 0, 0.1)",
            padding: "20px 80px",
            textAlign: "center"
        }
    }

    const [show, setShow] = useState(false);
    const [type, setType] = useState("");
    const date = new Date();
    const formattedDate = date.toDateString() + date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })
    const { user: currentUser } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    function handlePeek( selected ) {
        setType(selected)
        setShow(prev => !prev)
    }

    function handleLogin(route){
        console.log(route)
        dispatch(QuickAction(route))
        navigate("/login")
    }

    function handleClick(route){
        console.log(route)
        dispatch(QuickAction(route))
        if(!currentUser){
            navigate("/login")
        }        
    }

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <Grid container style={ styles.grid } justifyContent="center  ">
                        <Grid xs={ 12 }>
                            <Stack spacing={4} mb={5} alignItems="center">
                                <Box
                                    component="img"
                                    sx={{
                                        maxHeight: { xs: 150, sm: 180, md: 200, lg: 230, xl: 300 },
                                        maxWidth: { xs: 150, sm: 180, md: 200, lg: 230, xl: 300 }
                                    }}
                                    alt="logo"
                                    src={ logo }
                                />
                                
                                { show === false && 
                                    <Button component={ Link } to="/login" style={ styles.loginButton } startIcon={<LoginIcon />} variant="contained">
                                        LOGIN
                                    </Button> 
                                }

                                { show && type==="networth" &&
                                    <Box style={ styles.peekBox }>
                                        <Typography sx={{ fontSize: 16 }} color={ theme.palette.secondary.main } gutterBottom>
                                            Your Net Worth
                                        </Typography>
                                        <Typography sx={{ fontSize: 24, fontWeight: "bold" }} color={ theme.palette.secondary.main } gutterBottom>
                                            $15,296.50
                                        </Typography>
                                        <Typography sx={{ fontSize: 10 }} color={ theme.palette.neutral.gray } gutterBottom>
                                            { `Last Updated: ${ formattedDate }` }
                                        </Typography>
                                    </Box>
                                }

                                { show && type==="savings" &&
                                    <Box style={ styles.peekBox }>
                                        <Typography sx={{ fontSize: 16 }} color={ theme.palette.secondary.main } gutterBottom>
                                            Your Savings
                                        </Typography>
                                        <Typography sx={{ fontSize: 24, fontWeight: "bold" }} color={ theme.palette.secondary.main } gutterBottom>
                                            $4,508.90
                                        </Typography>
                                        <Typography sx={{ fontSize: 10 }} color={ theme.palette.neutral.gray } gutterBottom>
                                            { `Last Updated: ${ formattedDate }` }
                                        </Typography>
                                    </Box>
                                }
                            </Stack>
                        </Grid>
                        
                        <Grid xs={ 12 } display={{ xs: "block" }}>
                            <Box
                                sx={{
                                    p: 2,
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr 1fr' },
                                    gap: 2,
                                }}
                            >
                                <Card style={ styles.card } onMouseDown={ () => handlePeek("networth") }>
                                    <CardContent sx={{  pt: "24px", textAlign: "center" }}>
                                        <PeekBalanceIcon className="small-icon"/>
                                        <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Peek Net Worth
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card style={ styles.card } onMouseDown={ () => handlePeek("savings") }> 
                                    <CardContent sx={{  pt: "24px", textAlign: "center" }}>
                                        <PeekBalanceIcon className="small-icon"/>
                                        <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Peek Savings
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>

                        <Grid xs={ 12 } display={{ xs: "block" }}>
                            <Typography style={ styles.label } variant="h6">Quick Actions</Typography>
                            <Box
                                sx={{
                                    p: 2,
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr 1fr' },
                                    gap: 2,
                                }}
                            >
                                <Card style={ styles.card2 }  onClick={()=>handleClick("deposit")}>
                                    <CardContent sx={{ pt: "24px", textAlign: "center" }}>
                                        <Savings className="small-icon"/>
                                        <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Savings
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card style={ styles.card2 }>
                                    <CardContent sx={{  pt: "24px", textAlign: "center" }} onClick={()=>handleClick("loan")}>
                                        <Loans className="small-icon"/>
                                        <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Loans
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card style={ styles.card2 }>
                                    <CardContent sx={{  pt: "24px", textAlign: "center" }} onClick={()=>handleClick("securities")}>
                                        <Investments className="small-icon"/>
                                        <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Securities
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card style={ styles.card2 }>
                                    <CardContent sx={{  pt: "24px", textAlign: "center" }} onClick={()=>handleClick("dashboard")}>
                                        <Personalise className="small-icon"/>
                                        <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Personalise
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                            <Typography style={ styles.terms } align="center">Privacy Policy & Terms and Conditions</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default PeekBalance;