import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import React from 'react';
import { AdminControl } from './AdminAccess.js';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Zoom from '@mui/material/Zoom';

export function ManageSystem(){
    const[visibility, setVisibility] = React.useState(true);
    const[back, setBack] = React.useState(false);
    const[response, setResponse] = React.useState('')
    const[incompleteAlert, setIncompleteAlert] = React.useState(false)
    const[successAlert, setSuccessAlert] = React.useState(false)
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
            axios.post('http://localhost:5000/api/admincontrol', { data: newRates })
            .then(response => {
                setResponse(response.data);
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
    return (
        <div>
            <Fade in={visibility}>
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '57%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <Paper elevation={4} style={{height:'355px', width:'400px', backgroundColor:'#FFDE59', textAlign: 'center', borderRadius:'20px'}}>
                        <Stack direction='column' spacing={1} alignItems="center">
                            <Typography variant='h4'>Modify Parking Rates</Typography>
                            <TextField id='Rate1' label='Upto 1 hour' variant='outlined' value={r1} onChange={(e)=>setR1(e.target.value)} style={{width: '80%', marginBottom: 10}} />
                            <TextField id='Rate2' label='1-3 hours' value={r2} onChange={(e)=>setR2(e.target.value)} style={{width: '80%', marginBottom: 10}} />
                            <TextField id='Rate3' label='3-12 hours' value={r3} onChange={(e)=>setR3(e.target.value)} style={{width: '80%', marginBottom: 10}} />
                            <Button variant='contained' style={{width: '80%', height: '50px'}} onClick={SetRate}>Save</Button>
                        </Stack>
                    </Paper>
                    <Button
                        style={{
                            marginTop: 20,
                            width: 150
                        }}
                        variant="contained"
                        onClick={() => goBack()}
                    >
                        Back
                    </Button>
                </div>
            </Fade>
            <Zoom in={incompleteAlert}>
                <Alert severity="warning" style={{width:'400px', position:'absolute',left:'50%', transform: 'translateX(-50%)', bottom: '10px'}}>
                    <AlertTitle>Incomplete Data</AlertTitle>
                    Please update all fee values.
                </Alert>
            </Zoom>
            <Zoom in={successAlert}>
                <Alert severity="success" style={{width:'400px', position:'absolute',left:'50%', transform: 'translateX(-50%)', bottom: '10px'}}>
                    <AlertTitle>Changes Successful!</AlertTitle>
                    The fee modifications have been implemented.
                </Alert>
            </Zoom>
            {back && <AdminControl/>}
        </div>
    );
}
