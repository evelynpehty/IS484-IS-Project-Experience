import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Container, TextField, Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Stack } from '@mui/system';

import MainAppBar from "../../components/MainAppBar";
import MainBottomNavigation from "../../components/MainBottomNavigation";

import "../../styles/main.css";

function DepositSummary() {
    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <Box sx={{ mt: 15, mb: 15 }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1">Deposit Accounts</Typography>
                        <Button variant="contained">Manage Accounts</Button>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default DepositSummary;