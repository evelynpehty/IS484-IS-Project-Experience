// Packages
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import moment from 'moment';

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, Card, CardContent, useTheme, Paper, Chip, Button, Stack } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";

function ViewWatchList() {

    return (
        <>
            <SecondaryAppBar link={ `/securities` } text="Securities" /> 
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                </Box>
            </Container>
        </>
    )

    
}

export default ViewWatchList;