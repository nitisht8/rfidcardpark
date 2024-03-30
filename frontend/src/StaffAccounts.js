import Paper from '@mui/material/Paper';
import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Zoom from '@mui/material/Zoom';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import { AdminControl } from './AdminAccess.js';

export function ManageStaff(){

    const[visibility, setVisibility] = React.useState(true);
    const[back, setBack] = React.useState(false)
    const[id, setId] = React.useState('')
    const[pw, setPw] = React.useState('')
    const[success, setSuccess] = React.useState(false)
    const[duplicate, setDuplicate] = React.useState(false)
    const[error, setError] = React.useState(false)

    const goBack=()=>{
        setVisibility(false)
        setBack(true)
        }
    
    const AddUser = (event) =>{
        if(id !== '' && pw !== ''){
            console.log(id,pw);
            const userdetails=[id,pw]
            axios.post('http://localhost:5000/api/register',{ data : userdetails })
            .then(response => {
                if (response.status===201){
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 3000);
                }})
            .catch(error => {
                if (error.response.status === 409) {
                    setDuplicate(true);
                    setTimeout(() => {
                        setDuplicate(false);
                    }, 3000);
                } else {
                    setError(true);
                    setTimeout(() => {
                        setError(false)
                    }, 3000);
                }
            });
        }
    }

    return (
        <div>
        <Fade in={visibility}>
    <div>
        <Stack direction="column" alignItems="center" justifyContent="center" spacing={4} sx={{ height: '105vh', width:'100vw', position:'absolute' }}>
            <Paper elevation={4} sx={{ width: '400px', height: '400px', bgcolor: '#FFDE59', display: 'flex',
            flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '20px' }}>
                <Typography variant='h4' style={{ marginBottom: '20px' }}>Manage Users</Typography>
                <TextField id='username' label='New Username' variant='outlined' value={id}
                onChange={(e)=>setId(e.target.value)} style={{ marginBottom: '20px', width: '100%' }} />
                <TextField id='password' label='Password' value={pw}
                onChange={(e)=>setPw(e.target.value)} style={{ marginBottom: '20px', width: '100%' }} />
                <Button variant='contained' style={{ width: '200px', height: '50px' }} onClick={AddUser}>Save</Button>
            </Paper>
            <Button
            style={{
              
              width: 150
            }}
            variant="contained"
            onClick={() => goBack()}
          >
            Back
          </Button>
            <Zoom in={duplicate}>
                <Alert severity="warning" style={{ width: '720px', position: 'absolute', left: '30.45%', top: '50%' }}>
                    <AlertTitle>Username already exists.</AlertTitle>
                    Please enter a new username.
                </Alert>
            </Zoom>
            <Zoom in={success}>
                <Alert severity="success" style={{ width: '720px', position: 'absolute', left: '30.45%', top: '50%' }}>
                    <AlertTitle>New User successfully added!</AlertTitle>
                    You may log in using your credentials.
                </Alert>
            </Zoom>
        </Stack>
        </div>
        </Fade>
        {back && <AdminControl/>}
        </div>
    )
}