// Packages
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import moment from 'moment';

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, Card, CardContent, useTheme, Button, Modal, InputLabel, FormControl, MenuItem, Select, FormHelperText } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";
import NeutralButton from "../../components/NeutralButton";
import Loading from '../../components/loading.js'

// Assets (Images & Icons)
import { ReactComponent as HeartLineIcon } from "../../assets/icons/heart-line-red.svg";
import { ReactComponent as HeartSolidIcon } from "../../assets/icons/heart-filled-red.svg";

// API
import { watchlist, addSecurities_WatchList, removeSecurities_WatchList } from "../../actions/securities";


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
            color: theme.palette.primary.main
        }
    }

    const { ticker } = useParams()
    const { allSecuritiesList, watchList } = useSelector((state) => state.securities);
    const { user } = useSelector((state) => state.auth);

    const [display, setDisplay] = useState("");
    const [isWatchList, setIsWatchList] = useState("");
    
    console.log(allSecuritiesList)
    console.log(watchList)

    useEffect(() => {
        var result = allSecuritiesList.filter(function (el)
        {
            return el.ticker === ticker
        })
        setDisplay(result[0])

        watchList.forEach(element => {
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
    const [group, setGroup] = React.useState("None");
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
                setLoading(false)
            })
        }).catch((error)=>{
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
                            <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
                                <Select
                                value={group}
                                onChange={onChangeGroup}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="None">
                                        <em>None</em>
                                    </MenuItem>
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
                                <Typography sx={{ fontSize: 14, color:"#4B4948", mt:1}}>
                                    Are you sure you want to remove this security from your watchlist?
                                </Typography>
                            </Grid>
                        </Grid>
                    
                        <Grid container direction="row" justifyContent="end" alignItems="center">
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