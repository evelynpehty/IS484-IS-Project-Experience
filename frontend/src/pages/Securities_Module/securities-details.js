// Packages
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import moment from 'moment';

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, Card, CardContent, useTheme, Paper, Chip, Button, Stack } from "@mui/material";

// Customised Components
import MainAppBar from "../../components/MainAppBar";
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

        chip: {
            fontWeight: "bold",
            fontSize: "12px",
            color: theme.palette.neutral.main,
            paddingLeft: "8px",
            paddingRight: "8px",
            background: "linear-gradient(to top right, #FF9364, #F25F33)",
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
        },

        chipSelected: {
            backgroundColor:theme.palette.secondary.light,
        }, 

        chipUnSelected: {
            backgroundColor: theme.palette.neutral.main,
        }
    }
      
    const { ticker } = useParams()
    const { securitiesList } = useSelector((state) => state.securities);
    const securitiesArray = securitiesList.detail
    
    const securities_item = securitiesArray.filter(function (el)
    {
      return el.ticker === ticker
    })

    console.log(securities_item[0])

    const [chipValue, setChipValue] = useState(["1D", "1W", "1M", "6M", "1Y", "YTD"]);
    const [selectedChip, setSelectedChip] = React.useState("YTD");
    const [marketData, setMarketData] = useState(securitiesArray[0].market_data.data);
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        var result = []
        marketData.forEach(market_item => {
            var temp = {
                "Date": moment(market_item.Date).format('DD MMM YY'),
                "ClosingPrice": market_item.ClosingPrice,
            }
            result.unshift(temp)
        });
        setGraphData(result)

    }, []);

    function handleChip(item){
        setSelectedChip(item)
        var result = []
        if(item === "1D"){

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
                var temp = {
                    "Date": moment(market_item.Date).format('DD MMM YY'),
                    "ClosingPrice": market_item.ClosingPrice,
                }
                result.unshift(temp)
            });
            setGraphData(result)
        }
    }

    return (
        <React.Fragment>
            <MainAppBar />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                    <Typography style={ styles.label } variant="h6">Overview</Typography>
                    <WhiteReusableButton buttonText="VIEW Security" />
                </Grid>
                <Card style={ styles.card2 } elevation={ 4 }>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart width={730} height={250} data={graphData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#E60000" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#E60000" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="Date" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area dataKey="ClosingPrice" stroke="#E60000" fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                        <cardContent>
                            <Stack direction="row" spacing={1} style={ styles.stackChip }>
                                {
                                    chipValue.map((item, index) => {
                                        return <Chip label={item} id={index} key={index} sx={(item === selectedChip) ? styles.chipSelected : styles.chipUnSelected } variant="outlined" onClick={() => handleChip(item)} />
                                    })
                                }
                            </Stack>
                        </cardContent>
                    </Card>
                
                </Box>
            </Container>
            
        </React.Fragment>
    );
}

export default SecuritiesDetails;