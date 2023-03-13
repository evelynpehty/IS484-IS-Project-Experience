import { Button, useTheme } from "@mui/material";

const OutlinedReusableButton = (props) => {
    const theme = useTheme();
    const styles = {
        button: {
            paddingTop: "8px",
            paddingBottom: "8px",
            border: "linear-gradient(to top right, #E69F9F, #E60000)",
            borderWidth: "medium",
            borderRadius: "30px",
            fontSize: "12px",
            color: "linear-gradient(to top right, #E69F9F, #E60000)",
            backgroundColor: theme.palette.neutral.main
        }
    }
    return (
        <Button style={ styles.button } variant="outlined" onClick={ props.function } >{props.buttonText}</Button>
    )
}

export default OutlinedReusableButton;