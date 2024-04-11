import Paper from '@mui/material/Paper';
import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Zoom from '@mui/material/Zoom';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import { AdminControl } from './AdminAccess.js';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export function ManageStaff(){

    const[visibility, setVisibility] = React.useState(true);
    const[back, setBack] = React.useState(false)
    const[id, setId] = React.useState('')
    const[pw, setPw] = React.useState('')
    const[existingId, setExistingId] = React.useState('')
    const[existingPw, setExistingPw] = React.useState('')
    const[success, setSuccess] = React.useState(false)
    const[duplicate, setDuplicate] = React.useState(false)
    const[deleteSuccess, setDeleteSuccess] = React.useState(false)
    const[wrongPw, setWrongPw] = React.useState(false)
    const[notFound, setNotFound] = React.useState(false)

    const goBack=()=>{
        setVisibility(false)
        setBack(true)
        }
    
    const AddUser = (event) =>{
        if(id !== '' && pw !== ''){
            const newdetails=[id,pw]
            axios.post('http://localhost:5000/api/register',{ data : newdetails })
            .then(response => {
                if (response.status===201){
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 5000);
                }})
            .catch(error => {
                if (error.response.status === 409) {
                    setDuplicate(true);
                    setTimeout(() => {
                        setDuplicate(false);
                    }, 5000);
                }
            });
        }
    }

    const DeleteUser=(event)=>{
        if(existingId!=='' && existingPw!==''){
            const staffdetails=[existingId, existingPw]
            axios.post('http://localhost:5000/api/deletestaff',{ data : staffdetails })
            .then(response => {
                if (response.status===200){
                    setDeleteSuccess(true);
                    setTimeout(() => {
                        setDeleteSuccess(false);
                    }, 5000);
                }
                else if (response.status===401){
                    setWrongPw(true);
                    setTimeout(() => {
                        setWrongPw(false);
                    }, 5000);
                }
            })
            .catch(error => {
                if (error.response.status === 404) {
                    setNotFound(true);
                    setTimeout(() => {
                        setNotFound(false);
                    }, 5000);
                }
            });
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
                }} >
            <Stack direction='row' spacing={2} alignItems='center'>
            <Paper elevation={4} style={{height:'45vh', width:'20vw', backgroundColor:'#FFDE59', textAlign: 'center', borderRadius:'20px'}}>
                <Stack direction='column' spacing={1} alignItems="center">
                <Typography variant='h5' style={{marginBottom: 18, marginTop: 10 }}>Add New Staff</Typography>
                <TextField id='username' label='New Username' variant='outlined' value={id}
                onChange={(e)=>setId(e.target.value)} style={{backgroundColor:'white', marginBottom: '15px', width: '80%' }} />
                <TextField id='password' label='Password' value={pw}
                onChange={(e)=>setPw(e.target.value)} style={{backgroundColor:'white', marginBottom: '15px', width: '80%' }} />
                <Fab variant='extended' size='small' sx={{bgcolor:'#77DD77'}} onClick={AddUser}>
                    <PersonAddAlt1Icon sx={{marginRight:1}} />
                    Create Account
                    </Fab>
                </Stack>
            </Paper>
            <Paper elevation={4} style={{height:'45vh', width:'20vw', backgroundColor:'#FFDE59', textAlign: 'center', borderRadius:'20px'}}>
            <Stack direction='column' spacing={1} alignItems="center">
                <Typography variant='h5' style={{marginBottom: 18, marginTop: 10 }}>Delete Existing Staff</Typography>
                <TextField id='username' label='Staff Username' variant='outlined' value={existingId}
                onChange={(e)=>setExistingId(e.target.value)} style={{backgroundColor:'white', marginBottom: '15px', width: '80%' }} />
                <TextField id='password' label='Password' value={existingPw}
                onChange={(e)=>setExistingPw(e.target.value)} style={{backgroundColor:'white', marginBottom: '15px', width: '80%' }} />
                <Fab variant='extended' size='small' sx={{bgcolor:'#C23B22'}} onClick={DeleteUser}>
                    <PersonRemoveIcon sx={{marginRight:1}} />
                    Delete Account
                    </Fab>
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
            <Zoom in={duplicate}>
                <Alert severity="warning" style={{width:'19vw', position:'absolute',left:'40.5vw', top:'50vh'}}>
                    <AlertTitle>ID already exists.</AlertTitle>
                    Please enter new Staff ID.
                </Alert>
            </Zoom>
            <Zoom in={success}>
                <Alert severity="success" style={{width:'19vw', position:'absolute',left:'40.5vw', top:'50vh'}}>
                    <AlertTitle>New Staff Account successfully added!</AlertTitle>
                    You may log in using your credentials.
                </Alert>
            </Zoom>
            <Zoom in={notFound}>
            <Alert severity="warning" style={{width:'20vw', position:'absolute',left:'40vw', top:'50vh'}}>
            <AlertTitle>Account Not Found!</AlertTitle>
            Please ensure you have entered your correct Staff ID.
            </Alert>
            </Zoom>
            <Zoom in={wrongPw} severity='warning' style={{width:'20vw', position:'absolute',left:'40vw', top:'50vh'}}>
            <Alert>
                <AlertTitle>Wrong Password!</AlertTitle>
                Please ensure that you have entered the correct password.
            </Alert>
            </Zoom>
            <Zoom in={deleteSuccess}>
                <Alert severity="success" style={{width:'25vw', position:'absolute',left:'37.5vw', top:'50vh'}}>
                    <AlertTitle>Account Successfully Deleted!</AlertTitle>
                    The Staff Account has been deleted and can no longer be used to log into Admin Access.
                </Alert>
            </Zoom>
        {back && <AdminControl/>}
        </div>
    )
}