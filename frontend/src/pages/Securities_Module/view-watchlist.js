// Packages
import React from "react";
import { useState, useEffect } from "react";
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
        }
    }

    // fake stoke price data
    const [securitiesList, setSecuritisList] = useState([
        {
            "ticker": "AAPL",
            "stock_name": "Apple Inc.",
            "price": 155.09,
            "change": 0.50,
            "changePercent": -0.13,
            "entryPrice": 146.21,
            "exitPrice": 154.49
        },
        {
            "ticker": "MSFT",
            "stock_name": "Microsoft Corporation",
            "price": 279.43,
            "change": 0.50,
            "changePercent": 1.17,
            "entryPrice": 262.18,
            "exitPrice": 285.24
        },
    ])

    return (
        <>
            <SecondaryAppBar link={`/securities`} text="Securities" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>

                    {/* Label for Security and the button for manage groups */}
                    <Grid container style={styles.grid} direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={styles.label} variant="h6">Securities</Typography>
                        <WhiteReusableButton buttonText="MANAGE GROUPS" />
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
                                        <Grid xs={7}>
                                        <CardContent style={styles.cardContentAlignRight}>
                                            <Typography sx={{ fontSize: 14, fontWeight: "bold", my: 0.5 }} color={theme.palette.secondary.main}>$ {item.price}</Typography>
                                            <Grid xs={12}>
                                                <Typography sx={{ fontSize: 10, fontWeight: "light", my: 0.5 }} color="#9197A4">1D {item.changePercent}</Typography>

                                            </Grid>

                                        </CardContent>
                                        {/* Entry and Exit price */}
                                        <Tooltip title="Recommended entry/exit price" placement="top" arrow>
                                            <CardContent style={styles.cardContentAlignRight}>
                                                <Typography sx={{ fontSize: 12, fontWeight: "light", my: 0.5 }} color="#9197A4">
                                                    ENTRY
                                                    <Chip sx={{ ml: 1 }} size="small" label="$146.21"></Chip>
                                                </Typography>
                                                <Typography sx={{ fontSize: 12, fontWeight: "light", my: 0.5 }} color="#9197A4">
                                                    EXIT
                                                    <Chip sx={{ ml: 1 }} size="small" label="$146.21"></Chip>
                                                </Typography>
                                            </CardContent>
                                        </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </>
                        )
                    })}
                </Box>
            </Container>
        </>
    )


}

export default ViewWatchList;