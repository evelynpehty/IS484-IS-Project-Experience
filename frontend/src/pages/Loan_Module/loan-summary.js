import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import moment from 'moment';

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, Card, CardContent, useTheme, Chip } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';

// Customised Components
import MainAppBar from "../../components/MainAppBar";
import WhiteReusableButton from "../../components/WhiteButton";
import OutlinedReusableButton from "../../components/OutlinedButton";
import FabButton from "../../components/FabButton";

// Import icon
import { ReactComponent as Calculator } from "../../assets/icons/calculator-line.svg";
import { ReactComponent as Repayment } from "../../assets/icons/paper-fold-text-line.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit-white.svg"
import { ReactComponent as LinkIcon } from "../../assets/icons/link-line-red.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow-right-white.svg";


function LoanSummary() {
    // Styling for Loan Summary Page
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
        },

        cardContent: {
            paddingBottom: "16px"
        },

        gradientText: {
            background: "linear-gradient(to top right, #E69F9F, #E60000)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            fontSize: "16px"
        }
    }

    /*const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 20,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: theme.palette.mode === 'light' ? 'linear-gradient(to top right, #E69F9F, #E60000)' : 'linear-gradient(to top right, #E69F9F, #E60000)',
        },
    }));*/

    // Change State of page
    const [show, setShow] = useState(false);

    // Get list of loan account from state
    const { loanList } = useSelector((state) => state.loan);
    
    const outstanding_Loan = loanList.totalOutstandLoan
    const total_repayment = loanList.totalMonthlyRepayment

    const [isEmpty, setIsEmpty] = useState(false);
    const [totalLoanAmt, setTotalLoanAmt] = useState(false);
    const [repaymentDate, setRepaymentDate] = useState(false);
    const [loan_DisplayArray, setLoanDisplayArray] = useState(loanList.accountInformation);

    console.log(loan_DisplayArray)
    
    if(loan_DisplayArray.length === 0){
         setIsEmpty(true)
    }

    useEffect(() => {
        const currentMonth = moment().month() +1 // jan=0, dec=11
        const currentYear = moment().year() 
        var r_date = currentMonth + "/1/" + currentYear //fixed repayment date to be first of the month
        var next_repayment = (moment(r_date).add(1, 'M')).format("DD MMM YYYY")
        setRepaymentDate(next_repayment)
    
        var temp_loan = 0
        loan_DisplayArray.forEach(element => {
            temp_loan += element.LoanAmount
            const monthDifference =  Math.ceil(moment(new Date(r_date)).diff(new Date(element.LoanStartDate), 'months', true));
            const schedule_for_payment = element.Detail.schedule_for_payment
            const end_balance = (schedule_for_payment[monthDifference].end_balance)
            element["end_balance"] = end_balance.toFixed(2).toLocaleString("en-US")  
            const total_paid = (element.LoanAmount - end_balance).toFixed(2)    
            element["progress"]= (total_paid/ element.LoanAmount) * 100     
            
        });
        setTotalLoanAmt(temp_loan)
        setLoanDisplayArray(loan_DisplayArray)

    }, []);


    return (
        <React.Fragment>
            <MainAppBar />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    {/* Loan Summary */}
                    <Grid container style={styles.grid} direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={styles.label} variant="h6">Loans</Typography>
                        {show === false ? <WhiteReusableButton function={() => setShow(prev => !prev)} buttonText="MANAGE ACCOUNTS" /> : <OutlinedReusableButton function={() => setShow(prev => !prev)} buttonText="DONE" />}
                    </Grid>
                    <Card sx={{borderRadius: "15px", mb: 3}}> {/* mb: loan summary card and the word "Quick Actions" too close, add marginBottom 3 */}
                        
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                {/* Loan Summary left side */}
                                <CardContent style={styles.cardContent}>
                                    <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color={ theme.palette.secondary.main }>OUTSTANDING LOANS</Typography>
                                    <Typography sx={{ fontSize: 22, fontWeight:"bold"}} color={ theme.palette.secondary.main }>{ `S$${ outstanding_Loan.toLocaleString("en-US") }` }</Typography>
                                    <Typography sx={{ fontSize: 10 }} color="grey" fontWeight="light">Next repayment: {repaymentDate}</Typography>
                                </CardContent>

                                {/* Loan Summary right side */}
                                <CardContent style={styles.cardContent}>
                                    <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color={ theme.palette.secondary.main }>TOTAL LOAN AMOUNT</Typography>
                                    <Typography sx={styles.gradientText} marginBottom="12px">{ `S$${ totalLoanAmt.toLocaleString("en-US") }` }</Typography>
                                    <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color={ theme.palette.secondary.main }>TOTAL REPAYMENTS</Typography>
                                    <Typography sx={styles.gradientText}>{ `S$${ total_repayment.toFixed(2).toLocaleString("en-US") }` }</Typography>
                                </CardContent>
                            </Grid>
                        
                    </Card>

                    {/* Quick Tools */}
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
                                    <Calculator className="small-icon" />
                                    <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Net Worth
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card style={styles.card2}>
                                <CardContent sx={{ pt: "24px", textAlign: "center" }}>
                                    <Repayment className="small-icon" />
                                    <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Repayments
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card style={styles.card2}>
                                <CardContent sx={{ pt: "24px", textAlign: "center" }}>
                                    <LinkIcon />
                                    <Typography sx={{ fontSize: 10, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                                        Link Accounts
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                   
                    {/* Cards of every loan account */}
                    { !isEmpty && loan_DisplayArray.map((item,index)=>{
                            return (
                                <>
                                <Link to={`/loan-account-details/${item.LoanAccountID}`} key={item.LoanAccountID}> 
                                    <Card style={styles.card} sx={{background: `${item.ChosenColor}`}}>
                                        <CardContent style={styles.cardContent}>
                                            {show && 
                                                <Grid container style={ styles.grid } justifyContent="center  ">
                                                    <Grid xs={8}>
                                                        <Typography sx={{ fontSize: 12 }} color="white">
                                                            { item.ProductName }
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 16, fontWeight: "bold" }} color="white">
                                                            { item.AccountName } <Chip style={styles.chip} size="small" label={`${item.InterestRate}%`} />
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 12 }} color="white">
                                                            { `SGD $${ (item.Detail.monthly_payment).toFixed(2).toLocaleString("en-US")}` } due on {repaymentDate} {/* !!! here need to connect the repayment value and date */}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={ 4 }>
                                                        <Typography textAlign="end" >
                                                            <Link to={ `/manage-loan/${item.LoanAccountID}` }> 
                                                                <EditIcon />
                                                            </Link>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            }
                                            { !show &&
                                                <Grid container style={ styles.grid } justifyContent="center  ">
                                                    <Grid xs={8}>
                                                        <Typography sx={{ fontSize: 12 }} color="white">
                                                            { item.ProductName }
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 16, fontWeight: "bold" }} color="white">
                                                            { item.AccountName } <Chip style={styles.chip} size="small" label={`${item.InterestRate}%`} />
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 12 }} color="white">
                                                            { `SGD $${ (item.Detail.monthly_payment).toFixed(2).toLocaleString("en-US")}` } due on {repaymentDate} {/* !!! here need to connect the repayment value and date */}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid xs={ 4 }>
                                                        <Typography textAlign="end" >
                                                            <Link to={ `/manage-loan/${item.LoanAccountID}` }> 
                                                                <ArrowIcon />
                                                            </Link>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            }
                                            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{mt:1, mb: 2}}>
                                                <Grid xs={12}>
                                                    <LinearProgress variant="determinate" value={item.progress}  sx={{
                                                        height: 20,
                                                        borderRadius: 5,    
                                                        background: `${item.ChosenColor}`,
                                                        "& .MuiLinearProgress-bar": {
                                                        backgroundColor: `#FFFF`
                                                        }
                                                    }}/>
                                                </Grid>
                                            </Grid>
                                            <Typography sx={{ fontSize: 12 }} textAlign="end" color="white">
                                                Outstanding Amount
                                            </Typography>
                                            <Typography sx={{ fontSize: 16, fontWeight: "thin" }} textAlign="end" color="white">
                                                { `SGD $${ item.end_balance}` }
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                                </>
                            )
                        })
                    }
                    {/* to beautify */}
                    {isEmpty && <p>You do not have any loan account</p>}
                </Box>
                <FabButton />
            </Container>
        </React.Fragment>
    )
}

export default LoanSummary;