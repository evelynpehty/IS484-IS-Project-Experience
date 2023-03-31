import { Card, CardContent, Box, Typography, useTheme } from "@mui/material";

import { ReactComponent as EditIcon } from "../assets/icons/edit-white.svg";

const DepositCard = (props) => {
    const theme = useTheme()

    const styles = {
        card: {
            marginBottom: "24px",
            borderRadius: "10px",
            padding: 10
        },

        cardContent: {
            paddingBottom: "16px"
        },
    }

    return (
        <Card style={ styles.card } key={ props.index } sx={{background: `${props.chosenColor}`}}>
            <CardContent style={ styles.cardContent }>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr 1fr' },
                        gap: 2,
                    }}
                >
                    <Typography sx={{ fontSize: 12 }} color="white">
                        UBS
                    </Typography>
                </Box>
                <Typography sx={{ fontSize: 16, fontWeight:"bold" }} color="white">
                    { props.accountName }
                </Typography>
                <Typography sx={{ fontSize: 12 }} color="white">
                    { props.accountID.substr(0, 4) } { props.accountID.substr(4, 4) } { props.accountID.substr(8, 4) }
                </Typography>
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