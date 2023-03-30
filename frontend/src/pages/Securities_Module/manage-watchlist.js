// Packages
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import moment from 'moment';

// MUI Components
import Grid from '@mui/material/Unstable_Grid2';
import { Container, Box, Card, CardContent, TextField, Alert, Stack, Typography, AlertTitle, Chip, Paper, Modal, InputLabel, FormControl, MenuItem, Select, Button, useTheme } from "@mui/material";

// Customised Components
import SecondaryAppBar from "../../components/SecondaryAppBar";
import WhiteReusableButton from "../../components/WhiteButton";
import NeutralButton from "../../components/NeutralButton";
import { fontWeight } from "@mui/system";
import Loading from '../../components/loading.js'

// Assets (Images & Icons)
import { ReactComponent as EditIcon } from "../../assets/icons/edit-red.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";

// API
import {watchlist, createWatchListName, updateWatchListName, deleteWatchList } from "../../actions/securities";

function ManageWatchList() {
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
        card2: {
            marginTop: "24px",
            marginBottom: "24px",
            borderRadius: "15px",
            padding: 10
        },
        positive: {
            color: "#3BB537"
        },
        negative: {
            color: "#E60000"
        },
        modal: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "80%",
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 3,
        },

        modalHeader: {
            fontSize: "18px",
            fontWeight: "bold",
            color: theme.palette.primary.main
        }
    }


    // retrieve data from state
    const { watchList } = useSelector((state) => state.securities);
    const { user } = useSelector((state) => state.auth);

    console.log(watchList)

    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch()


    // ADD
    const [createOpen, setCreateOpen] = React.useState(false);
    const handleCreateOpen = () => setCreateOpen(true);
    const handleCreateClose = () => setCreateOpen(false);

    const [groupName, setGroupName] = useState("");
    const onChangeGroupName = (e) =>{
        setGroupName(e.target.value);
    }
    
    const handleAdd = () => {
        setLoading(true)
        setCreateOpen(false)

        var input = {
            "userID": user.data.UserID,
            "watchlistName": groupName
        }
        
        /*const promiseArray = [] 
        promiseArray.push(dispatch(createWatchListName(input)))
        promiseArray.push(dispatch(watchlist(user.data.UserID)))*/

        dispatch(createWatchListName(input)).then(()=>{
            dispatch(watchlist(user.data.UserID)).then(()=>{
                setLoading(false)
            }).catch((error)=>{
                setLoading(false)
            })
        }).catch((error)=>{
            setLoading(false)
        })

        /*Promise.all(promiseArray).then(()=>{
            setLoading(false)
        }).catch((error)=>{
            setLoading(false)
        })*/

        setGroupName("")
    }


    // EDIT
    const [editWatchListID, setEditWatchListID] = useState("");
    const [newGroupName, setNewGroupName] = useState("");
    const onChangeNewGroupName = (e) =>{
        setNewGroupName(e.target.value);
    }

    const [editOpen, setEditOpen] = React.useState(false);
    const handleEditOpen = (id) => {
        setEditWatchListID(id)
        setEditOpen(true)
    };
    const handleEditClose = () => {
        setNewGroupName("")
        setEditOpen(false)
    };

    const handleEdit = () => {
        setEditOpen(false)
        setLoading(true)
        var input = {
            "watchlistID": editWatchListID,
            "newWatchlistGroupName": newGroupName
        }
        dispatch(updateWatchListName(input)).then((response)=>{
            console.log(response)
            setLoading(false)
        }).catch((error)=>{
            console.log(error)
            setLoading(false)
        })
        setNewGroupName("")
    }


    // DELETE
    const [deleteWatchListID, setDeleteWatchListID] = useState("");
    const [deleteOpen, setDeleteOpen] = React.useState(false);

    const handleDeleteOpen = (id) => {
        setDeleteWatchListID(id)
        setDeleteOpen(true)
    }
    const handleDeleteClose = () => {
        setDeleteOpen(false)
    }

    const handleDelete = () => {
        setDeleteOpen(false)
        setLoading(true)
    
        dispatch(deleteWatchList(deleteWatchListID)).then((response)=>{
            console.log(response)
            setLoading(false)
        }).catch((error)=>{
            console.log(error)
            setLoading(false)
        })
        setNewGroupName("")
    }

    return (
        <>
            { loading && <Loading></Loading> } 
            <SecondaryAppBar link={`/view-watchlist`} text="Watchlist" />
            <Container maxWidth="lg">
                <Box sx={{ pt: 10, pb: 10 }}>
                    {/* Label for Security and the button for manage groups */}
                    <Grid container style={styles.grid} direction="row" justifyContent="space-between" alignItems="center">
                        <Typography style={styles.label} variant="h6">Manage Groups</Typography>  
                    </Grid>

                    {watchList.map((item, index) => {
                        return (
                            <>
                                <Card style={ styles.card2 } elevation={ 4 }>
                                    <CardContent style={ styles.cardContent }>
                                        <Grid container style={ styles.grid } justifyContent="center">
                                            <Grid xs={ 8 }>
                                                <Typography sx={{ fontSize: 16, color:"#4B4948", fontWeight:"bold" }}>
                                                    {item.WatchlistGroupName}
                                                </Typography>
                                                <Typography sx={{ fontSize: 14,  color:"#4B4948" }}>
                                                    { item.number_of_stock } Securities in Group
                                                </Typography>
                                            </Grid>
                                            <Grid xs={ 4 }>
                                                <Typography textAlign="end" >
                                                    <EditIcon onClick={()=>handleEditOpen(item.WatchlistID)} />
                                                </Typography>                                                
                                            </Grid>
                                        </Grid>
                                        <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                                            <Button variant="text" sx={{ fontSize: 16, fontWeight:"bold", color:"#E60000" }}  onClick={()=>handleDeleteOpen(item.WatchlistID)}> Delete Group</Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </>
                            
                        )
                    })}

                    {/* Edit Modal */}
                    <Modal
                        open={editOpen}
                        onClose={handleEditClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styles.modal}>
                            <Typography style={ styles.modalHeader }>
                                Rename Group
                            </Typography>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Grid>
                                <FormControl variant="standard" sx={{ m: 1, width: "80%" }}>           
                                    <TextField
                                        required
                                        id="NewGroupName"
                                        name='NewGroupName'
                                        label="New Group Name"
                                        value={newGroupName}
                                        onChange={onChangeNewGroupName}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="standard"    
                                    />
                                </FormControl>
                                </Grid>
                            </Grid>
                        
                            <Grid container direction="row" justifyContent="end" alignItems="center">
                                <NeutralButton function={ handleEditClose } text="CANCEL" />
                                <NeutralButton text="OK" function={ handleEdit }/>
                            </Grid>
                        </Box>
                    </Modal>

                    {/* Delete Modal */}
                    <Modal
                        open={deleteOpen}
                        onClose={handleDeleteClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styles.modal}>
                            <Typography style={ styles.modalHeader }>
                                Delete Group
                            </Typography>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                <Grid>
                                    <Typography sx={{ fontSize: 14, color:"#4B4948", mt:1}}>
                                        Are you sure you want to delete this group?
                                    </Typography>
                                </Grid>
                            </Grid>
                        
                            <Grid container direction="row" justifyContent="end" alignItems="center">
                                <NeutralButton function={ handleDeleteClose } text="CANCEL" />
                                <NeutralButton text="OK" function={ handleDelete }/>
                            </Grid>
                        </Box>
                    </Modal>

                    {/* ADD Modal */}
                    <Grid xs={12} sx={{ mt: 3 }}>
                        <Box onClick={ handleCreateOpen }>       
                            <Typography sx={{ fontSize: 14, fontWeight:"bold", color:"#E60000" }}>
                                 <AddIcon /> Create New Group
                            </Typography>
                        </Box>
                        <Modal
                            open={createOpen}
                            onClose={handleCreateClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={styles.modal}>
                                <Typography style={ styles.modalHeader }>
                                    Create New Group
                                </Typography>
                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <Grid>
                                    <FormControl variant="standard" sx={{ m: 1, width: "80%" }}>           
                                        <TextField
                                            required
                                            id="GroupName"
                                            name='GroupName'
                                            label="Group Name"
                                            value={groupName}
                                            onChange={onChangeGroupName}
                                            InputLabelProps={{
                                                shrink: true,
                                              }}
                                            variant="standard"    
                                        />
                                    </FormControl>
                                        
                                    </Grid>
                                    
                                </Grid>
                            
                                <Grid container direction="row" justifyContent="end" alignItems="center">
                                    <NeutralButton function={ handleCreateClose } text="CANCEL" />
                                    <NeutralButton text="OK" function={ handleAdd }/>
                                </Grid>
                            </Box>
                        </Modal>
                    </Grid>
                </Box>
            </Container>
        </>
    )


}

export default ManageWatchList;