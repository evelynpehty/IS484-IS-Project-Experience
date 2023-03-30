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
import { Container, Box, Typography, Card, CardContent, useTheme, Chip, Tooltip } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";
import { fontWeight } from "@mui/system";

// Icons
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";

function ViewWatchList() {
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
            background: "linear-gradient(to top right, #7ab2a9, #109877)"
        },
    }

    // fake stoke price data
    const [securitiesList, setSecuritisList] = useState([
        {
            "ticker": "AAPL",
            "stock_name": "Apple Inc.",
            "price": 145.09,
            "change": 0.50,
            "changePercent": -0.13,
            "entryPrice": 146.21,
            "exitPrice": 154.49
        },
        {
            "ticker": "MSFT",
            "stock_name": "Microsoft Corporation",
            "price": 289.43,
            "change": 0.50,
            "changePercent": 1.17,
            "entryPrice": 262.18,
            "exitPrice": 285.24
        },
    ])

    const navigate = useNavigate();

    const handleManageWatchList = () => {
        navigate('/manage-watchlist')
    }

    const handleAddSecurities = () => {
        console.log("add securities")
    }

    return (
        <>
            <SecondaryAppBar link={`/securities`} text="Securities" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>

                    {/* Label for Security and the button for manage groups */}
                    <Grid container style={styles.grid} direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={styles.label} variant="h6">Watchlist</Typography>
                        <WhiteReusableButton function={handleManageWatchList} buttonText="MANAGE GROUPS" />
                    </Grid>

                    {/* Name of the group of stocks*/}
                    <Typography>Technology</Typography>

                    {securitiesList.map((item, index) => {
                        return (
                            <>
                                <Card sx={{ my: 2 }}>
                                    <Grid container direction="row" xs={12}>
                                        {/* Stock ticker & stock name */}
                                        <Grid xs={5}>
                                            <CardContent style={styles.cardContent}>
                                                <Typography sx={{ fontSize: 14, fontWeight: "bold", my: 0.5 }} color={theme.palette.secondary.main}>{item.ticker}</Typography>
                                                <Typography sx={{ fontSize: 10, fontWeight: "light", my: 0.5 }} color={theme.palette.secondary.main}>{item.stock_name}</Typography>
                                            </CardContent>
                                        </Grid>

                                        {/* Price of the stock */}
                                        <Grid xs={3}>
                                            <CardContent style={styles.cardContentAlignRight}>

                                                {/* stock price */}
                                                <Typography sx={{ fontSize: 14, fontWeight: "bold", my: 0.5 }} color={theme.palette.secondary.main}>
                                                    $ {item.price}
                                                </Typography>

                                                {/* stock price % change */}
                                                <Grid xs={12}>
                                                    <Typography sx={{ fontSize: 12, fontWeight: "light", my: 0.5 }} variant="p" color="#9197A4">
                                                        1D
                                                    </Typography>
                                                    <Typography variant="p">
                                                        &nbsp;
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 12, fontWeight: "light", my: 0.5 }} variant="p" color={item.changePercent > 0 ? styles.positive : styles.negative}>
                                                        {item.changePercent}%
                                                    </Typography>
                                                </Grid>

                                            </CardContent>
                                        </Grid>

                                        {/* Entry and Exit price */}
                                        <Grid xs={4}>
                                            <Tooltip title="Recommended  entry/exit price" placement="top" arrow>
                                                <CardContent style={styles.cardContentAlignRight}>

                                                    <Typography sx={{ fontSize: 12, fontWeight: "light", my: 0.5 }} color="#9197A4">
                                                        ENTRY
                                                        {/* if price > entryPrice --> greyChip; else redChip */}
                                                        <Chip sx={{ ml: 1 }} style={item.price > item.entryPrice ? styles.greyChip : styles.redChip} size="small" label={`$${item.entryPrice}`}></Chip>
                                                    </Typography>

                                                    <Typography sx={{ fontSize: 12, fontWeight: "light", my: 0.5 }} color="#9197A4">
                                                        EXIT
                                                        {/* if price < exitPrice --> greyChip; else greenChip */}
                                                        <Chip sx={{ ml: 1 }} style={item.price < item.exitPrice ? styles.greyChip : styles.greenChip} size="small" label={`$${item.exitPrice}`}></Chip>
                                                    </Typography>
                                                </CardContent>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </>
                        )
                    })}

                    <Grid xs={12} sx={{ mt: 3 }}>
                        <Box onClick={handleAddSecurities}>
                            <Typography sx={{ display: "flex", justifyItems: "center", fontSize: 16, fontWeight: "regular", color: "#E60000" }}>
                                <AddIcon />
                                <Typography> &nbsp; </Typography>
                                 Add Securities
                            </Typography>
                        </Box>
                    </Grid>
                </Box>
            </Container>
        </>
    )


}

export default ViewWatchList;