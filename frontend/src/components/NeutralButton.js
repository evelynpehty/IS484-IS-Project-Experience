// MUI Components
import { Button, useTheme } from "@mui/material";

const NeutralButton = (props) => {
    const theme = useTheme();
    const styles = {
        button: {
            paddingTop: "8px",
            paddingBottom: "8px",
            fontSize: "14px",
            color: theme.palette.secondary.main
    }
}
    return (
        <Button style={ styles.button } onClick={ props.function } variant="text">{ props.text }</Button>
    )
}

export default NeutralButton;