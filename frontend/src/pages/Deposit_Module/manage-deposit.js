// Packages
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

// MUI Components
import { Container, Box, Typography, Paper, useTheme, styled } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import PrimaryButton from "../../components/PrimaryButton";
import WhiteReusableButton from "../../components/WhiteButton";
import OutlinedReusableButton from "../../components/OutlinedButton";
import DepositCard from "../../components/DepositCard";
import EditDepositCard from "../../components/EditDepositCard";
import FabButton from "../../components/FabButton";
import InputBox from "../../components/InputBox"

function ManageDeposit() {
    // Styling for Manage Deposit Page
    const theme = useTheme();
    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: "#4B4948",
            fontSize: "18px"
        },

        inputLabel: {
            color: "#4B4948",
            fontSize: "12px",
            marginTop: "16px"
        },

        fabButton: {
            position: "absolute",
            bottom: 80,
            right: 16,
            backgroundColor: "#F7E6E6"
        }
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
        borderRadius: 50,
      }));

    const { id } = useParams()
    const { depositList } = useSelector((state) => state.deposit);
    const deposit_item = depositList.filter(function (el)
    {
      return el.DepositAccountID === id
    })

    return (
        <React.Fragment>
            <SecondaryAppBar link={ "/deposit" } text="All Accounts" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>

                    {/* Account Type */}
                    <Typography style={ styles.label }>Account Type</Typography>
                    <Typography style={ styles.inputLabel }>Account Type</Typography>
                    <InputBox disabled={ true } value={ deposit_item[0].ProductID } />
                    
                    {/* Account Name */}
                    <Typography style={ styles.label }>Enter a Name</Typography>
                    <Typography style={ styles.inputLabel }>Name of Account</Typography>
                    <InputBox placeholder="Give a name for your account" defaultValue={ deposit_item[0].AccountName } />
                    
                    {/* Appearance */}
                    <Typography style={ styles.label }>Appearance</Typography>
                    <Typography style={ styles.inputLabel }>Select a Colour</Typography>
                    <Box
                        sx={{
                            mt: "16px",
                            mb: "48px",
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr 1fr 1fr 1fr 1fr' },
                            gap: 2,
                        }}
                    >
                        <Item sx={{ background: "linear-gradient(to top right, #E69F9F, #E60000)" }}></Item>
                        <Item sx={{ background: "linear-gradient(to top right, #DBBB9E, #FF7D1F)" }}></Item>
                        <Item sx={{ background: "linear-gradient(to top right, #A4B6D2, #0085FF)" }}></Item>
                        <Item sx={{ background: "linear-gradient(to top right, #B5A4D2, #745DFF)" }}></Item>
                        <Item sx={{ background: "linear-gradient(to top right, #D2A4C5, #FF42BF)" }}></Item>
                    </Box>

                    <PrimaryButton buttonText="SAVE" />          
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default ManageDeposit;