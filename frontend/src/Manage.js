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

export function Management(){
    const[visibility, setVisibility] = React.useState(true);
    const[back, setBack] = React.useState(false)
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
    return (<div>
        <Fade in={visibility}>
            <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            <Paper elevation={4} style={{height:'360px', width:'720px'}}>
            <Stack direction='column' spacing={3}>
              <Typography variant='h4'>Modify Parking Rates</Typography>
                <TextField id='Rate1' label='Upto 1 hour' variant='outlined' value={r1} onChange={(e)=>setR1(e.target.value)}>

                </TextField>
                <TextField id='Rate2' label='1-3 hours' value={r2} onChange={(e)=>setR2(e.target.value)}>

                </TextField>
                <TextField id='Rate3' label='3-12 hours' value={r3} onChange={(e)=>setR3(e.target.value)}>

                </TextField>
                <Button variant='contained' style={{width:200, height:50}} onClick={SetRate}>Save</Button>
          </Stack>
          </Paper>
          <Button
            style={{
              marginTop: 20,
              width: 200
            }}
            variant="contained"
            onClick={() => goBack()}
          >
            Return Home
          </Button>
            </div>
        </Fade>
        <Zoom in={incompleteAlert}>
        <Alert severity="warning" style={{width:'720px', position:'absolute',left:'30.45%', top:'50%'}}>
        <AlertTitle>Incomplete Data</AlertTitle>
        Please update all fee values.
        </Alert>
        </Zoom>
        <Zoom in={successAlert}>
        <Alert severity="success" style={{width:'720px', position:'absolute',left:'30.45%', top:'50%'}}>
        <AlertTitle>Changes Successful!</AlertTitle>
        The fee modifications have been implemented.
        </Alert>
        </Zoom>
        {back && <AdminControl/>}
        </div>);
}