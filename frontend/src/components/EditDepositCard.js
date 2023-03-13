// Packages
import { Link } from "react-router-dom";

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardContent, Box, Typography, useTheme } from "@mui/material";

// Assets (Images & Icons)
import { ReactComponent as EditIcon } from "../assets/icons/edit-white.svg";

const DepositCard = (props) => {
    const theme = useTheme()

    const styles = {
        card: {
            background: "linear-gradient(to top right, #E69F9F, #E60000)",
            marginBottom: "24px",
            borderRadius: "15px",
            padding: 10
        },

        cardContent: {
            paddingBottom: "16px"
        },
    }

    return (
        <Card style={ styles.card } key={ props.index } >
            <CardContent style={ styles.cardContent }>
                <Grid container style={ styles.grid } justifyContent="center  ">
                    <Grid xs={ 8 }>
                        <Typography sx={{ fontSize: 12 }} color="white">
                            UBS
                        </Typography>
                        <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color="white">
                            { props.accountName }
                        </Typography>
                        <Typography sx={{ fontSize: 12 }} color="white">
                            { props.accountID.substr(0, 4) } { props.accountID.substr(4, 4) } { props.accountID.substr(8, 4) }
                        </Typography>
                    </Grid>
                    <Grid xs={ 4 }>
                        <Typography textAlign="end" >
                            <Link to={ props.link }> 
                                <EditIcon />
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
                <Typography sx={{ fontSize: 12 }} textAlign="end" color="white">
                    Available Balance
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight:"bold" }} textAlign="end" color="white">
                    SGD ${ props.availableBalance.toLocaleString("en-US") }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default DepositCard;