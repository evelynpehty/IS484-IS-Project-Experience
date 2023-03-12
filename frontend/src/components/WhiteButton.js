import { Button } from "@mui/material";

const styles = {
    button: {
        paddingTop: "8px",
        paddingBottom: "8px",
        borderRadius: "30px",
        fontSize: "12px",
        color: "#4B4948",
        backgroundColor: "#FFFFFF"
    }
}

const WhiteReusableButton = (props) => {
    return (
        <Button style={ styles.button } variant="contained" onClick={ props.function } >{props.buttonText}</Button>
    )
}

export default WhiteReusableButton;