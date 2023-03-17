// Packages
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate, Link } from "react-router-dom";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Card, CardContent, Typography, Chip, Paper, Modal, InputLabel, FormControl, MenuItem, Select, Button, useTheme } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import NeutralButton from "../../components/NeutralButton";

// Assets (Images & Icons)
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";

function PaymentReminders() {
    // Styling for Loan Account Details Page
    const theme = useTheme()
    const styles = {
        card: {
            marginBottom: "24px",
            borderRadius: "15px",
            padding: 10
        },

        cardContent: {
            paddingBottom: "16px"
        },

        label: {
            fontSize: 12
        },

        boldLabel: {
            fontSize: 14,
            fontWeight: "bold"
        },

        modal: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "80%",
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 3,
        },

        modalHeader: {
            fontSize: "18px",
            fontWeight: "bold",
            color: theme.palette.primary.main
        }
    }

    // Fetch Data
    const {state} = useLocation(); 
    const { id } = state;
    const { loanList } = useSelector((state) => state.loan);
    const loan_DisplayArray = loanList.accountInformation
    console.log(loan_DisplayArray)

    // Delete Chip
    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    // Modal Component Functions
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const num_array = [ ...Array(100).keys() ];

    return (
        <React.Fragment>
            <SecondaryAppBar link={ `/loan-account-details/${id}` } text="Loan Details" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    { loan_DisplayArray.map((value, index) => {
                        return (
                        <Card style={ styles.card } elevation={ 4 }>
                            <CardContent style={ styles.cardContent }>
                                <Grid container direction="row" alignItems="center">
                                    <Grid xs={6}>
                                        <Typography style={ styles.label } color={ theme.palette.primary.main }>
                                            { value.AccountName.toUpperCase() }
                                        </Typography>
                                        <Typography style={ styles.boldLabel }>
                                            ${value.LoanAmount.toLocaleString("en-US")}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={6}>
                                        <Typography style={ styles.label } color={ theme.palette.primary.main }>
                                            MONTHLY REPAYMENT
                                        </Typography>
                                        <Typography style={ styles.boldLabel } color="#black">
                                            ${ value.Detail.monthly_payment.toLocaleString("en-US") }
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
                                        <Box onClick={ handleOpen }>
                                            <AddIcon />
                                        </Box>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={styles.modal}>
                                                <Typography style={ styles.modalHeader }>
                                                    Add Recurring Reminder
                                                </Typography>
                                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                                    <Grid xs={7}>
                                                        <FormControl variant="standard" sx={{ m: 1, width: "80%" }}>
                                                            <InputLabel id="demo-simple-select-standard-label">Before Deduction</InputLabel>
                                                            <Select
                                                            required
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            // value={age}
                                                            // onChange={handleChange}
                                                            label="Before Deduction"
                                                            >
                                                                { num_array.map(index => <MenuItem value={ index+1 }>{ index+1 }</MenuItem>) }
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid xs={5}>
                                                        <FormControl variant="standard" sx={{ m: 1, width: "80%" }}>
                                                            <InputLabel id="demo-simple-select-standard-label">Period</InputLabel>
                                                            <Select
                                                            required
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            // value={age}
                                                            // onChange={handleChange}
                                                            label="Period"
                                                            >
                                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                <MenuItem value="day">Day</MenuItem>
                                                                <MenuItem value="week">Week</MenuItem>
                                                                <MenuItem value="month">Month</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            
                                                <Grid container direction="row" justifyContent="end" alignItems="center">
                                                    <NeutralButton function={ handleClose } text="CANCEL" />
                                                    <NeutralButton text="SAVE" />
                                                </Grid>
                                            </Box>
                                        </Modal>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        )               
                    })}
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default PaymentReminders;