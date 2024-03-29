import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fade from '@mui/material/Fade';
import { AdminControl } from './AdminAccess.js';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Zoom from '@mui/material/Zoom';
import AlertTitle from '@mui/material/AlertTitle';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
        CardParkᵀᴹ developed by <Link color="inherit" href="https://www.linkedin.com/in/nitishthatte/">Nitish Thatte</Link>
      {', '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export function LogIn() {

  const[id, setId] = React.useState('')
  const[pw, setPw] = React.useState('')
  const [visibility, setVisibility] = React.useState(true)
  const [success, setSuccess] = React.useState(false)
  const [pwerror, setPwerror] = React.useState(false)
  const [iderror, setIderror] =  React.useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    const logindata = [id,pw]
    axios.post('http://localhost:5000/api/login', { data: logindata })
          .then(response => {
            if (response.status===200){
              setVisibility(false);
              setSuccess(true);
            }
          })
          .catch(error => {
            if (error.response.status===404){
              setIderror(true);
              setTimeout(() => {
                setIderror(false);
              }, 3000);
            }
            else if (error.response.status===401){
              setPwerror(true);
              setTimeout(() => {
                setPwerror(false);
              }, 3000);
            }
          });
  }
  return (
    <div>
      <Fade in={visibility} timeout={200} >
        <div>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs"
      sx={{ width: 375,
        height: 450,
        borderRadius: 5,
        position : 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#ffe066',
        }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h4">
            Administrator Access
          </Typography>
          <TextField id='username' label='New Username' variant='outlined' value={id} onChange={(e)=>setId(e.target.value)}
          style={{ marginBottom: '20px', width: '100%' }} />
          <TextField id='password' label='Password' value={pw} onChange={(e)=>setPw(e.target.value)}
          style={{ marginBottom: '20px', width: '100%' }} />
            <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 ,
            bgcolor:'#7927c4'
        }}
            >
            Login
            </Button>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
    </Fade>
    <Zoom in={iderror}>
        <Alert severity="warning" style={{width:'720px', position:'absolute',left:'50%', top:'50%'}}>
        <AlertTitle>Wrong Id!</AlertTitle>
        Please ensure you have entered your correct Staff ID.
        </Alert>
        </Zoom>
        <Zoom in={pwerror} severity='warning' style={{width:'720px', position:'absolute',left:'50%', top:'50%'}}>
          <Alert>
            <AlertTitle>Wrong Password!</AlertTitle>
            Please ensure that you have entered the correct password.
          </Alert>
        </Zoom>
    {success && <AdminControl/>}
    </div>
  );
}