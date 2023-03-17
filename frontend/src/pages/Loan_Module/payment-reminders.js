// Packages
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate, Link } from "react-router-dom";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Card, CardContent, Typography, Chip, Paper, useTheme } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";

// Assets (Images & Icons)
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";

function PaymentReminders() {
    // Styling for Loan Account Details Page
    const theme = useTheme()
    const styles = {
        card2: {
            marginBottom: "24px",
            borderRadius: "15px",
            padding: 10
        },

        cardContent: {
            paddingBottom: "16px",
            borderBottom: "1px dashed #BFBFBF"
        },

        label: {
            fontSize: 12
        },

        boldLabel: {
            fontSize: 14,
            fontWeight: "bold"
        }
    }

    // Fetch Data
    const {state} = useLocation(); 
    const { transaction_item, id } = state;

    // Delete Chip
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
      };

    return (
        <React.Fragment>
            <SecondaryAppBar link={ `/loan-account-details/${id}` } text="Loan Details" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    <Card style={ styles.card } elevation={ 4 }>
                        <CardContent style={ styles.cardContent }>
                            <Grid container direction="row" alignItems="center">
                                <Grid xs={6}>
                                    <Typography style={ styles.label } color={ theme.palette.primary.main }>
                                        PERSONAL LOAN
                                    </Typography>
                                    <Typography style={ styles.boldLabel } color="#black">
                                        $2,000.00
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography style={ styles.label } color={ theme.palette.primary.main }>
                                        MONTHLY REPAYMENT
                                    </Typography>
                                    <Typography style={ styles.boldLabel } color="#black">
                                        $400.00
                                    </Typography>
                                </Grid>
                                <Grid xs={12}>
                                    {/* <Chip label="Deletable" onDelete={handleDelete} />
                                    <Chip label="Deletable" onDelete={handleDelete} /> */}
                                    <Paper elevation={ 5 } sx={{ p: 1, borderRadius: 10, mt: 3 }}>
                                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        Remind 1 day before deduction
                                        <DeleteIcon />
                                        </Grid>
                                    </Paper>
                                    <Paper elevation={ 5 } sx={{ p: 1, borderRadius: 10, mt: 3 }}>
                                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        Remind 3 days before deduction
                                        <DeleteIcon />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid xs={12} sx={{ mt: 3 }}>
                                    <AddIcon />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default PaymentReminders;