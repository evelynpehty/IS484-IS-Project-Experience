import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';


import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Button, Card, CardContent, Typography, Fab } from "@mui/material";
import { borderBottom } from "@mui/system";

function AccountDetails() {
    // Styling for Account Details Page
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

        card2: {
            marginBottom: "24px",
            borderRadius: "15px",
            padding: 10
        },

        cardContent2: {
            paddingBottom: "16px",
            borderBottom: "1px dashed #BFBFBF"
        },

        positive: {
            color: "#3BB537"
        },

        negative: {
            color: "#E60000"
        }
    }

    /*var newArray = transactionHistoryList.filter(function (el)
    {
        //var transactionDate = new Date(el.transactionDate);
        const transactionDate = moment(el.transactionDate).format("DD-MM-YYYY")
        const newTransactionDate = moment(transactionDate, "DD-MM-YYYY")
        const startDate = moment("15-01-2023", "DD-MM-YYYY")
        const endDate = moment("01-02-2023","DD-MM-YYYY")
       
        return newTransactionDate.isBetween(startDate, endDate,undefined,[]) 
        //return transactionDate <= endDate && transactionDate >= startDate
    }
    );
    console.log(newArray);*/

    const navigate = useNavigate();
    const { id } = useParams()
    const { depositList } = useSelector((state) => state.deposit);
    const { transactionHistoryList } = useSelector((state) => state.deposit);

    const deposit_item = depositList.filter(function (el)
    {
      return el.DepositAccountID === id
    })

    const transaction_item = transactionHistoryList.filter(function (el)
    {
      return el.accountFrom === id || el.accountTo === id
    })

    console.log(transaction_item)
    var accountID = id
    var recent_transactions = transaction_item.slice(0, 3)

    const handleViewAll = () => {
        navigate('/view-transaction-history', {replace: true , state: { transaction_item: transaction_item, id: id } })  
    }

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <Box sx={{ mt: 10, mb: 10 }}>
                    <Card style={ styles.card }>
                        <CardContent style={ styles.cardContent }>
                            <Typography sx={{ fontSize: 12 }} color="white">
                                UBS
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color="white">
                                Savings Account #1
                            </Typography>
                            <Typography sx={{ fontSize: 12 }} color="white">
                                {deposit_item[0].DepositAccountID}
                            </Typography>
                            <Typography sx={{ fontSize: 12 }} textAlign="end" color="white">
                                Available Balance
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="white">
                                SGD ${deposit_item[0].AvailBalance}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Cash Flow</Typography>
                        <Button style={ styles.button } variant="contained">EXPAND</Button>
                    </Grid>

                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Recent Transactions</Typography>
                        <Button style={ styles.button } variant="contained" onClick={handleViewAll}>VIEW ALL</Button>
                    </Grid>

                    <Card style={ styles.card2 } elevation={4}>
                        { recent_transactions.map (( value, index ) => {
                            return (
                                <CardContent style={ (index === recent_transactions.length - 1) ? styles.cardContent : styles.cardContent2 } key={ index }>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color="#4B4948">
                                            {value.transactionID}
                                        </Typography>
                                        <Typography style={ (value.accountFrom === id) ? styles.negative : styles.positive } sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="#4B4948">
                                            {(value.accountFrom === id) ? `- SGD $${ value.transactionAmount.toLocaleString("en-US") }` : `SGD $${ value.transactionAmount.toLocaleString("en-US") }` }
                                        </Typography>
                                    </Grid>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography sx={{ fontSize: 12 }} color="#9197A4">
                                            Bills Payment: BIR
                                        </Typography>
                                        <Typography sx={{ fontSize: 12 }} textAlign="end" color="#9197A4">
                                            { value.transactionDate.replace(" GMT", "") }
                                        </Typography>
                                    </Grid>
                                </CardContent>
                            )
                        })}

                    </Card>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default AccountDetails;