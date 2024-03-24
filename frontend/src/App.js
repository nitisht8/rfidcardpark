import cardvector from './assets/cardelement.png';
import * as React from 'react';
import Slide from '@mui/material/Slide';
import {LogIn} from './AdminLogin.js';
import axios from 'axios';
import { ShowMessage } from './EvaluateCard.js'
import {AdminControl} from './AdminAccess.js'

const adminCard = '0012411156'

const cardimg = (
  <img src={cardvector} alt='cardpic' style={{position:'absolute', left:'1200px',top:'225px',width:720,height:720}}/>
);

export default function App() {
  const [inFrame, setinFrame] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');
  const [loginpage, setloginpage] = React.useState(false);
  const [resp, setResponse] = React.useState(null);
  const [evaluate, setEvaluate] = React.useState(false);
  const [auth, setAuth] = React.useState(false);

  React.useEffect(() => {
    if (auth) {
      setloginpage(false);
    }
  }, [auth]);

  const processScan = (event) => {
    const { value } = event.target;
    setInputValue(value);
    if (value.length === 10) {
      if(value === adminCard){
        setloginpage(true)
        setinFrame(false)
      }
      else{
        axios.post('http://localhost:5000/api/cardprocess', { data: value })
          .then(response => {
            setResponse(response.data);
            setEvaluate(true);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      setinFrame(false);
      setTimeout(() => {
        setInputValue('');
        setinFrame(true)
        setEvaluate(false)
      }, 15000);
       }
    }
  }

  return (
    <div>
      <input
        autoFocus 
        type="text" 
        value={inputValue} 
        onChange={processScan} 
        style={{position: 'absolute',left: '-500px'}} 
        maxLength={10} 
      />
      <Slide direction="left" in={inFrame} mountOnEnter unmountOnExit>
        {cardimg}
      </Slide>
      {evaluate && <ShowMessage resp={resp} />}
      {loginpage && <LogIn setAuth={setAuth}/>}
      {auth && <AdminControl/>}
    </div>
  );
}