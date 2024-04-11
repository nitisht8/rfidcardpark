import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import React from 'react';
import { AdminControl } from './AdminAccess.js';
import TextField from '@mui/material/TextField';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Zoom from '@mui/material/Zoom';

export function ManageSystem(){
    const[visibility, setVisibility] = React.useState(true);
    const[back, setBack] = React.useState(false);
    const[incompleteAlert, setIncompleteAlert] = React.useState(false);
    const[successAlert, setSuccessAlert] = React.useState(false);
    const[duplicateError, setDuplicateError] = React.useState(false);
    const[addSuccess, setAddSuccess] = React.useState(false);
    const[addCard, setAddCard] = React.useState(false);
    const[deleteCard, setDeleteCard] = React.useState(false);
    const[deleteSuccess, setDeleteSuccess] = React.useState(false);
    const[notFound, setNotFound] = React.useState(false);
    const[newCard, setNewCard] = React.useState('')
    const[existingCard, setExistingCard] = React.useState('')
    const[r1, setR1] = React.useState('')
    const[r2, setR2] = React.useState('')
    const[r3, setR3] = React.useState('')

    const goBack=()=>{
        setVisibility(false)
        setBack(true)
    }
    const SetRate=(event)=>{
        if(r1 !== '' && r2 !== '' && r3 !== ''){
            const newRates = [r1,r2,r3]
            axios.post('http://localhost:5000/api/updaterates', { data: newRates })
            .then(response => {
                setR1('');
                setR2('');
                setR3('');
                setSuccessAlert(true);
                setTimeout(() => {
                    setSuccessAlert(false);
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        else{
            setIncompleteAlert(true);
            setTimeout(() => {
                setIncompleteAlert(false);
            }, 5000);
        }
    }
    const AddNewCard=(event)=>{
        if(newCard.length===10){
            console.log(newCard);
            axios.post('http://localhost:5000/api/addcard', {cardID: newCard})
            .then(response => {
                if(response.status===201){
                    setAddCard(false);
                    setAddSuccess(true);
                    setTimeout(() => {
                        setAddSuccess(false);         
                    }, 5000);
                }
              })
              .catch(error => {
                if(error.response.status===409){
                    setAddCard(false);
                    setDuplicateError(true);
                    setTimeout(() => {
                        setDuplicateError(false);
                    }, 5000);
                }
              });
        }
    }
    const DeleteExistingCard=(event)=>{
        if(existingCard.length===10){
            console.log(existingCard);
            axios.post('http://localhost:5000/api/deletecard', {cardID: existingCard})
            .then(response => {
                if(response.status===200){
                    setDeleteCard(false);
                    setDeleteSuccess(true);
                    setTimeout(() => {
                        setDeleteSuccess(false);         
                    }, 5000);
                }
              })
              .catch(error=>{
                if(error.response.status){
                    setDeleteCard(false);
                    setNotFound(true);
                    setTimeout(() => {
                        setNotFound(false);
                    }, 5000);
                }
              })
        }
    }
    return (
        <div>
            <Fade in={visibility}>
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '57%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <Stack direction='row' spacing={2} alignItems='center'>
                    <Paper elevation={4} style={{height:'50vh', width:'20vw', backgroundColor:'#FFDE59', textAlign: 'center', borderRadius:'20px'}}>
                        <Stack direction='column' spacing={1} alignItems="center">
                            <Typography variant='h5' style={{marginBottom:5, marginTop:8}}>Modify Parking Rates</Typography>
                            <TextField id='Rate1' label='Upto 1 hour' value={r1} onChange={(e)=>setR1(e.target.value)}
                            style={{backgroundColor:'white', width: '80%', marginBottom: 10}} />
                            <TextField id='Rate2' label='1-3 hours' value={r2} onChange={(e)=>setR2(e.target.value)}
                            style={{backgroundColor:'white', width: '80%', marginBottom: 10}} />
                            <TextField id='Rate3' label='3-12 hours' value={r3} onChange={(e)=>setR3(e.target.value)}
                            style={{backgroundColor:'white', width: '80%', marginBottom: 7}} />
                            <Fab variant='extended' sx={{width: '60%', height: '5vh', bgcolor:'lightblue'}} onClick={SetRate}>Update Rates</Fab>
                        </Stack>
                    </Paper>
                    <Paper elevation={4} style={{height:'50vh', width:'20vw', backgroundColor:'#FFDE59', textAlign: 'center', borderRadius:'20px'}}>
                    <Typography variant='h5' style={{marginBottom:5, marginTop:10}}>Manage Cards</Typography>
                    <Stack direction='column' spacing={2} alignItems="center" sx={{marginTop:9}}>
                    <Fab variant='extended' sx={{bgcolor:'#77DD77'}} onClick={()=>setAddCard(true)}>
                        <AddCardRoundedIcon sx={{marginRight:1}} />
                        Add Card
                    </Fab>
                    <Dialog open={addCard}>
                        <DialogTitle>Add Card</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Please enter the ID of the new Card:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="newCardID"
                            label="Card ID"
                            type="text"
                            fullWidth
                            value={newCard}
                            onChange={(e)=>setNewCard(e.target.value)}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={()=>setAddCard(false)}>Cancel</Button>
                        <Button onClick={AddNewCard}>Add</Button>
                        </DialogActions>
                    </Dialog>
                    <Fab variant='extended' sx={{bgcolor:'#C23B22'}} onClick={()=>setDeleteCard(true)}>
                        <DeleteForeverRoundedIcon sx={{marginRight:1}} />
                        Delete Card
                    </Fab>
                    <Dialog open={deleteCard}>
                        <DialogTitle>Delete Card</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Please enter the ID of the Card you wish to delete:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="existingCardID"
                            label="Card ID"
                            type="text"
                            fullWidth
                            value={existingCard}
                            onChange={(e)=>setExistingCard(e.target.value)}
                        />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={()=>setDeleteCard(false)}>Cancel</Button>
                        <Button onClick={DeleteExistingCard}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                    </Stack>
                    </Paper>
                    </Stack>
                    <Button
                        style={{
                            position: 'absolute',
                            marginTop: '3%',
                            width: '25%'
                          }}
                        variant="contained"
                        onClick={() => goBack()}
                    >
                        Back
                    </Button>
                </div>
            </Fade>
            <Zoom in={incompleteAlert}>
                <Alert severity="warning" style={{width:'18vw', position:'absolute',left:'40.5vw', top:'50vh'}}>
                    <AlertTitle>Incomplete Data</AlertTitle>
                    Please update all fee values.
                </Alert>
            </Zoom>
            <Zoom in={successAlert}>
                <Alert severity="success" style={{width:'18vw', position:'absolute',left:'40.5vw', top:'50vh'}}>
                    <AlertTitle>Changes Successful!</AlertTitle>
                    The fee modifications have been implemented.
                </Alert>
            </Zoom>
            <Zoom in={duplicateError}>
                <Alert severity="warning" style={{width:'18vw', position:'absolute',left:'40.5vw', top:'50vh'}}>
                    <AlertTitle>Duplicate Card</AlertTitle>
                    The card you're trying to add is already registered.
                </Alert>
            </Zoom>
            <Zoom in={addSuccess}>
                <Alert severity="success" style={{width:'18vw', position:'absolute',left:'40.5vw', top:'50vh'}}>
                    <AlertTitle>Card Added!</AlertTitle>
                    The card has been successfully registered in the system.
                </Alert>
            </Zoom>
            <Zoom in={notFound}>
                <Alert severity="warning" style={{width:'18vw', position:'absolute',left:'40.5vw', top:'50vh'}}>
                    <AlertTitle>Card Not Found</AlertTitle>
                    The card you're trying to delete is not in the system.
                </Alert>
            </Zoom>
            <Zoom in={deleteSuccess}>
                <Alert severity="success" style={{width:'18vw', position:'absolute',left:'40.5vw', top:'50vh'}}>
                    <AlertTitle>Card Deleted!</AlertTitle>
                    The card has been successfully removed from the system.
                </Alert>
            </Zoom>
            {back && <AdminControl/>}
        </div>
    );
}
