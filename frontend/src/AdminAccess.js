import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import analyticimg from './assets/analytics.png';
import Fade from '@mui/material/Fade';
import { ShowData } from './Analyze.js';
import { Management } from './Manage.js';
import App from './App.js'

const ButtonStyle = {
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '325px',
  width: '325px',
  borderRadius: '20px',
};

export function AdminControl() {
  const [analytics, setAnalytics] = React.useState(false);
  const [management, setManagement] = React.useState(false);
  const [visibility, setVisibility] = React.useState(true);
  const [mainscreen, setMainscreen] = React.useState(false);

  const handleClick = (buttontype) => {
    setVisibility(false);

    if (buttontype === 'analyze') {
      setAnalytics(true);
    } else if (buttontype === 'manage') {
      setManagement(true);
    }
    else if (buttontype==='return'){
        setMainscreen(true);
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
              style={{ ...ButtonStyle, backgroundImage: `url(${analyticimg})` }}
              variant='contained'
              onClick={() => handleClick('analyze')}
            ></Button>
            <Button
              style={ButtonStyle}
              variant='contained'
              onClick={() => handleClick('manage')}
            ></Button>
            <Button style={ButtonStyle} variant='contained'></Button>
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
      {management && <Management />}
    </div>
  );
}
