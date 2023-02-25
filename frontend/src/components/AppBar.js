import * as React from 'react';
import { useDispatch } from "react-redux";
import { AppBar, Toolbar, Box, Typography, IconButton, MenuItem, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

import '../styles/main.css';
import account_service from "../services/account.js";

import logo from "../assets/images/appbar_logo.png";
import { logout } from "../actions/auth";

import { ReactComponent as User } from "../assets/icons/user-red.svg";

function MenuAppBar() {
    const navigate = useNavigate();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    // const handleChange = (event) => {
    //   setAuth(event.target.checked);
    // };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogOut = () => {
        dispatch(logout());
        navigate("/")

      };
  

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="primary">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="div" sx={{ flexGrow: 1, textAlign:"center" }}>
                <Box
                    component="img"
                    sx={{
                        maxHeight: { xs: 130, sm: 150, md: 180, lg: 200, xl: 220 },
                        maxWidth: { xs: 130, sm: 150, md: 180, lg: 200, xl: 220 },
                    }}
                    alt="logo"
                    src={ logo }
                />
                </Typography>
                {auth && (
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <User />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                    </Menu>
                </div>
                )}
            </Toolbar>
            </AppBar>
        </Box>
    );
}

export default MenuAppBar;