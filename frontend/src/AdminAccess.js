import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import analyticimg from './assets/analytics.png';
import settingsimg from './assets/settings.png';
import usersimg from './assets/users.png'
import Fade from '@mui/material/Fade';
import { ShowData } from './Analyze.js';
import { ManageSystem } from './Manage.js';
import { ManageStaff } from './StaffAccounts.js';
import App from './App.js'
import './fonts.css'
import { Typography } from '@mui/material';

const ButtonStyle = {
  backgroundSize: '80%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '38vh',
  width: '20vw',
  borderRadius: 20,
};

export function AdminControl() {

  const [visibility, setVisibility] = React.useState(true);
  const [mainscreen, setMainscreen] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);
  const [management, setManagement] = React.useState(false);
  const [staff, setStaff] = React.useState(false)

  const handleClick = (buttontype) => {
    setVisibility(false);

    if (buttontype === 'analyze') {
      setAnalytics(true);
    }
    else if (buttontype === 'manage') {
      setManagement(true);
    }
    else if (buttontype==='return'){
        setMainscreen(true);
    }
    else if (buttontype==='users'){
      setStaff(true)
    }
  };

  return (
    <div>
      <Fade in={visibility} timeout={300}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '52%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Stack direction='row' spacing={8}>
            <Button
              style={{ ...ButtonStyle, backgroundImage: `url(${analyticimg})`, backgroundPositionY: '150%' }}
              variant='contained'
              onClick={() => handleClick('analyze')}
            >
              <p style={{fontFamily:'mavenpro', position:'relative', top:'-14.2vh', fontSize:'400%', color:'black'}}>
                Analytics
              </p>
            </Button>
            <Button
              style={{...ButtonStyle, backgroundImage: `url(${settingsimg})`, backgroundPositionY:'235%'}}
              variant='contained'
              onClick={() => handleClick('manage')}
            >
              <p style={{fontFamily:'mavenpro', position:'relative', top:'-14.2vh', fontSize:'400%', color:'black'}}>
                System
              </p>
            </Button>
            <Button style={{...ButtonStyle, backgroundImage: `url(${usersimg})`,backgroundPositionY:'120%'}}
                    variant='contained'
                    onClick={()=>handleClick('users')}>
                      <p style={{fontFamily:'mavenpro', position:'relative', top:'-14.2vh', fontSize:'400%', color:'black'}}>
                Staff
              </p>
                    </Button>
          </Stack>
          <Button
            style={{
              marginTop: '1vh',
              width: '15vw',
            }}
            variant="contained"
            onClick={() => handleClick('return')}
          >
            Return Home
          </Button>
        </div>
      </Fade>
      {mainscreen && <App />}
      {analytics && <ShowData />}
      {management && <ManageSystem />}
      {staff && <ManageStaff />}
    </div>
  );
}
