// Packages
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, Card, CardContent, useTheme, Paper, Chip, Button } from "@mui/material";

// Customised Components
import MainAppBar from "../../components/MainAppBar";

function SecuritiesDetails() {
    

    return (
        <React.Fragment>
            <MainAppBar />
            <Container maxWidth="lg">
                
            </Container>
            
        </React.Fragment>
    );
}

export default SecuritiesDetails;