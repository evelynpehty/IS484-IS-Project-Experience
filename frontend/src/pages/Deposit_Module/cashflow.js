import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import moment from "moment";
import * as V from 'victory';
import { Link } from "react-router-dom";

import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Card, CardContent, Typography, AppBar, Toolbar } from "@mui/material";
import { VictoryChart, VictoryLine, VictoryScatter, VictoryArea, VictoryAxis } from 'victory';

import { ReactComponent as Arrow } from "../../assets/icons/arrow-red.svg";

function CashFlow() {
    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: "#4B4948",
            fontSize: "16px"
        },

        button: {
            paddingTop: "8px",
            paddingBottom: "8px",
            borderRadius: "30px",
            fontSize: "12px",
            color: "#4B4948",
            backgroundColor: "#E5E7EC"
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
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Arrow component={ Link } to={  "/account-details" } />
                    <Typography component={ Link } to={  "/account-details" } sx={{ flexGrow: 1, fontWeight: "bold", ml: 2 }} color="#4B4948">
                        Account Overview
                    </Typography>
                </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    );
}

export default CashFlow;