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
import { Container, Box, Typography, Card, CardContent, useTheme, Chip, Tooltip, Button, ClickAwayListener, styled, tooltipClasses } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";

// Icons
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";

function ViewWatchList() {
    const theme = useTheme();

    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
        ))(({ theme }) => ({
            [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[4],
            padding: "10px"
            },
        }));

    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: theme.palette.secondary.main,
            fontSize: "16px"
        },

        card: {
            background: theme.palette.neutral.main,
            marginBottom: "24px",
            borderRadius: "15px",
            padding: 10
        },

        cardContent: {
            paddingBottom: "16px"
        },

        cardContentAlignRight: {
            paddingBottom: "16px",
            textAlign: "right",
        },

        positive: {
            color: "#3BB537"
        },

        negative: {
            color: "#E60000"
        },

        greyChip: {
            color: "white",
            background: "#979797"
        },

        redChip: {
            color: "white",
            background: "linear-gradient(to top right, #E69F9F, #E60000)"
        },

        greenChip: {
            color: "white",
            background: "linear-gradient(to top right, #8AB8B2, #109877)"
        },
    }


    // retrieve data from state
    const { allSecuritiesList, watchList } = useSelector((state) => state.securities);
    console.log(watchList)
    console.log(allSecuritiesList)

    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    
    function getCurrentPrice(ticker){
        var result = allSecuritiesList.filter(function (el){
            return el.ticker === ticker
        })
        if(result.length !== 0){
            if(result[0].currentPrice !== null){
                return result[0].currentPrice
            }
            else {
                return 0
            }
        }
    }

    function getChange(ticker){
        var result = allSecuritiesList.filter(function (el){
            return el.ticker === ticker
        })
        if(result.length !== 0){
            if(result[0]["1_day_change_per_cent"] !== null){
                return result[0]["1_day_change_per_cent"].toFixed(2)
            }
            else {
                return 0
            }
        }
    }


    const handleManageWatchList = () => {
        navigate('/manage-watchlist')
    }

    const handleAddSecurities = () => {
        navigate("/browse-securities")
    }

    const handleTooltip = () => {
        setOpen(prev => !prev);
    };

    return (
        <React.Fragment>
            <SecondaryAppBar link={`/securities`} text="Securities" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>

                    {/* Label for Security and the button for manage groups */}
                    <Grid container style={styles.grid} direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={styles.label} variant="h6">Watchlist</Typography>
                        <WhiteReusableButton function={handleManageWatchList} buttonText="MANAGE GROUPS" />
                    </Grid>

                    {/* Mapping Starts Here */}
                    {watchList.map((item, index)=>{
                        return (
                            <>
                                {
                                    item.WatchlistGroupName !== "None" && 
                                    <Grid container style={styles.grid} direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography style={styles.label} variant="h6">{item.WatchlistGroupName}</Typography>
                                    </Grid>
                                }
                                
                                {item.watchlist_list !== null && item.watchlist_list.map((value, i)=>{
                                    return (
                                        <>
                                            <Card style={ styles.card }>
                                                <CardContent style={ styles.cardContent }>
                                                    {(index === 0 && i ===0) && <LightTooltip 
                                                        PopperProps={{
                                                            disablePortal: true,
                                                        }}
                                                        title= { 
                                                            <div> 
                                                                <Typography sx={{ fontSize: 10, fontWeight: "bold", color: theme.palette.primary.main }}>P&L Analysis</Typography>
                                                                <Typography sx={{ fontSize: 10, color: theme.palette.secondary.main }}>Recommended entry/exit prices</Typography>
                                                            </div> 
                                                        }
                                                        arrow
                                                        onClose={ handleTooltip }
                                                        open={ open }
                                                        placement="top-end"
                                                        disableFocusListener
                                                        disableHoverListener
                                                        disableTouchListener
                                                        sx={{ backgroundColor: theme.palette.neutral.main }}
                                                    >
                                                        <Grid container direction="row" justifyContent="space-between">
                                                            {/* First 12 grids */}
                                                            <Grid xs={3} sx={{m: "auto" }}>
                                                                <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color={theme.palette.secondary.main}>{value.ticker}</Typography>
                                                            </Grid>

                                                            <Grid xs={3} textAlign="end" sx={{ margin: "auto" }}>
                                                                <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color={theme.palette.secondary.main}>
                                                                   {`$${getCurrentPrice(value.ticker).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                                                </Typography>
                                                            </Grid>
                                                            
                                                            <Grid xs={6} textAlign="end" sx={{ mb: 1 }}>
                                                                <Typography sx={{ fontSize: 12 }} color="#979797" onClick={ handleTooltip }>
                                                                    ENTRY
                                                                    {/* Styling code for grey chip is styles.greyChip */}
                                                                    {value.entry > getCurrentPrice(value.ticker) && <Chip sx={{ ml: 1 }} style={ styles.greenChip } size="small" label={`$${value.entry.toFixed(2)}`}></Chip>}
                                                                    {value.entry <= getCurrentPrice(value.ticker) && <Chip sx={{ ml: 1 }} style={ styles.greyChip } size="small" label={`$${value.entry.toFixed(2)}`}></Chip>}
 
                                                                </Typography>
                                                            </Grid>

                                                            {/* Second 12 grids */}
                                                            <Grid xs={3} sx={{ margin: "auto" }}>
                                                                <Typography sx={{ fontSize: 12 }} color={theme.palette.secondary.main}>{value.tickerName}</Typography>
                                                            </Grid>

                                                            <Grid xs={3} textAlign="end" sx={{ margin: "auto" }}>
                                                                <Typography sx={{ fontSize: 12 }} color="#979797">
                                                                    1D
                                                                    <Typography sx={{ fontSize: 12, ml: 1 }} variant="p" color={ ( getChange(value.ticker) < 0) ? styles.negative : styles.positive }>
                                                                        {`${getChange(value.ticker)}%`}
                                                                    </Typography>
                                                                    
                                                                </Typography>
                                                            </Grid>

                                                            <Grid xs={6} textAlign="end">
                                                                <Typography sx={{ fontSize: 12 }} color="#979797">
                                                                    EXIT
                                                                    {/* Styling code for grey chip is styles.greyChip */}
                                                                    {value.exit >= getCurrentPrice(value.ticker) && <Chip sx={{ ml: 1 }} style={ styles.greyChip } size="small" label={`$${value.exit.toFixed(2)}`}></Chip>}
                                                                    {value.exit < getCurrentPrice(value.ticker) && <Chip sx={{ ml: 1 }} style={ styles.redChip } size="small" label={`$${value.exit.toFixed(2)}`}></Chip>}


                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </LightTooltip>}
                                                    {(index !== 0 || i!==0) && <Grid container direction="row" justifyContent="space-between">
                                                            {/* First 12 grids */}
                                                            <Grid xs={3} sx={{m: "auto" }}>
                                                                <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color={theme.palette.secondary.main}>{value.ticker}</Typography>
                                                            </Grid>

                                                            <Grid xs={3} textAlign="end" sx={{ margin: "auto" }}>
                                                                <Typography sx={{ fontSize: 14, fontWeight: "bold" }} color={theme.palette.secondary.main}>
                                                                   {`$${getCurrentPrice(value.ticker).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                                                </Typography>
                                                            </Grid>
                                                            
                                                            <Grid xs={6} textAlign="end" sx={{ mb: 1 }}>
                                                                <Typography sx={{ fontSize: 12 }} color="#979797" onClick={ handleTooltip }>
                                                                    ENTRY
                                                                    {/* Styling code for grey chip is styles.greyChip */}
                                                                    {value.entry > getCurrentPrice(value.ticker) && <Chip sx={{ ml: 1 }} style={ styles.greenChip } size="small" label={`$${value.entry.toFixed(2)}`}></Chip>}
                                                                    {value.entry <= getCurrentPrice(value.ticker) && <Chip sx={{ ml: 1 }} style={ styles.greyChip } size="small" label={`$${value.entry.toFixed(2)}`}></Chip>}
 
                                                                </Typography>
                                                            </Grid>

                                                            {/* Second 12 grids */}
                                                            <Grid xs={3} sx={{ margin: "auto" }}>
                                                                <Typography sx={{ fontSize: 12 }} color={theme.palette.secondary.main}>{value.tickerName}</Typography>
                                                            </Grid>

                                                            <Grid xs={3} textAlign="end" sx={{ margin: "auto" }}>
                                                                <Typography sx={{ fontSize: 12 }} color="#979797">
                                                                    1D
                                                                    <Typography sx={{ fontSize: 12, ml: 1 }} variant="p" color={ ( getChange(value.ticker) < 0) ? styles.negative : styles.positive }>
                                                                        {`${getChange(value.ticker)}%`}
                                                                    </Typography>
                                                                    
                                                                </Typography>
                                                            </Grid>

                                                            <Grid xs={6} textAlign="end">
                                                                <Typography sx={{ fontSize: 12 }} color="#979797">
                                                                    EXIT
                                                                    {/* Styling code for grey chip is styles.greyChip */}
                                                                    {value.exit >= getCurrentPrice(value.ticker) && <Chip sx={{ ml: 1 }} style={ styles.greyChip } size="small" label={`$${value.exit.toFixed(2)}`}></Chip>}
                                                                    {value.exit < getCurrentPrice(value.ticker) && <Chip sx={{ ml: 1 }} style={ styles.redChip } size="small" label={`$${value.exit.toFixed(2)}`}></Chip>}


                                                                </Typography>
                                                            </Grid>
                                                        </Grid>}
                                                </CardContent>
                                            </Card>
                                        </>
                                    )
                                })}

                                {item.watchlist_list === null && 
                                    <p>no securities</p>
                                }

                                
                                
                            </>
                        )
                    })}
                    <Grid xs={12} sx={{ mt: 3 }}>
                        <Button onClick={ handleAddSecurities } startIcon={<AddIcon />}>Add Securities</Button>
                    </Grid>
                    {/* Mapping ends here */}
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default ViewWatchList;