import { Button, useTheme } from "@mui/material";

const PrimaryButton = (props) => {
    const theme = useTheme();
    const styles = {
        button: {
            paddingTop: "8px",
            paddingBottom: "8px",
            fontSize: "14px",
            color: theme.palette.neutral.main,
            background: "linear-gradient(to top right, #E69F9F, #E60000)"
    }
}
    return (
        <Button style={ styles.button } variant="contained" onClick={ props.function } fullWidth={ true }>{props.buttonText}</Button>
    )
}

export default PrimaryButton;