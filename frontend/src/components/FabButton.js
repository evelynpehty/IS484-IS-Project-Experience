import { Fab, useTheme } from "@mui/material";

import { ReactComponent as AddIcon } from "../assets/icons/plus-line-red.svg";

const WhiteReusableButton = (props) => {
    const theme = useTheme()

    const styles = {
        fabButton: {
            position: "fixed",
            bottom: 80,
            right: 16,
            backgroundColor: theme.palette.other.lightRed,
            color: theme.palette.primary.main
        }
    }

    return (
        <Fab style={ styles.fabButton } color="primary" aria-label="add">
            <AddIcon />
        </Fab>
    )
}

export default WhiteReusableButton;