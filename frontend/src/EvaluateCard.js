import * as React from 'react';
import Zoom from '@mui/material/Zoom';
import entryimg from './assets/entryvalidate.png';
import exitimg from './assets/exitvalidate.png';
import invalidimg from './assets/invalid.png';
import { Typography } from '@mui/material';

const containerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
};

const imgStyle = {
    width: '40vw',
    height: 'auto',
};

export function ShowMessage({ resp }) {
    const [entry, showEntry] = React.useState(false);
    const [exit, showExit] = React.useState(false);
    const [invalid, showInvalid] = React.useState(false);

    React.useEffect(() => {
        if (resp === 'invalid') {
            showInvalid(true);
            setTimeout(() => {
                showInvalid(false);
            }, 14000);
        } else if (resp[0] === 'entry') {
            showEntry(true);
            setTimeout(() => {
                showEntry(false);
            }, 14000);
        } else {
            showExit(true);
            setTimeout(() => {
                showExit(false);
            }, 14000);
        }
    }, [resp]);

    return (
        <div style={containerStyle}>
            {invalid && (
                <Zoom in={invalid}>
                    <div>
                        <img src={invalidimg} alt='invalid' style={imgStyle} />
                        <Typography variant="h4" style={{ backgroundColor: '#ffe066', padding:2, borderRadius: 45 }}>
                            Invalid Card!
                            <br />
                            Please scan a valid card.
                        </Typography>
                    </div>
                </Zoom>
            )}
            {entry && (
                <Zoom in={entry}>
                    <div>
                        <img src={entryimg} alt="entry" style={imgStyle} />
                        <Typography variant="h4" style={{ backgroundColor: '#ffe066', padding: 5, borderRadius: 45 }}>
                            Welcome to CardPark!
                            <br />
                            Time of Entry: {resp[1]}
                        </Typography>
                    </div>
                </Zoom>
            )}
            {exit && (
                <Zoom in={exit}>
                    <div>
                        <img src={exitimg} alt="exit" style={imgStyle} />
                        <Typography variant="h4" style={{ backgroundColor: '#ffe066', padding: 5, borderRadius: 45}}>
                            ₹{resp[1][1]}
                            <br />
                            Thank you for visiting!
                            <br />
                            Time of Exit: {resp[1][0]}
                        </Typography>
                    </div>
                </Zoom>
            )}
        </div>
    );
}