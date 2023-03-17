// Packages
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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

function DepositSummary() {
    // Styling for Deposit Summary Page
    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: "#4B4948",
            fontSize: "16px"
        },

        fabButton: {
            position: "absolute",
            bottom: 80,
            right: 16,
            backgroundColor: "#F7E6E6"
        }
    }

    // Change State of page
    const [show, setShow] = useState(false);

    // Get list of deposit account from state
    const { depositList } = useSelector((state) => state.deposit);
    const [isEmpty, setIsEmpty] = useState(false);
    
    if(depositList.length === 0){
        setIsEmpty(true)
    }
    
    return (
        <React.Fragment>
            <MainAppBar />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Deposit Accounts</Typography>
                        { show === false ? <WhiteReusableButton function={ () => setShow(prev => !prev) } buttonText="MANAGE ACCOUNTS" /> : <OutlinedReusableButton function={ () => setShow(prev => !prev) } buttonText="DONE" /> }           
                    </Grid>

                    { !isEmpty && depositList.map ((value, index) => {
                        return (
                            <Link to={`/account-details/${value.DepositAccountID}`} key={value.DepositAccountID}> 
                                {/* <DepositCard index={ index } accountName={ value.AccountName } accountID={ value.DepositAccountID } availableBalance={ value.AvailBalance } /> */}
                                { show === false ? 
                                    <DepositCard index={ index } accountName={ value.AccountName } accountID={ value.DepositAccountID } availableBalance={ value.AvailBalance } /> :
                                    <EditDepositCard index={ index } accountName={ value.AccountName } accountID={ value.DepositAccountID } availableBalance={ value.AvailBalance } link={ `/manage-deposit/${value.DepositAccountID}` } />
                                }
                            </Link>
                        );
                    })}
                    {/* to beautify */}
                    {isEmpty && <p>You do not have any deposit account</p>}
                </Box>
                <FabButton />
            </Container>
        </React.Fragment>
    );
}

export default DepositSummary;