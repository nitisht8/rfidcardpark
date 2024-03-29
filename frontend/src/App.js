import cardvector from './assets/cardimg.png';
import * as React from 'react';
import Slide from '@mui/material/Slide';
import {LogIn} from './AdminLogin.js';
import axios from 'axios';
import { ShowMessage } from './EvaluateCard.js'

const adminCard = '0012411156'

const cardimg = (
  <img src={cardvector} alt='cardpic' style={{position:'absolute', left:'1002px',top:'320px',width:918,height:574, borderTopLeftRadius:'120px', borderBottomLeftRadius:'120px'}}/>
);

export default function App() {
  const [inFrame, setinFrame] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');
  const [loginpage, setloginpage] = React.useState(false);
  const [resp, setResponse] = React.useState(null);
  const [evaluate, setEvaluate] = React.useState(false);

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
        style={{opacity:0}} 
        maxLength={10} 
      />
      <Slide direction="left" in={inFrame} mountOnEnter unmountOnExit>
        {cardimg}
      </Slide>
      {evaluate && <ShowMessage resp={resp} />}
      {loginpage && <LogIn />}
    </div>
  );
}