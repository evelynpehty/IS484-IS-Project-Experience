import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Card, CardContent, Typography, Fab } from "@mui/material";

import { ReactComponent as AddIcon } from "../../assets/icons/plus-line-red.svg";

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

        button: {
            paddingTop: "8px",
            paddingBottom: "8px",
            borderRadius: "30px",
            fontSize: "12px",
            color: "#4B4948",
            backgroundColor: "#E5E7EC"
        },

        card: {
            background: "linear-gradient(to top right, #E69F9F, #E60000)",
            marginBottom: "24px",
            borderRadius: "15px",
            padding: 10
        },

        cardContent: {
            paddingBottom: "16px"
        },

        fabButton: {
            position: "absolute",
            bottom: 80,
            right: 16,
            backgroundColor: "#F7E6E6"
        }
    }

 
    // Get list of deposit account from state
    const { depositList } = useSelector((state) => state.deposit);
    const [isEmpty, setIsEmpty] = useState(false);
    
    if(depositList.length === 0){
        setIsEmpty(true)
    }
    
    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <Box sx={{ mt: 10, mb: 10 }}>
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Deposit Accounts</Typography>
                        <Button style={ styles.button } variant="contained">Manage Accounts</Button>
                    </Grid>

                    { !isEmpty && depositList.map ((value, index) => {
                        return (
                            <Link to={`/account-details/${value.DepositAccountID}`} key={value.DepositAccountID}> 
                            <Card style={ styles.card } key={ index } >
                                <CardContent style={ styles.cardContent }>
                                    <Typography sx={{ fontSize: 12 }} color="white">
                                        UBS
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color="white">
                                        { value.AccountName }
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }} color="white">
                                        { value.DepositAccountID.substr(0, 4) } { value.DepositAccountID.substr(4, 4) } { value.DepositAccountID.substr(8, 4) }
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }} textAlign="end" color="white">
                                        Available Balance
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="white">
                                        SGD ${ value.AvailBalance.toLocaleString("en-US") }
                                    </Typography>
                                </CardContent>
                            </Card>
                            </Link>
                        );
                    })}
                    {/* to beautify */}
                    {isEmpty && <p>you do not hvae any deposit account</p>}
                </Box>

                <Fab style={ styles.fabButton } color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Container>
        </React.Fragment>
    );
}

export default DepositSummary;