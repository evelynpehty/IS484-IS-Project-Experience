// Packages
import * as React from 'react';
import moment from 'moment';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, Accordion, AccordionDetails, AccordionSummary, Stack, Chip, useTheme } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
// import WhiteReusableButton from "../../components/WhiteButton";

// Assets (Images & Icons)
import { ReactComponent as FilterIcon } from "../../assets/icons/filter-line-red.svg";
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
            color: theme.palette.other.sucess
        },

        negative: {
            color: theme.palette.primary.main
        },

        searchBar: {
            border: "1px solid #BFBFBF"
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

    //const {state} = useLocation();
    // const { transaction_item, id } = state;
    const id = 1
    const { loanList } = useSelector((state) => state.loan);
    const transitem = loanList.accountInformation[0]

    const monthly_payment = transitem.Detail.monthly_payment
    const LoanStartDate = transitem.LoanStartDate
    const LoanMaturity = transitem.LoanMaturityDate
    const schedule_for_payment = transitem.Detail.schedule_for_payment

    const [chipValue, setChipValue] = React.useState([]);
    const [selectedChip, setSelectedChip] = React.useState("");
    const [transactionDisplay, setTransDisplay] = React.useState([]);
    const [originalDisplay, setOriginalDisplay] = React.useState([]);

    useEffect(() => {
        var curr = moment(LoanStartDate).year()
        var yearRange = []
        for(let x = curr; x <= moment(LoanMaturity).year(); x++){
            yearRange.push(curr.toString())
            curr += 1
        }
        setChipValue(yearRange)

        const currentMonth = moment().month() +1 // jan=0, dec=11
        const currentYear = moment().year() 
        var r_date =   currentMonth + "/1/" + currentYear //fixed repayment date to be first of the month
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
                    { transactionDisplay.map((el,index)=> {
                            return (
                                <>
                                    <Accordion defaultExpanded>
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
                                                        UBS - {index+1}
                                                    </Typography>
                                                    <Typography style={ styles.negative } sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="#4B4948">
                                                        { `- SGD $${ monthly_payment.toLocaleString("en-US") }` }
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
                                                            { `SGD $${ el.item.principal.toLocaleString("en-US") }` }
                                                        </Typography>
                                                    </Grid>

                                                    <Grid>
                                                        <Typography sx={{ fontSize: 12 }}>
                                                            INTEREST
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 12, fontWeight:"bold" }}>
                                                            { `SGD $${ el.item.interest.toLocaleString("en-US") }` }
                                                        </Typography>
                                                    </Grid>

                                                    <Grid>
                                                        <Typography sx={{ fontSize: 12 }}>
                                                            OUTSTANDING
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 12, fontWeight:"bold" }}>
                                                            { `SGD $${ el.item.end_balance.toLocaleString("en-US") }` }
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