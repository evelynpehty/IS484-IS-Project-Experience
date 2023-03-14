import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography } from "@mui/material";

// Customised Components
import MainAppBar from "../../components/MainAppBar";
import WhiteReusableButton from "../../components/WhiteButton";
import OutlinedReusableButton from "../../components/OutlinedButton";
import DepositCard from "../../components/DepositCard";
import EditDepositCard from "../../components/EditDepositCard";
import FabButton from "../../components/FabButton";


function LoanSummary() {
    // Styling for Deposit Summary Page
    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: "#4B4948",
            fontSize: "16px"
        }
    }

    // Change State of page
    const [show, setShow] = useState(false);

    // Get list of loan account from state
    const { loanList } = useSelector((state) => state.loan);
    const loan_DisplayArray = loanList.accountInformation

    console.log(loan_DisplayArray[0])
    // const { loan_transactionHistoryList } = useSelector((state) => state.loan);
    // console.log(loan_transactionHistoryList)
    const [isEmpty, setIsEmpty] = useState(false);
    
    if(loan_DisplayArray.length === 0){
        setIsEmpty(true)
    }

    return (
        <React.Fragment>
            <MainAppBar />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Loan Accounts</Typography>
                        { show === false ? <WhiteReusableButton function={ () => setShow(prev => !prev) } buttonText="MANAGE ACCOUNTS" /> : <OutlinedReusableButton function={ () => setShow(prev => !prev) } buttonText="DONE" /> }           
                    </Grid>

                    <Link to={`/loan-account-details/${loan_DisplayArray[0].LoanAccountID}`}>ID</Link>
                    {/* to beautify */}
                    {isEmpty && <p>You do not have any loan account</p>}
                </Box>
                <FabButton />
            </Container>
        </React.Fragment>
    )
}

export default LoanSummary;