// Packages
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { Link, useParams } from "react-router-dom";
import moment from 'moment';

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { Container, Box, Card, CardContent, Typography, Chip, useTheme } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";

// Assets (Images & Icons)
import { ReactComponent as BellIcon } from "../../assets/icons/bell-red.svg";

// Recharts
import {
    AreaChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
  } from "recharts";

function LoanAccountDetails() {
    // Styling for Loan Account Details Page
    const theme = useTheme()
    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: "#4B4948",
            fontSize: "16px"
        },

        chip: {
            fontWeight: "bold",
            fontSize: "12px",
            color: theme.palette.neutral.main,
            paddingLeft: "2px",
            paddingRight: "2px",
        },

        card: {
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

    const BorderLinearProgress = styled(LinearProgress) (({ theme }) => ({
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

    // Fetch Loan Account
    const navigate = useNavigate();
    const { id } = useParams()
    const { loanList } = useSelector((state) => state.loan);
    const loan_DisplayArray = loanList.accountInformation
    const loan_item = loan_DisplayArray.filter(function (el)
    {
        return el.LoanAccountID === id
    })

    const monthly_payment = loan_item[0].Detail.monthly_payment
    const LoanAmount = loan_item[0].LoanAmount
    const LoanStartDate = loan_item[0].LoanStartDate
    const LoanMaturity = loan_item[0].LoanMaturityDate
    const schedule_for_payment = loan_item[0].Detail.schedule_for_payment

    const [selectedMonth, setSelectedMonth] = useState("")
    const [totalPaid, setTotalPaid] = useState("");
    const [outstanding, setOutstanding] = useState("");
    const [monthlyRepayment, setMonthlyRepayment] = useState("");
    const [paymentDue, setPaymentDue] = useState("");
    const [totalLoanAmount, setTotalLoanAmount] = useState("");
    const [timeToCompletion, setTimeToCompletion] = useState("");
    const [progress, setProgress] = useState("");
        

    // Navigation to Payment Reminders Page
    const handlePaymentReminders = () => {
        navigate("/payment-reminders", { replace: true, state: {loan_item: loan_item, id: id} })
    }

    // Navigation to View All Loan Repayment Transaction
    const handleViewAll = () => {
        navigate('/view-loan-transaction-history', {replace: true , state: { loan_item: loan_item[0], id: id } })  
    }

    var data = []
    var curr = moment(LoanStartDate).year()
    var yearRange = []
    for(let x = curr; x <= moment(LoanMaturity).year(); x++) {
        yearRange.push(curr.toString())
        curr += 1
    }

    const currentMonth = moment().month() +1 // jan=0, dec=11
    const currentYear = moment().year() 
    var r_date =  (currentMonth) + "/1/" + currentYear // Fixed repayment date to be first of the month
    const monthDifference =  Math.ceil(moment(new Date(r_date)).diff(new Date(LoanStartDate), 'months', true));
    // const display = []

    for(var i=monthDifference; i>0; i--){
        var obj = {"month": "", "outstanding": ""}

        obj["month"] = moment(r_date).format('MMM YYYY')
        obj["outstanding"] = (Object.assign({}, schedule_for_payment[i]).end_balance).toFixed(2);
        obj["Monthly_Repayment"] = monthly_payment.toFixed(2)
        obj["payment_due"] = moment(r_date).format('MMM 01, YYYY')
        obj["total_paid"]= (LoanAmount - obj["outstanding"]).toFixed(2)

        const completion = moment.duration((moment(LoanMaturity)).diff((moment(r_date))));

        var year_str = "years"
        var month_str = "months"
        if (completion.years() <= 1){
            year_str = "year"
        }
        if (completion.months() <= 1){
            month_str = "month"
        }

        obj["time_to_completion"] = completion.years() + ` ${year_str} ` + completion.months() + ` ${month_str}`
        obj["total_loan_amount"] = LoanAmount.toFixed(2)
        obj["progress"]= (obj["total_paid"] / obj["total_loan_amount"]) * 100

        data.push(obj)
        r_date = moment(r_date).subtract(1, 'months')
    }
    var recent_transactions = data.slice(0, 3)
    data = data.reverse()
    console.log(data)

    const handleChart = (event, payload) => {
        const datapoint = payload.payload
        setSelectedMonth(datapoint["month"])
        setTotalPaid(datapoint["total_paid"])
        setOutstanding(datapoint["outstanding"])
        setMonthlyRepayment(datapoint["Monthly_Repayment"])
        setPaymentDue(datapoint["payment_due"])
        setTimeToCompletion(datapoint["time_to_completion"])
        setTotalLoanAmount(datapoint["total_loan_amount"])
        setProgress(datapoint["progress"])
    }

    return (
        <React.Fragment>
            <SecondaryAppBar link="/loan" text="All Loans" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    <Card style={ styles.card } sx={{background: `${loan_item[0].ChosenColor}`}}>
                        <CardContent style={ styles.cardContent }>
                            <Typography sx={{ fontSize: 12 }} color="white">
                                { loan_item[0].ProductName }
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color="white">
                                { loan_item[0].AccountName }
                            </Typography>
                            <Chip style={ styles.chip } label={ `${loan_item[0].InterestRate} %` } />
                            <Typography sx={{ fontSize: 12 }} textAlign="end" color="white">
                                Outstanding Amount
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="white">
                                SGD ${ loan_item[0].LoanBalance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
                            </Typography>
                        </CardContent>
                    </Card>

                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Debt Paydown</Typography>
                        <WhiteReusableButton function={ handlePaymentReminders } icon={ <BellIcon /> } buttonText="REMINDERS" />
                    </Grid>

                    <Card style={ styles.card2 } elevation={ 4 }>
                        <ResponsiveContainer width="100%" height={300}>
                        <AreaChart width={730} height={250} data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#E99B96" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#E99B96" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="step" dataKey="outstanding" stroke="#E60000" fillOpacity={1} fill="url(#colorUv)" activeDot={{ r:8, onClick: handleChart }}/>
                        </AreaChart>
                        </ResponsiveContainer>
                        {selectedMonth!=="" && 
                       <CardContent style={ styles.cardContent }>
                            
                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid xs={6}>
                                        <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#9197A4">
                                            TOTAL LOAN AMOUNT
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }} >
                                            SGD ${totalLoanAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={6}>
                                        <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#9197A4">
                                            TIME TO COMPLETION
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }}>
                                            {timeToCompletion}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{mt:1, mb: 2}}>
                                    <Grid xs={12}>
                                        <BorderLinearProgress variant="determinate" value={progress} />
                                        <Typography sx={{ fontSize: 14, fontWeight:"bold", textAlign: "center" }} color="#E60000">
                                            {progress.toFixed(2)}%
                                        </Typography>
                                    </Grid>
                                </Grid>
                                

                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid xs={6}>
                                        <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#9197A4">
                                            TOTAL PAID
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }} >
                                            SGD ${totalPaid.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={6}>
                                        <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#9197A4">
                                            OUTSTANDING
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }}>
                                            SGD ${outstanding.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid xs={6}>
                                        <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#9197A4">
                                           MONTHLY REPAYMENT
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }} >
                                            SGD ${monthlyRepayment.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={6}>
                                        <Typography sx={{ fontSize: 10, fontWeight:"bold" }} color="#9197A4">
                                            PAYMENT DUE
                                        </Typography>
                                        <Typography sx={{ fontSize: 14, fontWeight:"bold", mb: 1 }}>
                                            {paymentDue}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            

                        </CardContent>} 
                    </Card>

                    

                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Repayment History</Typography>
                        <WhiteReusableButton function={ handleViewAll } buttonText="VIEW ALL" />
                    </Grid>

                    <Card style={ styles.card2 } elevation={ 4 }>
                        { recent_transactions.map (( value, index ) => {
                            return (
                                <CardContent style={ (index === recent_transactions.length - 1) ? styles.cardContent : styles.cardContent2 } key={ index }>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color="#4B4948">
                                            UBS - {index+1}
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
                                            { `01 ${value.payment_due}, 10:30 PM` }
                                        </Typography>
                                        </Grid>
                                </CardContent>
                            )
                        })}
                    </Card>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default LoanAccountDetails;