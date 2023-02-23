import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { TextField, Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Stack } from '@mui/system';

import './main.css';
import './styles/login.css';

import logo from "./assets/images/logo.png";
import { ReactComponent as Savings } from "./assets/icons/savings-red.svg";
import { ReactComponent as Loans } from "./assets/icons/loans-red.svg";
import { ReactComponent as Investments } from "./assets/icons/investments-red.svg";
import { ReactComponent as Personalise } from "./assets/icons/personalise-red.svg";
import { ReactComponent as Plans } from "./assets/icons/plans-red.svg";
import { ReactComponent as CashFlow } from "./assets/icons/cashflow-red.svg";
import { ReactComponent as Recommendations } from "./assets/icons/recommendations-red.svg";

function SignIn() {
    return (
        <div className="SignIn">
            <Grid container>
                <Grid xs={12} lg={6}>
                    <Box p={8}>
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
                            <TextField
                                required
                                id="inputUserID"
                                label="User ID"
                                fullWidth={ true }
                            />
                            <TextField
                                required
                                id="inputPassword"
                                label="Password"
                                type="password"
                                fullWidth={ true }
                            />
                            <Button id="loginBtn" variant="contained" fullWidth={ true }>LOG IN</Button>
                            <Button sx={{ color: "gray" }} fullWidth={ true }>FORGOT PASSWORD</Button>
                            <p>or</p>
                            <Button id="registerBtn" variant="contained" fullWidth={ true }>REGISTER</Button>
                            <a href="#">Privacy Policy & Terms and Conditions</a>
                        </Stack>
                    </Box>
                </Grid>
                <Grid container lg={6} display={{ xs: "none", sm: "none", lg: "block" }} alignItems="center" >
                    <p className="quickAction">Quick Actions</p>
                    <Box
                        sx={{
                            p: 8,
                            display: 'grid',
                            gridTemplateColumns: { md: '1fr 1fr' },
                            gap: 2,
                        }}
                    >
                        <Card>
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
        </div>
    );
}

export default SignIn;