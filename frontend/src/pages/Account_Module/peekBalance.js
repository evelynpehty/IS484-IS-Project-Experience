// Packages
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import moment from "moment";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Stack, Card, CardContent, Typography, useTheme } from "@mui/material";

// Assets (Images & Icons)
import logo from "../../assets/images/logo.png";
import { ReactComponent as LoginIcon } from '../../assets/icons/login-key-white.svg';
import { ReactComponent as PeekBalanceIcon } from '../../assets/icons/peek.svg';

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
            boxShadow: "inset 0px 0px 40px 10px #F7E6E6"
        },

        card2: {
            backgroundColor: theme.palette.neutral.main
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
                                <Button component={ Link } to="/login" style={ styles.loginButton } startIcon={<LoginIcon />} variant="contained">LOGIN</Button>
                            </Stack>
                        </Grid>
                        
                        <Grid xs={ 12 } display={{ xs: "block" }}>
                            <Box
                                sx={{
                                    p: 4,
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr 1fr' },
                                    gap: 2,
                                }}
                            >
                                <Card style={ styles.card }>
                                    <CardContent sx={{ padding: "16px", textAlign: "center" }}>
                                        <PeekBalanceIcon className="small-icon"/>
                                        <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Peek Net Worth
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card style={ styles.card }>
                                    <CardContent sx={{ paddingBottom: "16px", textAlign: "center" }}>
                                        <PeekBalanceIcon className="small-icon"/>
                                        <Typography sx={{ fontSize: 12, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Peek Savings
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default PeekBalance;