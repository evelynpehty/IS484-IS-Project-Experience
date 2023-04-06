// Packages
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import moment from 'moment';

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, Card, CardContent, useTheme, Paper, Chip, Button, Stack } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";

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


function SecuritiesDetails() {

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

        chipRed: {
            fontWeight: "bold",
            fontSize: "12px",
            color: theme.palette.neutral.main,
            paddingLeft: "2px",
            paddingRight: "2px",
            background: "linear-gradient(to top right, #E69F9F, #E60000)",
        },

        chipGreen: {
            fontWeight: "bold",
            fontSize: "12px",
            color: theme.palette.neutral.main,
            paddingLeft: "2px",
            paddingRight: "2px",
            background: "linear-gradient(to top right, #FFFFFF, #109878)",
        },

        card: {
            background: "linear-gradient(to top right, #FFFFFF, #E99B96)",
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
            paddingTop: "34px",
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
        },

        chipSelected: {
            backgroundColor:theme.palette.secondary.light,
        }, 

        chipUnSelected: {
            backgroundColor: theme.palette.neutral.main,
        },
        stackChip: {
            overflow: "auto",
            paddingLeft: "16px",
            paddingRight: "16px"
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
        },
    }
      
    const navigate = useNavigate();
    const { ticker } = useParams()
    const { securitiesList } = useSelector((state) => state.securities);
    const securitiesArray = securitiesList.detail
    
    const securities_item = securitiesArray.filter(function (el)
    {
      return el.ticker === ticker
    })

    console.log(securities_item)
  
    const [chipValue, setChipValue] = useState(["1D", "1W", "1M", "6M", "1Y", "YTD"]);
    const [selectedChip, setSelectedChip] = React.useState("YTD");
    const [marketData, setMarketData] = useState(securitiesArray[0].market_data.data);
    const [graphData, setGraphData] = useState([]);


    useEffect(() => {
        var result = []
        marketData.forEach(market_item => {
            const d = moment(market_item.Date)
            if(d.year()===moment().year()){
                var temp = {
                    "Date": moment(market_item.Date).format('DD MMM YY'),
                    "ClosingPrice": market_item.ClosingPrice,
                }
                result.unshift(temp)
            }       
        });
        setGraphData(result)

    }, []);

    const handleViewStock = () => {
        navigate('/view-stock-details/'+ ticker)  
    }

    function handleChip(item){
        setSelectedChip(item)
        var result = []
        if(item === "1D"){
            const oneD_data = securitiesArray[0].record_for_past_24_hrs
            console.log(oneD_data)

            oneD_data.forEach(market_item => {
             
                var temp = {
                    "Date": moment.utc(market_item.Datetime).format('HH:mm a'),
                    "ClosingPrice": market_item.Close
                }
                result.push(temp)
                
            });
            setGraphData(result)

        }
        if(item === "1W"){
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            var top5 = marketData.slice(0,5).reverse()

            const latest_item_day = moment(marketData[0].Date).format('dddd')
            const index = days.indexOf(latest_item_day)+1
            const sliced_marketData = (top5.slice(0,index)).reverse()
    
            sliced_marketData.forEach(market_item => {
                const date_temp = moment().diff(market_item.Date, 'months');
                console.log(date_temp)
                if(date_temp < 1){
                    var temp = {
                        "Date": moment(market_item.Date).format('ddd'),
                        "ClosingPrice": market_item.ClosingPrice,
                    }
                    result.unshift(temp)
                }
            });
            setGraphData(result)
        }
        if(item === "1M"){
            marketData.forEach(market_item => {
                const date_temp = moment().diff(market_item.Date, 'months');
                console.log(date_temp)
                if(date_temp < 1){
                    var temp = {
                        "Date": moment(market_item.Date).format('DD MMM'),
                        "ClosingPrice": market_item.ClosingPrice,
                    }
                    result.unshift(temp)
                }
            });
            setGraphData(result)
            
        }
        if(item === "6M"){
            marketData.forEach(market_item => {
                const date_temp = moment().diff(market_item.Date, 'months');
                if(date_temp < 6){
                    var temp = {
                        "Date": moment(market_item.Date).format('DD MMM YY'),
                        "ClosingPrice": market_item.ClosingPrice,
                    }
                    result.unshift(temp)
                }
            });
            setGraphData(result)
            
        }
        if(item === "1Y"){
            marketData.forEach(market_item => {
                const date_temp = moment().diff(market_item.Date, 'months');
                if(date_temp < 12){
                    var temp = {
                        "Date": moment(market_item.Date).format('DD MMM YY'),
                        "ClosingPrice": market_item.ClosingPrice,
                    }
                    result.unshift(temp)
                }
            });
            setGraphData(result)
        }
        if(item === "YTD"){
            marketData.forEach(market_item => {
                const d = moment(market_item.Date)
                if(d.year()===moment().year()){
                    var temp = {
                        "Date": moment(market_item.Date).format('DD MMM YY'),
                        "ClosingPrice": market_item.ClosingPrice,
                    }
                    result.unshift(temp)
                }       
            });
            setGraphData(result)
        }
    }

    return (
        <React.Fragment>
            <SecondaryAppBar link={ `/securities` } text="Securities" /> 
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    <Card style={ styles.card }>
                        <CardContent style={ styles.cardContent }>
                            <Typography sx={{ fontSize: 16, fontWeight:"bold" , color:"#4B4948" }}>
                                { securities_item[0].ticker }
                            </Typography>
                            <Typography sx={{ fontSize: 12, color:"#4B4948" }} >
                                { securities_item[0].stock_name }
                            </Typography>
                            <Typography sx={{ fontSize: 14, color:"#4B4948"}} >
                                { `US$${ securities_item[0].current_price_USD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) } ` }
                                <Chip sx={(securities_item[0]["change_rate"] < 0) ? styles.chipRed : styles.chipGreen } size="small" label={ `${securities_item[0]["change_rate"].toFixed(2)} %` } />
                            </Typography>

                            <Typography sx={{ fontSize: 12, color:"#4B4948" }} textAlign="end">
                                Total Current Holdings
                            </Typography>
                            <Typography sx={{ fontSize: 16, fontWeight:"bold", color:"#4B4948" }} textAlign="end">
                                SGD ${ (securities_item[0].qty * securities_item[0].current_price_SGD).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Current Holdings</Typography>
                    </Grid>
                    <Card style={ styles.card2 }>
                        <CardContent style={ styles.cardContent }>
                            <Grid container direction="row" justifyContent="space-between">
                                <Grid xs={6}>
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                        TOTAL INVESTMENT
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold", color:"#4B4948" }}>
                                        S$6,059.44
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                        CURRENT VALUE
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold", color:"#4B4948" }}>
                                        SGD ${ (securities_item[0].qty * securities_item[0].current_price_SGD).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
                                    </Typography>
                                </Grid>
                            </Grid>        
                            <Grid container direction="row" justifyContent="space-between" sx={{mt:3}}>
                                <Grid xs={6}>
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                        AVERAGE PRICE (USD)
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold", color:"#4B4948" }}>
                                        US$148.98
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                        PROFIT / LOSS
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold" }} style={ styles.GreenGradientText }>
                                        + S$175.18
                                    </Typography>
                                </Grid>
                            </Grid>   
                            <Grid container direction="row" justifyContent="space-between" sx={{mt:3}}>
                                <Grid xs={6}>
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                        QUANTITY HELD
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold", color:"#4B4948" }}>
                                        {securities_item[0].qty}
                                    </Typography>
                                </Grid>
                                <Grid xs={6}>
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                        1D CHANGE
                                    </Typography>
                                    { securities_item[0]["1_day_change_per_each"] >= 0 &&
                                        <Typography sx={{ fontSize: 16, fontWeight:"bold" }} style={ styles.GreenGradientText }>
                                            S${securities_item[0]["1_day_change_per_each"].toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
                                        </Typography>
                                    }
                                    { securities_item[0]["1_day_change_per_each"] < 0 &&
                                        <Typography sx={{ fontSize: 16, fontWeight:"bold"}} style={ styles.RedGradientText }>
                                            - S${securities_item[0]["1_day_change_per_each"].toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
                                        </Typography>
                                    }
                                    
                                </Grid>
                                
                            </Grid>
                            
                        </CardContent>
                    </Card>


                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label }>Performance</Typography>
                        <WhiteReusableButton function={ handleViewStock } buttonText="VIEW DETAILS" />
                    </Grid>
                    <Card style={ styles.card2 } elevation={ 4 }>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart width={730} height={250} data={graphData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#E99B96" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#E99B96" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="Date" />
                            <YAxis />
                            <Tooltip />
                            <Area dataKey="ClosingPrice" stroke="#E60000" strokeWidth="2" fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>

                        <CardContent>                     
                            <Grid container justifyContent="center" sx={{mt:2, mb: 2}}> 
                                <Stack direction="row" spacing={1} style={ styles.stackChip }>
                                    {
                                        chipValue.map((item, index) => {
                                            return <Chip label={item} id={index} key={index} sx={(item === selectedChip) ? styles.chipSelected : styles.chipUnSelected } variant="outlined" onClick={() => handleChip(item)} />
                                        })
                                    }
                                </Stack>
                            </Grid>
                        </CardContent>
                    </Card>
                
                </Box>
            </Container>
            
        </React.Fragment>
    );
}

export default SecuritiesDetails;