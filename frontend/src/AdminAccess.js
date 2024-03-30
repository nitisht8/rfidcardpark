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
  height: '325px',
  width: '325px',
  borderRadius: '20px',
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
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Stack direction='row' spacing={10}>
            <Button
              style={{ ...ButtonStyle, backgroundImage: `url(${analyticimg})`, backgroundPositionY:'65px' }}
              variant='contained'
              onClick={() => handleClick('analyze')}
            >
              <p style={{fontFamily:'mavenpro', position:'relative', top:'-120px', fontSize:'50px', color:'black'}}>
                Analytics
              </p>
            </Button>
            <Button
              style={{...ButtonStyle, backgroundImage: `url(${settingsimg})`, backgroundPositionY:'68px'}}
              variant='contained'
              onClick={() => handleClick('manage')}
            >
              <p style={{fontFamily:'mavenpro', position:'relative', top:'-120px', fontSize:'50px', color:'black'}}>
                System
              </p>
            </Button>
            <Button style={{...ButtonStyle, backgroundImage: `url(${usersimg})`,backgroundPositionY:'70px'}}
                    variant='contained'
                    onClick={()=>handleClick('users')}>
                      <p style={{fontFamily:'mavenpro', position:'relative', top:'-120px', fontSize:'50px', color:'black'}}>
                Staff
              </p>
                    </Button>
          </Stack>
          <Button
            style={{
              marginTop: 20,
              width: 200,
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
