// Packages
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate, Link } from "react-router-dom";
import moment from 'moment';

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Card, CardContent, Alert, Stack, Typography, AlertTitle, Chip, Paper, Modal, InputLabel, FormControl, MenuItem, Select, Button, useTheme } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import NeutralButton from "../../components/NeutralButton";

// Assets (Images & Icons)
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";
import PrimaryButton from "../../components/PrimaryButton";
import {loan, updateLoanReminder,removeLoanReminder } from "../../actions/loan";
import Loading from '../../components/loading.js'

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
            fontSize: 12,
            fontWeight: "bold",
            background: "linear-gradient(to top right, #E60000, #E69F9F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        },

        boldLabel: {
            fontSize: 14,
            fontWeight: "bold",
            color: theme.palette.secondary.main 
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
            background: "linear-gradient(to top right, #E60000, #E69F9F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        }
    }

    // Fetch Data
    const { user } = useSelector((state) => state.auth);
    const UserID = user.data.UserID

    const {state} = useLocation(); 
    const { loan_item, id } = state;

    const [tempReminderArray, setTempReminderArray] = useState(loan_item[0].Reminder.data)
    const [toAdd, setToAdd] = useState([])
    const [toDelete, setToDelete] = useState([])
    const [days, setDays] = useState(1)
    const [period, setPeriod] = useState("day")
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false);
    const [repaymentDate, setRepaymentDate] = useState("");
    
    const dispatch = useDispatch()

    useEffect(() => {
        const currentMonth = moment().month() +1 // jan=0, dec=11
        const currentYear = moment().year() 
        var r_date = currentMonth + "/1/" + currentYear //fixed repayment date to be first of the month
        var next_repayment = (moment(r_date).add(1, 'M')).format("DD MMM YYYY")
        setRepaymentDate(next_repayment)
    }, []);

    const handleAdd = () => {
        setStatus("")

        const input = {
            "loanAccountID": id,
            "ReminderType": `Remind ${days} ${period} before deduction`
        }

        tempReminderArray.push(input)
        toAdd.push(input)
        setOpen(false)
    }

    // Delete Chip
    function handleDelete (reminder_obj) {
        setStatus("")

        if (reminder_obj.hasOwnProperty("LoanReminderID")) {
            const filter = tempReminderArray.filter(function (el) {
                return el.LoanReminderID !== reminder_obj.LoanReminderID;
            });
            setTempReminderArray(filter)
            toDelete.push(reminder_obj.LoanReminderID)
        }  
        else{
            const filter = tempReminderArray.filter(function (el) {
                return el !== reminder_obj;
            });
            setTempReminderArray(filter)

            const filter2 = toAdd.filter(function (el) {
                return el !== reminder_obj;
            });
            setToAdd(filter2)
        } 
    };

    const handleSave = () => {
        setStatus("")
        setLoading(true)
        const promiseArray = [] 

        if(toAdd.length !== 0){
            toAdd.forEach(input => {
                promiseArray.push(dispatch(updateLoanReminder(input)))
            });
        }

        if(toDelete.length !== 0){
            toDelete.forEach(r_id =>{
                promiseArray.push(dispatch(removeLoanReminder(r_id)))
            })
        }
        
        promiseArray.push(dispatch(loan(UserID)))
        Promise.all(promiseArray).then(()=>{
            setStatus("success")
            setLoading(false)
        }).catch((error)=>{
            setStatus("error")
            setLoading(false)
        })
    }

    // Modal Component Functions
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const num_array = [ ...Array(100).keys() ];

    return (
        <React.Fragment>
             { loading && <Loading></Loading> } 
            <SecondaryAppBar link={ `/loan-account-details/${id}` } text="Loan Details" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    {status==="success" && <Stack sx={{ width: '100%', mb:2 }} spacing={2}>
                        <Alert severity="success" onClose={() => {setStatus("")}}>
                            <AlertTitle>Success</AlertTitle>
                            {"Loan Reminder Updated!"}
                        </Alert>
                    </Stack>}

                    {status==="error" && <Stack sx={{ width: '100%', mb:2 }} spacing={2}>
                        <Alert severity="error" onClose={() => {setStatus("")}}>
                            <AlertTitle>Error</AlertTitle>
                            {"Fail to Update. Please Try Again"}
                        </Alert>
                    </Stack>}

                    { loan_item.map((value, index) => {
                        return (
                            <>
                            <Typography sx={{ fontWeight: "bold", color: theme.palette.secondary.main, fontSize: "16px", mb:2}} variant="h6"> { value.AccountName.toUpperCase() }</Typography>
                            
                            <Card style={ styles.card } elevation={ 4 }>
                                 
                                <CardContent style={ styles.cardContent }>
                                    <Grid container direction="row" alignItems="center">
                                        <Grid xs={6}>
                                            <Typography style={ styles.label } color={ theme.palette.primary.main }>
                                                NEXT REPAYMENT
                                            </Typography>
                                            <Typography style={ styles.boldLabel }>
                                                 { repaymentDate }
                                            </Typography>
                                        </Grid>
                                        <Grid xs={6}>
                                            <Typography style={ styles.label } color={ theme.palette.primary.main }>
                                                MONTHLY REPAYMENT
                                            </Typography>
                                            <Typography style={ styles.boldLabel } color={ theme.palette.secondary.main }>
                                                ${ value.Detail.monthly_payment.toLocaleString("en-US") }
                                            </Typography>
                                        </Grid>
                                        <Grid xs={12}>
                                            {
                                                tempReminderArray.map((reminder, index) => {
                                                    return (
                                                        <>
                                                            <Paper elevation={ 5 } sx={{ p: 1, borderRadius: 10, mt: 3 }}>
                                                                <Grid key={index} container direction="row" justifyContent="space-between" alignItems="center" sx={{ fontWeight: "bold" }} color={ theme.palette.secondary.main }>
                                                                    {reminder.ReminderType}
                                                                    <DeleteIcon onClick={()=>handleDelete(reminder)}/>
                                                                </Grid>
                                                            </Paper>
                                                        </>
                                                    )
                                                })
                                            }
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
                                                                value={days}
                                                                onChange={e => setDays(e.target.value)}
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
                                                                value={period}
                                                                onChange={e => setPeriod(e.target.value)}
                                                                label="Period"
                                                                >
                                                                    <MenuItem value="day">Day</MenuItem>
                                                                    <MenuItem value="week">Week</MenuItem>
                                                                    <MenuItem value="month">Month</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                
                                                    <Grid container direction="row" justifyContent="end" alignItems="center">
                                                        <NeutralButton function={ handleClose } text="CANCEL" />
                                                        <NeutralButton text="SAVE" function={ handleAdd }/>
                                                    </Grid>
                                                </Box>
                                            </Modal>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            </>
                        
                        )               
                    })}
                <   PrimaryButton buttonText="SAVE" function={handleSave}/>  
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default PaymentReminders;