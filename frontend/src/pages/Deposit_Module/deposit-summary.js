// Packages
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, useTheme, Card, CardContent } from "@mui/material";

// Customised Components
import MainAppBar from "../../components/MainAppBar";
import WhiteReusableButton from "../../components/WhiteButton";
import OutlinedReusableButton from "../../components/OutlinedButton";
import DepositCard from "../../components/DepositCard";
import EditDepositCard from "../../components/EditDepositCard";
import FabButton from "../../components/FabButton";

// Assets (Images & Icons)
import { ReactComponent as CalculatorIcon } from "../../assets/icons/calculator-line.svg";
import { ReactComponent as EmergencyIcon } from "../../assets/icons/emergency-line-red.svg";
import { ReactComponent as LinkIcon } from "../../assets/icons/link-line-red.svg";

function DepositSummary() {
    // Styling for Deposit Summary Page
    const theme = useTheme();
    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: theme.palette.secondary.main,
            fontSize: "18px"
        },

        smallerLabel: {
            fontWeight: "bold",
            color: theme.palette.secondary.main,
            fontSize: "16px"
        },

        card: {
            background: theme.palette.neutral.main,
            marginBottom: "24px",
            borderRadius: "10px",
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
        }, 

        GreenGradientText: {
            background: "linear-gradient(to top right, #109878, #8AB8B2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        },

        RedGradientText: {
            background: "linear-gradient(to top right, #E60000, #E69F9F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        }
    }

    // Change State of page
    const [show, setShow] = useState(false);

    // Get list of deposit account from state
    const { depositList, cashflow_this_month, totalBalance } = useSelector((state) => state.deposit);
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

                    <Card style={ styles.card }>
                        <CardContent style={ styles.cardContent }>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Grid xs={7}>
                                    <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                        TOTAL BALANCE
                                    </Typography>
                                    <Typography sx={{ fontSize: 20, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                        SGD ${totalBalance.toLocaleString("en-US")}
                                    </Typography>
                                    <Typography sx={{ fontSize: 10 }} color={ theme.palette.secondary.main }>
                                        Across all deposit accounts
                                    </Typography>
                                </Grid>
                                <Grid xs={5}>
                                    <Typography sx={{ fontSize: 10, fontWeight:"bold" }}>
                                        INCOME THIS MONTH
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }} color={ styles.GreenGradientText }>
                                        SGD ${cashflow_this_month.income.toLocaleString("en-US")}
                                    </Typography>
                                    <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                        EXPENSES THIS MONTH
                                    </Typography>
                                    <Typography sx={{ fontSize: 14, fontWeight:"bold" }} color={ styles.RedGradientText }>
                                        SGD ${cashflow_this_month.expenses.toLocaleString("en-US")}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.smallerLabel } >Quick Actions</Typography> 
                        <Box
                            sx={{
                                p: 1,
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr 1fr 1fr' },
                                gap: 2,
                            }}
                        >
                            <Card style={styles.card2}>
                                <CardContent sx={{ pt: "24px", textAlign: "center" }}>
                                    <CalculatorIcon className="small-icon" />
                                    <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Net Worth
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card style={styles.card2}>
                                <CardContent sx={{ pt: "24px", textAlign: "center" }}>
                                    <EmergencyIcon className="small-icon" />
                                    <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Emergency Fund
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card style={styles.card2}>
                                <CardContent sx={{ pt: "24px", textAlign: "center" }}>
                                    <LinkIcon className="small-icon" />
                                    <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Link Accounts
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>

                    { !isEmpty && depositList.map ((value, index) => {
                        return (
                            <Link to={`/account-details/${value.DepositAccountID}`} key={value.DepositAccountID}> 
                                { show === false ? 
                                    <DepositCard index={ index } accountName={ value.AccountName } accountID={ value.DepositAccountID } availableBalance={ value.AvailBalance } chosenColor={value.ChosenColor}/> :
                                    <EditDepositCard index={ index } accountName={ value.AccountName } accountID={ value.DepositAccountID } availableBalance={ value.AvailBalance } chosenColor={value.ChosenColor} link={ `/manage-deposit/${value.DepositAccountID}` } />
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