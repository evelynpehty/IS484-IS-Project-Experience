// Packages
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import moment from 'moment';

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, Card, CardContent, useTheme, Modal,FormControl, MenuItem, Select, FormHelperText, Chip, Stack } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";
import NeutralButton from "../../components/NeutralButton";
import Loading from '../../components/loading.js'

// Assets (Images & Icons)
import { ReactComponent as HeartLineIcon } from "../../assets/icons/heart-line-red.svg";
import { ReactComponent as HeartSolidIcon } from "../../assets/icons/heart-filled-red.svg";
import { ReactComponent as Rangebar } from "../../assets/icons/52weekLine.svg";


// API
import { watchlist, addSecurities_WatchList, removeSecurities_WatchList } from "../../actions/securities";

// Recharts
import {
    AreaChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Area,
  } from "recharts";

function StockDetails() {
    const theme = useTheme()
    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: theme.palette.secondary.main,
            fontSize: "16px"
        },

        modal: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "80%",
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 3,
        },

        modalHeader: {
            fontSize: "18px",
            fontWeight: "bold",
            background: "linear-gradient(to top right, #E60000, #E69F9F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
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

        card: {
            marginBottom: "24px",
            borderRadius: "10px",
            padding: "24px"
        },

        card2: {
            marginTop: "24px",
            marginBottom: "24px",
            borderRadius: "10px",
            paddingTop: 24,
            paddingRight: 10
        },

        cardContent2: {
            paddingBottom: "16px",
            borderBottom: "1px dashed #BFBFBF"
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

    const { ticker } = useParams()
    const { allSecuritiesList, watchList } = useSelector((state) => state.securities);
    const { user } = useSelector((state) => state.auth);

    const [display, setDisplay] = useState("");
    const [isWatchList, setIsWatchList] = useState("");

    // Graph
    const [chipValue, setChipValue] = useState(["1D", "1W", "1M", "6M", "1Y", "YTD"]);
    const [selectedChip, setSelectedChip] = React.useState("YTD");
    const [graphData, setGraphData] = useState([]);
    const [summary, setSummary] = React.useState("");
    
    console.log(allSecuritiesList)
    console.log(watchList)

    useEffect(() => {

        // get securities data for the ticker
        var result = allSecuritiesList.filter(function (el)
        {
            return el.ticker === ticker
        })
        setDisplay(result[0]) // for ticker and ticker name
        
        setSummary(result[0].summary.data)
        // prepare graph YTD data
        var r = []
        if(result[0].market_data.length !== 0){
            (result[0].market_data).forEach(market_item => {
                const d = moment(market_item.Date)
                if(d.year()===moment().year()){
                    var temp = {
                        "Date": moment(market_item.Date).format('DD MMM YY'),
                        "ClosingPrice": market_item.ClosingPrice,
                    }
                    r.unshift(temp)
                }       
            });
            setGraphData(r)
        }

        // check ticker in watchlist
        watchList.forEach(element => {
            console.log(element.watchlist_list)
            if(element.watchlist_list !== null){
                (element.watchlist_list).forEach(item => {
                    if(item.ticker === ticker){
                        setIsWatchList(true)
                    }
                })
            }
        });
    }, []);

    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false);
    const [group, setGroup] = React.useState(1);
    const onChangeGroup = (e) => {
        setGroup(e.target.value);
    }

    // ADD
    const [addOpen, setAddOpen] = React.useState(false);
    const handleAddOpen = () => setAddOpen(true);
    const handleAddClose = () => setAddOpen(false);

    const handleAddWatchList = () => {
        setAddOpen(false)
        setLoading(true)
        const input = {
            "watchlistID": group,
            "ticker": ticker
        }
        dispatch(addSecurities_WatchList(input)).then(()=>{
            dispatch(watchlist(user.data.UserID)).then(()=>{
                setLoading(false)
                setIsWatchList(true)
            }).catch((error)=>{
                console.log(error)
                setLoading(false)
            })
        }).catch((error)=>{
            console.log(error)
            setLoading(false)
        })

        setGroup("")
    }


    // REMOVE
    const [removeOpen, setRemoveOpen] = React.useState(false);
    const handleRemoveOpen = () => setRemoveOpen(true);
    const handleRemoveClose = () => setRemoveOpen(false);

    const handleRemoveWatchList = () => {
        setRemoveOpen(false)
        setLoading(true)
        var deleteWatchListID;
        watchList.forEach(element => {
            if(element.watchlist_list !== null){
                (element.watchlist_list).forEach(item => {
                    if(item.ticker === ticker){
                        deleteWatchListID = element.WatchlistID
                    }
                })
            }
        });

        const input = {
            "watchlistID": deleteWatchListID,
            "ticker": ticker
        }
        dispatch(removeSecurities_WatchList(input)).then(()=>{
            dispatch(watchlist(user.data.UserID)).then(()=>{
                setLoading(false)
                setIsWatchList(false)
            }).catch((error)=>{
                setLoading(false)
            })
        }).catch((error)=>{
            setLoading(false)
        })
    }

    // Graph Chip Filter
    function handleChip(item){
        setSelectedChip(item)
        var result = []
        if(item === "1D"){
            const oneD_data = display.record_for_past_24_hrs
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
            var top5 = (display.market_data).slice(0,5).reverse()

            const latest_item_day = moment((display.market_data)[0].Date).format('dddd')
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
            (display.market_data).forEach(market_item => {
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
            (display.market_data).forEach(market_item => {
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
            (display.market_data).forEach(market_item => {
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
            (display.market_data).forEach(market_item => {
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
        <>
             { loading && <Loading></Loading> } 
            <SecondaryAppBar link={ `/browse-securities` } text="Watchlist" /> 
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Grid xs={4}>
                            <Typography style={ styles.label } variant="h6">{display.ticker}</Typography>
                            <Typography sx={{ fontSize: 12, color: theme.palette.secondary.main }} variant="h6">{display.tickerName}</Typography>
                        </Grid>
                        <Grid xs={8} textAlign="end">
                            {isWatchList && <WhiteReusableButton function={ handleRemoveOpen } icon={ <HeartSolidIcon /> } buttonText="REMOVE FROM WATCHLIST" />}
                            {!isWatchList && <WhiteReusableButton function={ handleAddOpen } icon={ <HeartLineIcon /> } buttonText="SAVE TO WATCHLIST" /> }
                        </Grid>                        
                    </Grid>

                    {/* Graph */}
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

                        <CardContent sx={{ pb: "16px" }}>                     
                            <Grid container justifyContent="center" sx={{ mt: 2 }}> 
                                <Stack direction="row" spacing={1} style={ styles.stackChip }>
                                    {
                                        chipValue.map((item, index) => {
                                            return <Chip label={item} id={index} key={index} sx={(item === selectedChip) ? styles.chipSelected : styles.chipUnSelected } variant="outlined" onClick={() => handleChip(item)} />
                                        })
                                    }
                                </Stack>
                            </Grid>

                            <Grid display="flex" justifyContent="space-between" sx={{mt:3}}>
                                <Grid xs={4}>
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                        LAST PRICE
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold", color: theme.palette.secondary.main }}>
                                        ${display.currentPrice}
                                    </Typography>
                                </Grid>
                                <Grid xs={4}>
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                        CHANGE
                                    </Typography>   
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold", color: theme.palette.secondary.main }}>
                                        { display["1_day_change_in_price"] >= 0 &&
                                        <Typography sx={{ fontSize: 16, fontWeight:"bold" }} style={ styles.GreenGradientText }>
                                            ${display["1_day_change_in_price"].toFixed(2)}
                                        </Typography>
                                        }
                                        { display["1_day_change_in_price"] < 0 &&
                                        <Typography sx={{ fontSize: 16, fontWeight:"bold"}} style={ styles.RedGradientText }>
                                        - ${display["1_day_change_in_price"].toFixed(2)}
                                        </Typography>
                                        } 
                                    </Typography>
                                </Grid>
                                <Grid xs={4}>
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                        % CHANGE
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold", color: theme.palette.secondary.main }}>
                                        
                                        { display["1_day_change_per_cent"] >= 0 &&
                                        <Typography sx={{ fontSize: 16, fontWeight:"bold" }} style={ styles.GreenGradientText }>
                                            {display["1_day_change_per_cent"].toFixed(2)}%
                                        </Typography>
                                        }
                                        { display["1_day_change_per_cent"] < 0 &&
                                            <Typography sx={{ fontSize: 16, fontWeight:"bold" }} style={ styles.RedGradientText }>
                                                {display["1_day_change_per_cent"].toFixed(2)}%
                                            </Typography>
                                        } 
                                    </Typography>
                                </Grid>
                            </Grid>    
                            <Grid container direction="row" justifyContent="space-between" sx={{mt:2}}> 
                                <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                    52-Week Range
                                </Typography>
                            </Grid>
                            <Grid container direction="row" justifyContent="space-between" sx={{mt:1}}> 
                                <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                     <Rangebar />
                                </Typography>
                            </Grid>    
                            <Grid container direction="row" justifyContent="space-between" sx={{mt:1}}> 
                            <Grid sx={6}>
                                <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                     $124.17
                                </Typography>
                            </Grid>
                               <Grid sx={6}>
                                <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                     $165.10
                                </Typography>
                            </Grid>
                            </Grid>        

                            
                        </CardContent>
                    </Card>

                    {/* Summary */}
                    <Grid container style={ styles.grid } direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={ styles.label } variant="h6">Summary</Typography>
                    </Grid>
                    <Card style={ styles.card }>
                        <CardContent style={ styles.cardContent }>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                                <Grid xs={6}>
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                        MARKET CAP
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold", color:"#4B4948" }}>
                                        {`$${((summary.marketCap)/1000000000).toFixed(2)}B`}
                                    </Typography>
                                </Grid>
                                <Grid xs={6} textAlign="end">
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                        MARKET VOL
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold", color:"#4B4948" }}>
                                        {`${((summary.regularMarketVolume)/1000000).toFixed(2)}M`}
                                    </Typography>
                                </Grid>
                            </Grid>        
                            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{mt:3}}>
                                <Grid xs={6}>
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                        DIVIDEND DATE
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold", color:"#4B4948" }}>
                                        {summary.dividendDate !== null && moment(summary.dividendDate).format("MMM DD, YYYY")}
                                        {summary.dividendDate === null && "No Date"}
                                    </Typography>
                                </Grid>
                                <Grid xs={6} textAlign="end">
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                       AVG VOL
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold", color:"#4B4948" }}>
                                        {`${summary["averageDailyVolume3Month_in_million"]}M`}
                                    </Typography>
                                </Grid>
                            </Grid>   
                            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{mt:3}}>
                                <Grid xs={6}>
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                       P/E
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold", color:"#4B4948" }}>
                                        {`${summary["priceEpsCurrentYear_in_2dp"]}`}
                                    </Typography>
                                </Grid>
                                <Grid xs={6} textAlign="end">
                                    <Typography sx={{ fontSize: 12, color:"#979797", fontWeight:"bold" }}>
                                        EPS
                                    </Typography>
                                    <Typography sx={{ fontSize: 16, fontWeight:"bold", color:"#4B4948" }}>
                                        {`${summary.epsCurrentYear}`}
                                    </Typography>                                
                                </Grid>
                                
                            </Grid>
                            
                        </CardContent>
                    </Card>

                </Box>

                {/* Add WatchList Modal */}
                <Modal
                    open={addOpen}
                    onClose={handleAddClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styles.modal}>
                        <Typography style={ styles.modalHeader }>
                            Add to Group
                        </Typography>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <FormControl variant="standard" sx={{mt: 1, width: "100%" }}>
                                <Select
                                value={group}
                                onChange={onChangeGroup}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    {watchList.map((item,index)=>{
                                        return(
                                            <MenuItem key={index} value={item.WatchlistID}>
                                                <em>{item.WatchlistGroupName}</em>
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                                <FormHelperText>Select a group to save in</FormHelperText>
                            </FormControl>
                        </Grid>
                    
                        <Grid container direction="row" justifyContent="end" alignItems="center">
                            <NeutralButton function={ handleAddClose } text="CANCEL" />
                            <NeutralButton text="OK" function={ handleAddWatchList }/>
                        </Grid>
                    </Box>
                </Modal>

                {/* Remove WatchList Modal */}
                <Modal
                    open={removeOpen}
                    onClose={handleRemoveClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styles.modal}>
                        <Typography style={ styles.modalHeader }>
                            Remove from Watchlist
                        </Typography>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid>
                                <Typography sx={{ fontSize: 14, mt:1}} color={ theme.palette.secondary.main }>
                                    Are you sure you want to remove this security from your watchlist?
                                </Typography>
                            </Grid>
                        </Grid>
                    
                        <Grid container direction="row" justifyContent="end" alignItems="center" sx={{ mt: 3 }}>
                            <NeutralButton function={ handleRemoveClose } text="CANCEL" />
                            <NeutralButton text="OK" function={ handleRemoveWatchList }/>
                        </Grid>
                    </Box>
                </Modal>
            </Container>


        </>
    )

    
}

export default StockDetails;