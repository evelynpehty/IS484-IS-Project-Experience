import * as React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from '@mui/material/Unstable_Grid2';
import { Container, TextField, Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Stack } from '@mui/system';

import Loading from '../../components/loading.js'

import '../../styles/main.css';
import '../../styles/login.css';


import logo from "../../assets/images/logo.png";
import { ReactComponent as Savings } from "../../assets/icons/savings-red.svg";
import { ReactComponent as Loans } from "../../assets/icons/loans-red.svg";
import { ReactComponent as Investments } from "../../assets/icons/investments-red.svg";
import { ReactComponent as Personalise } from "../../assets/icons/personalise-red.svg";
import { ReactComponent as Plans } from "../../assets/icons/plans-red.svg";
import { ReactComponent as CashFlow } from "../../assets/icons/cashflow-red.svg";
import { ReactComponent as Recommendations } from "../../assets/icons/recommendations-red.svg";

//import account_service from "../services/account.js";
import { login } from "../../actions/auth";
import { useNavigate } from "react-router-dom";

function SignIn() {
    // Styling for Login Page
    const styles = {
        grid: {
            margin: "auto"
        },

        paragraph: {
            fontWeight: "bold",
            color: "#9197A4",
            marginBottom: "10px"
        },

        card: {
            backgroundColor: "white"
        }
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const { isLoggedIn } = useSelector(state => state.auth);    
    const { message } = useSelector(state => state.message);
    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true);
        
        dispatch(login(username, password)).then(() => {
            navigate("/dashboard")
        }).catch(() => {
            setLoading(false)
            console.log(message)
        });
    }

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    return (
        <Container maxWidth="xl">
            {/* { loading && <Loading></Loading> } */}
            <Box sx={{ m: 5 }}>
                <Grid container style={ styles.grid }>
                    <Grid xs={12} lg={6}>
                            <Stack spacing={4} mb={5} alignItems="center">
                                <Box
                                    component="img"
                                    sx={{
                                        maxHeight: { xs: 150, sm: 180, md: 200, lg: 230, xl: 300 },
                                        maxWidth: { xs: 150, sm: 180, md: 200, lg: 230, xl: 300 },
                                    }}
                                    alt="logo"
                                    src={ logo }
                                />
                                <form onSubmit={handleLogin}>
                                    <TextField
                                        required
                                        id="inputUsername"
                                        name='username'
                                        label="Username"
                                        value={username}
                                        onChange={onChangeUsername}
                                        fullWidth={ true }
                                        sx={{ mb: 5 }}
                                        
                                    />
                                    <TextField
                                        required
                                        id="inputPassword"
                                        name="password"
                                        label="Password"
                                        value={password}
                                        onChange={onChangePassword}
                                        type="password"
                                        fullWidth={ true }
                                        sx={{ mb: 5 }}
                                        
                                    />
                                    <Button type="submit" id="loginBtn" variant="contained" fullWidth={ true }>LOG IN</Button>
                                </form>
                        
                                <Button sx={{ color: "gray" }} fullWidth={ true }>FORGOT PASSWORD</Button>
                                <p style={ styles.paragraph }>or</p>
                                <Button id="registerBtn" variant="contained" fullWidth={ true }>REGISTER</Button>
                                <Typography variant="subtitle2" align="center">Privacy Policy & Terms and Conditions</Typography>
                            </Stack>
                    </Grid>
                    <Grid container lg={6} display={{ xs: "none", sm: "none", lg: "block" }} alignItems="center" >
                        <Typography variant="p" style={ styles.paragraph } sx={{ paddingLeft: "64px" }}>Quick Actions</Typography>
                        <Box
                            sx={{
                                p: 8,
                                display: 'grid',
                                gridTemplateColumns: { md: '1fr 1fr' },
                                gap: 2,
                            }}
                        >
                            <Card style={ styles.card }>
                                <CardContent sx={{ p: 4, textAlign: "center" }}>
                                    <Savings className="small-icon"/>
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                    Savings
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent sx={{ p: 4, textAlign: "center" }}>
                                    <Loans className="small-icon"/>
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                    Loans
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent sx={{ p: 4, textAlign: "center" }}>
                                    <Investments className="small-icon"/>
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                    Investments
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent sx={{ p: 4, textAlign: "center" }}>
                                    <Personalise className="small-icon"/>
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                    Personalise
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent sx={{ p: 4, textAlign: "center" }}>
                                    <Savings className="small-icon"/>
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                    Net Worth
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent sx={{ p: 4, textAlign: "center" }}>
                                    <Plans className="small-icon"/>
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                    Plans
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent sx={{ p: 4, textAlign: "center" }}>
                                    <CashFlow className="small-icon"/>
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                    Cashflow
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent sx={{ p: 4, textAlign: "center" }}>
                                    <Recommendations className="small-icon"/>
                                    <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                    Recommendations
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default SignIn;