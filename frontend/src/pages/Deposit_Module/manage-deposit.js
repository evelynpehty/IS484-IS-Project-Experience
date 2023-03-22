// Packages
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import { deposit, updateDepositAccount } from "../../actions/deposit"

// MUI Components
import { Container, Box, Typography, Paper, useTheme, styled, Stack, Alert, AlertTitle } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import PrimaryButton from "../../components/PrimaryButton";
import WhiteReusableButton from "../../components/WhiteButton";
import OutlinedReusableButton from "../../components/OutlinedButton";
import DepositCard from "../../components/DepositCard";
import EditDepositCard from "../../components/EditDepositCard";
import FabButton from "../../components/FabButton";
import InputBox from "../../components/InputBox"
import Loading from '../../components/loading.js'

function ManageDeposit() {
    // Styling for Manage Deposit Page
    const theme = useTheme();
    const styles = {
        grid: {
            marginBottom: "24px"
        },

        label: {
            fontWeight: "bold",
            color: "#4B4948",
            fontSize: "18px"
        },

        inputLabel: {
            color: "#4B4948",
            fontSize: "12px",
            marginTop: "16px"
        },

        fabButton: {
            position: "absolute",
            bottom: 80,
            right: 16,
            backgroundColor: "#F7E6E6"
        },

        chipSelected: {
            borderStyle: "solid",
            borderColour: "gray"
        }, 

        chipUnSelected: {
            borderStyle: "none"
        }
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
        borderRadius: 50,
      }));

    const { id } = useParams() //depositAccountId
    const { depositList } = useSelector((state) => state.deposit);
    
    const deposit_item = depositList.filter(function (el)
    {
      return el.DepositAccountID === id
    })

    const [accoutName, setAccountName] = useState(deposit_item[0].AccountName);
    const [chosenColor, setChosenColor] = useState(deposit_item[0].ChosenColor);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("")
    const dispatch = useDispatch()
    const colorChoiceArray = [
        "linear-gradient(to top right, #E69F9F, #E60000)",
        "linear-gradient(to top right, #DBBB9E, #FF7D1F)",
        "linear-gradient(to top right, #A4B6D2, #0085FF)",
        "linear-gradient(to top right, #B5A4D2, #745DFF)",
        "linear-gradient(to top right, #D2A4C5, #FF42BF)"
    ]

    const onChangeAccountName = (e) => {
        const input_accountName = e.target.value;
        setAccountName(input_accountName);
    };

    function handleColourChange(index){
        setChosenColor(colorChoiceArray[index])
    }

    const { user } = useSelector((state) => state.auth);
    // const UserID = user.data.UserID

    const handleSave = () => {
        setLoading(true)
        setStatus("")
        const input = {
            "depositAccountID": id,
            "newColor": chosenColor,
            "newName": accoutName
        }

        console.log(input)
        
        dispatch(updateDepositAccount(input)).then((response)=>{
            console.log(response)
            setLoading(false)
            setStatus("success")
        }).catch((error)=>{
            setLoading(false)
            setStatus("error")
        })

        /*dispatch(updateDepositAccount(input)).then((response)=>{
            console.log(response)
        }).then(()=>{
            dispatch(deposit(UserID)).then(()=>{
                setStatus("success")
            })
        }).catch((error)=>{
            setStatus("error")
        })*/
    }

    return (
        <React.Fragment>
            { loading && <Loading></Loading> } 
            <SecondaryAppBar link={ "/deposit" } text="All Accounts" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    {status==="success" && <Stack sx={{ width: '100%', mb:2 }} spacing={2}>
                            <Alert severity="success" onClose={() => {setStatus("")}}>
                                <AlertTitle>Success</AlertTitle>
                                {"Deposit Account Updated!"}
                            </Alert>
                        </Stack>}

                        {status==="error" && <Stack sx={{ width: '100%', mb:2 }} spacing={2}>
                            <Alert severity="error" onClose={() => {setStatus("")}}>
                                <AlertTitle>Error</AlertTitle>
                                {"Fail to Update. Please Try Again"}
                            </Alert>
                        </Stack>}
                    {/* Account Type */}
                    <Typography style={ styles.label }>Product Name</Typography>
                    <Typography style={ styles.inputLabel }>Product Name</Typography>
                    <InputBox disabled={ true } value={ deposit_item[0].ProductName } />
                    
                    {/* Account Name */}
                    <Typography style={ styles.label }>Enter a Name</Typography>
                    <Typography style={ styles.inputLabel }>Name of Account</Typography>
                    <InputBox placeholder="Give a name for your account" value={ accoutName } id="accountName" name="accountName" onChange={onChangeAccountName}/>
                    
                    {/* Appearance */}
                    <Typography style={ styles.label }>Appearance</Typography>
                    <Typography style={ styles.inputLabel }>Select a Colour</Typography>
                    <Box
                        sx={{
                            mt: "16px",
                            mb: "48px",
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr 1fr 1fr 1fr 1fr' },
                            gap: 2,
                        }}
                    >
                        {
                            colorChoiceArray.map((item,index)=> {
                                return (
                                    <>
                                     <Item key={index} sx={{ background: `${item}` }} style={(item === chosenColor) ? styles.chipSelected : styles.chipUnSelected } onClick={() => handleColourChange(index)}></Item>
                                    </>
                                )
                            })
                        }
                    </Box>

                    <PrimaryButton buttonText="SAVE" function={handleSave}/>          
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default ManageDeposit;