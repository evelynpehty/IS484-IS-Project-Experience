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

// Assets (Images & Icons)
import { ReactComponent as EditIcon } from "../../assets/icons/edit-red.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/add.svg";

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


    const { watchList } = useSelector((state) => state.securities);
    console.log(watchList)

    // Modal Component Functions

    //create modal
    const [createOpen, setCreateOpen] = React.useState(false);
    const handleCreateOpen = () => setCreateOpen(true);
    const handleCreateClose = () => setCreateOpen(false);

    //edit modal
    const [editOpen, setEditOpen] = React.useState(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    //delete modal
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);

    const handleAdd = () => {

    }

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }



    return (
        <>
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
                                                    <EditIcon onClick={ handleEditOpen }/>
                                                </Typography>                                                
                                            </Grid>
                                        </Grid>
                                        <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                                            <Button variant="text" sx={{ fontSize: 16, fontWeight:"bold", color:"#E60000" }} onClick={ handleDeleteOpen }> Delete Group</Button>
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

                    {/* Create Modal */}
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