import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { Container, Box, Typography, Card, CardContent, useTheme, Chip, Button } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// Customised Components
import MainAppBar from "../../components/MainAppBar";
import WhiteReusableButton from "../../components/WhiteButton";
import OutlinedReusableButton from "../../components/OutlinedButton";
import DepositCard from "../../components/DepositCard";
import EditDepositCard from "../../components/EditDepositCard";
import FabButton from "../../components/FabButton";

// Import icon
import { ReactComponent as Calculator } from "../../assets/icons/calculator-line.svg";
import { ReactComponent as Bell } from "../../assets/icons/bell-line.svg";
import { ReactComponent as Repayment } from "../../assets/icons/paper-fold-text-line.svg";


function LoanSummary() {
    // Styling for Deposit Summary Page
    const theme = useTheme();
    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: "#4B4948",
            fontSize: "16px"
        },

        card: {
            background: "linear-gradient(to top right, #E69F9F, #E60000)",
            marginBottom: "24px",
            borderRadius: "15px",
            padding: 10
        },

        card2: {
            backgroundColor: theme.palette.neutral.main,
            borderRadius: 10
        },

        chip: {
            fontWeight: "bold",
            fontSize: "12px",
            color: theme.palette.neutral.main,
            paddingLeft: "2px",
            paddingRight: "2px",
            background: "linear-gradient(to top right, #FF9364, #F25F33)",
        },

        cardContent: {
            paddingBottom: "16px"
        },
    }

    // Change State of page
    const [show, setShow] = useState(false);

    // Get list of loan account from state
    const { loanList } = useSelector((state) => state.loan);
    const loan_DisplayArray = loanList.accountInformation;

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 20,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: theme.palette.mode === 'light' ? 'linear-gradient(to top right, #E69F9F, #E60000)' : 'linear-gradient(to top right, #E69F9F, #E60000)',
        },
    }));

    // console.log(loan_DisplayArray[0])
    // const { loan_transactionHistoryList } = useSelector((state) => state.loan);
    // console.log(loan_transactionHistoryList)
    const [isEmpty, setIsEmpty] = useState(false);

    // if(loan_DisplayArray.length === 0){
    //     setIsEmpty(true)
    // }

    // !!! fake data used to test the progress bar
    const progress = 50;

    return (
        <React.Fragment>
            <MainAppBar />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    {/* Loan Summary */}
                    <Grid container style={styles.grid} direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={styles.label} variant="h6">Loan Accounts</Typography>
                        {show === false ? <WhiteReusableButton function={() => setShow(prev => !prev)} buttonText="MANAGE ACCOUNTS" /> : <OutlinedReusableButton function={() => setShow(prev => !prev)} buttonText="DONE" />}
                    </Grid>
                    <Card sx={{borderRadius: "15px", mb: 3}}> {/* mb: loan summary card and the word "Quick Actions" too close, add marginBottom 3 */}
                        <Box sx={{
                            p: 2,
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr 1fr' },
                        }}>

                            {/* Loan Summary left side */}
                            <CardContent style={styles.cardContent}>
                                <Typography sx={{ fontSize: 12 }} color="grey">OUTSTANDING LOANS</Typography>
                                <Typography sx={{ fontSize: 18 }} color="#E60000" fontWeight="bold">S$800,000.50</Typography>
                                <Typography sx={{ fontSize: 12 }} color="grey" fontWeight="light">Next Repayment:</Typography>
                            </CardContent>

                            {/* Loan Summary right side */}
                            <CardContent style={styles.cardContent}>
                                <Typography sx={{ fontSize: 12 }} color="grey">TOTAL LOAN AMOUNT</Typography>
                                <Typography sx={{ fontSize: 16 }} color="#E60000" marginBottom="12px">S$200,000.10</Typography>
                                <Typography sx={{ fontSize: 12 }} color="grey">MONTHLY REPAYMENT</Typography>
                                <Typography sx={{ fontSize: 16 }} color="#E60000">S$2,000.10</Typography>
                            </CardContent>
                        </Box>
                    </Card>

                    {/* Quick Tools */}
                    <Grid xs={12} display={{ xs: "block" }}>
                        <Typography style={styles.label} variant="h6">Quick Actions</Typography>
                        <Box
                            sx={{
                                p: 2,
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr 1fr 1fr' },
                                gap: 2,
                            }}
                        >
                            <Card style={styles.card2}>
                                <CardContent sx={{ pt: "24px", textAlign: "center" }}>
                                    <Calculator className="small-icon" />
                                    <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Loan Calculator
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card style={styles.card2}>
                                <CardContent sx={{ pt: "24px", textAlign: "center" }}>
                                    <Bell className="small-icon" />
                                    <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Payment Reminders
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card style={styles.card2}>
                                <CardContent sx={{ pt: "24px", textAlign: "center" }}>
                                    <Repayment className="small-icon" />
                                    <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Repayment History
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>

                    {/* Cards of every loan account */}
                    {/* !!! need to use map to auto populate according to number of loan the customer has */}
                    <Card style={styles.card}>
                        <CardContent style={styles.cardContent}>
                            <Typography sx={{ fontSize: 12 }} color="white">
                                UBS Mortgage First Home
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight: "bold" }} color="white">
                                Mortgage Loan <Chip style={styles.chip} size="small" label={`50 %`} />
                            </Typography>
                            <Typography sx={{ fontSize: 12 }} color="white">
                                S$2,000 due on 21 Apr 2021 {/* !!! here need to connect the repayment value and date */}
                            </Typography>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{mt:1, mb: 2}}>
                                    <Grid xs={12}>
                                        <BorderLinearProgress variant="determinate" value={progress} />
                                        <Typography sx={{ fontSize: 14, fontWeight:"light", textAlign: "center" }} color="#E60000">                                        </Typography>
                                    </Grid>
                                </Grid>
                            <Typography sx={{ fontSize: 12 }} textAlign="end" color="white">
                                Outstanding Amount
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight: "thin" }} textAlign="end" color="white">
                                SGD $1,200,000
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* to beautify */}
                    {isEmpty && <p>You do not have any loan account</p>}
                </Box>
                <FabButton />
            </Container>
        </React.Fragment>
    )
}

export default LoanSummary;