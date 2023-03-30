// Packages
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import moment from 'moment';

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Typography, Card, CardContent, useTheme, Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";

// Assets (Images & Icons)
import { ReactComponent as NextIcon } from "../../assets/icons/next-red.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-red.svg";

function BrowseSecurities() {
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
            background: theme.palette.neutral.main,
            marginBottom: "16px"
        },

        cardContent: {
            paddingBottom: "16px"
        },

        cardContentAlignRight: {
            paddingBottom: "16px",
            textAlign: "right",
        },

        positive: {
            fontSize: "12px",
            color:"#109878"
        },

        negative: {
            fontSize: "12px",
            color:"#E60000"
        },

        gradientText: {
            background: "linear-gradient(to top right, #E69F9F, #E60000)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            fontSize: "14px"
        }
    }

    const { allSecuritiesList } = useSelector((state) => state.securities);
    const [display, setDisplay] = useState(allSecuritiesList)
    const [search, setSearch] = useState("");

    const onChangeSearch = (e) =>{
        var searchText = e.target.value;
        setSearch(searchText);
        if(searchText === ""){
            setDisplay(allSecuritiesList)
        }
        else{
            var result = allSecuritiesList.filter(function (el)
            {
                return (el.ticker.toLowerCase()).includes(searchText.toLowerCase()) || (el.tickerName.toLowerCase()).includes(searchText.toLowerCase())
            })
            setDisplay(result)
        }
    }

    return (
        <>
            <SecondaryAppBar link={`/view-watchlist`} text="Watchlist" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    <Grid container style={styles.grid} direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={styles.label} variant="h6">Browse Securities</Typography>
                    </Grid>
                    
                    <Card style={ styles.card }>
                        <CardContent style={ styles.cardContent }>
                            <Typography sx={{ fontSize: 16, fontWeight: "bold"}} color={ theme.palette.secondary.main }>
                                View Profit & Loss Analysis
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color={ theme.palette.secondary.main }>
                                Recommended entry/exit prices
                            </Typography>
                            <Button endIcon={<NextIcon />} sx={{ mt: 3, p: 0 }}>
                                <Typography style={ styles.gradientText }>
                                    View in Watchlist
                                </Typography>
                            </Button>
                        </CardContent>
                    </Card>

                    <FormControl sx={{ mb: 2, background: theme.palette.neutral.main }} variant="outlined" fullWidth="true">
                        <InputLabel sx={{ color: "#BFBFBF" }} htmlFor="outlined-adornment-password">Search</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type="text"
                            value={search}
                            onChange={onChangeSearch}
                            endAdornment={
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                            }
                            label="Search"
                        />
                    </FormControl>


                    {/* All Securities List */}
                    { display.map(( value, index ) => {
                        return (
                            <Link to={`/view-stock-details/${value.ticker}`} key={index}> 
                                <Card style={ styles.card }>
                                    <CardContent>
                                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color={ theme.palette.secondary.main }>
                                                { value.ticker }
                                            </Typography>
                                            <Typography sx={{ fontSize: 14 }} textAlign="end" color={ theme.palette.secondary.main }>
                                                US${ value.currentPrice }
                                            </Typography>
                                        </Grid>
                                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography sx={{ fontSize: 12 }} color={ theme.palette.secondary.main }>
                                                { value.tickerName }
                                            </Typography>
                                            <Typography variant="p" sx={{ fontSize: 12 }} textAlign="end" color="#979797">
                                                1D
                                                <Typography variant="p" sx={{ ml: 1 }} style={ value["1_day_change_per_cent"] < 0 ? styles.negative : styles.positive }>
                                                    { value["1_day_change_per_cent"].toFixed(2)}%
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    }) }
                </Box>
            </Container>
        </>
    )

    
}

export default BrowseSecurities;