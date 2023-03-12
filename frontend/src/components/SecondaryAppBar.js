import * as React from 'react';
import { Link } from "react-router-dom";

// MUI Components
import { AppBar, Toolbar, Box, Typography, useTheme } from '@mui/material';

// Assets (Images & Icons)
import { ReactComponent as Arrow } from "../assets/icons/arrow-red.svg";

const SecondaryAppBar = (props) => {
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Arrow component={ Link } to={ props.link } />
                    <Typography component={ Link } to={  props.link } sx={{ flexGrow: 1, fontWeight: "bold", ml: 2 }} color={ theme.palette.secondary.main }>
                        { props.text }
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default SecondaryAppBar;