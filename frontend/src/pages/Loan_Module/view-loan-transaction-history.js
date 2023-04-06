// Packages
import * as React from 'react';
import { useEffect, useState } from "react";
import moment from 'moment';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, Accordion, AccordionDetails, AccordionSummary, Stack, Chip, useTheme } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";

// Assets (Images & Icons)
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function LoanTransactionHistory() { 
    const theme = useTheme()
    const styles = {
        grid: {
            marginBottom: "24px",
            paddingRight: "16px",
            paddingLeft: "16px"
        },

        label: {
            fontWeight: "bold",
            color: "#4B4948",
            fontSize: "16px"
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

        negative: {
            color: theme.palette.primary.main
        },

        iconButton: {
            border: "1px solid #BFBFBF",
            borderRadius: "10px"
        },

        boxContent: {
            marginBottom: 0
        },

        boxContent2: {
            marginBottom: 10
        },

        stackChip: {
            overflow: "auto",
            paddingLeft: "16px",
            paddingRight: "16px"
        },
        
        chipSelected: {
            backgroundColor:theme.palette.secondary.light,
        }, 

        chipUnSelected: {
            backgroundColor: theme.palette.neutral.main,
        }
    }

    const {state} = useLocation(); 
    const { loan_item, id } = state;

    const monthly_payment = loan_item.Detail.monthly_payment
    const LoanStartDate = loan_item.LoanStartDate
    const LoanMaturity = loan_item.LoanMaturityDate
    const schedule_for_payment = loan_item.Detail.schedule_for_payment

    const [chipValue, setChipValue] = useState([]);
    const [selectedChip, setSelectedChip] = useState("");
    const [transactionDisplay, setTransDisplay] = useState([]);
    const [originalDisplay, setOriginalDisplay] = useState([]);

    useEffect(() => {
        var curr = moment(LoanStartDate).year()
        var yearRange = []
        for(let x = curr; x <= moment().year(); x++){
            yearRange.push(curr.toString())
            curr += 1
        }
        setChipValue(yearRange)

        const currentMonth = moment().month() +1 // jan=0, dec=11
        const currentYear = moment().year() 
        var r_date = currentMonth + "/1/" + currentYear //fixed repayment date to be first of the month
        const monthDifference =  Math.ceil(moment(new Date(r_date)).diff(new Date(LoanStartDate), 'months', true));
        const display = []

        for(var i=monthDifference; i>0; i--){
            var obj = {"date": "", "item": ""}
            obj["date"] = moment(r_date).format('MMM YYYY')
            obj["item"] = Object.assign({}, schedule_for_payment[i]);
            display.push(obj)
            r_date = moment(r_date).subtract(1, 'months')
        }
        setOriginalDisplay(display)
        setTransDisplay(display)


    }, []);

    function handleChip(item){
        if (item === selectedChip){
            item = ""
            setSelectedChip("")
        } else{
            setSelectedChip(item)
        }
        if(item !== ""){
            var filtered = []
            originalDisplay.forEach(element => {
                if(element.date.split(" ")[1].toString() === item.toString()){
                    filtered.push(element)
                }
            });    
            setTransDisplay(filtered)
        }
        else{       
            setTransDisplay(originalDisplay)
        }
    }

    return (
        <React.Fragment>
            <SecondaryAppBar link={ `/loan-account-details/${id}` } text="Loan Details" /> 
            <Container maxWidth="lg" sx={{ p:0 }}>
                <Box sx={{pt: 10, pb: 10 }}>
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Past Payment History</Typography>
                    </Grid>
                    <Stack direction="row" spacing={1} style={ styles.stackChip }>
                        {
                            chipValue.map((item, index) => {
                                return <Chip label={item} id={index} key={index} sx={(item === selectedChip) ? styles.chipSelected : styles.chipUnSelected } variant="outlined" onClick={() => handleChip(item)} />
                            })
                        }
                    </Stack>
                    { transactionDisplay.map((el,i)=> {
                            return (
                                <>
                                    <Accordion key={i} defaultExpanded>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                            sx={{ backgroundColor: "#F8F8F8" }}
                                            >
                                                <Typography sx={{ fontWeight: "bold", color: "#4B4948" }}>
                                                    { el.date } 
                                                </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box>
                                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                                    <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color="#4B4948">
                                                        UBS - {i+1}
                                                    </Typography>
                                                    <Typography style={ styles.negative } sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="#4B4948">
                                                        { `- SGD $${ monthly_payment.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }` }
                                                    </Typography>
                                                </Grid>

                                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                                    <Typography sx={{ fontSize: 12 }} color="#9197A4">
                                                        Monthly Repayment
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 12 }} textAlign="end" color="#9197A4">
                                                        { `01 ${el.date}, 10:30 PM` }
                                                    </Typography>
                                                </Grid>
        
                                                <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{mt:3}}>
                                                    <Grid>
                                                        <Typography sx={{ fontSize: 12 }}>
                                                            PRINCIPAL
                                                        </Typography>
                                                            <Typography sx={{ fontSize: 12, fontWeight:"bold" }}>
                                                                { `SGD $${ el.item.principal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }` }
                                                        </Typography>
                                                    </Grid>

                                                    <Grid>
                                                        <Typography sx={{ fontSize: 12 }}>
                                                            INTEREST
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 12, fontWeight:"bold" }}>
                                                            { `SGD $${ el.item.interest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }` }
                                                        </Typography>
                                                    </Grid>

                                                    <Grid>
                                                        <Typography sx={{ fontSize: 12 }}>
                                                            OUTSTANDING
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 12, fontWeight:"bold" }}>
                                                            { `SGD $${ el.item.end_balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }` }
                                                        </Typography>
                                                    </Grid>     
                                                </Grid>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>  
                                </>
                            )
                        })}
                </Box>
            </Container>
        </React.Fragment>
      );
}