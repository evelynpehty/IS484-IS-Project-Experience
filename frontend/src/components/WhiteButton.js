import { Button, useTheme } from "@mui/material";

const WhiteReusableButton = (props) => {
    const theme = useTheme();
    const styles = {
        button: {
            paddingTop: "8px",
            paddingBottom: "8px",
            borderRadius: "30px",
            fontSize: "12px",
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.neutral.main
    }
}
    return (
        <Button style={ styles.button } variant="contained" onClick={ props.function } >{props.buttonText}</Button>
    )
}

export default WhiteReusableButton;