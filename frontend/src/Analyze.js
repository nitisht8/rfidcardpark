import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Fade } from '@mui/material';
import { AdminControl } from './AdminAccess.js';

export function ShowData(){
    const [data, setData] = useState([]);
    const [received, setreceived] = useState(false);
    const [back, setBack] = useState(false);
    const [visibility, setVisibility] = useState(true);

    const goBack=()=>{
        setVisibility(false);
        setBack(true);
    }

    useEffect(() => {
        if (!received) {
            fetchData();
        }
    }, [received]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/datapipeline');
            console.log(response.data);
            const reversedData = response.data.reverse(); // Reverse the order of the data
            setData(reversedData);
            setreceived(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
      
    return (
        <div>
            <Fade in={visibility}>
                <div>
        <Typography variant='h4' style={{backgroundColor:'#ffe066',maxWidth:'320px',borderRadius:'10px',padding:6,position:'absolute',top:'40.6%',left:'17%',
                                        boxShadow: '5px 5px 5px rgba(0.2, 0.2, 0.2, 0.2)',display: 'inline-block'}}>Recent Transactions</Typography>
        <TableContainer component={Paper} elevation={7} style={{maxWidth: '1280px',maxHeight:'365px', margin: '0 auto', position : 'absolute',
                                                                left: '50%', top: '65%', borderRadius:'10px',
                                                                transform: 'translate(-50%, -50%)'}}>
            <Table size='small'>
                <TableHead>
                    <TableRow style={{backgroundColor:'#ffe066'}}>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell>Card</TableCell>
                        <TableCell>Event</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Fee</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row['Transaction ID']}</TableCell>
                            <TableCell>{row.Card}</TableCell>
                            <TableCell>{row.Event}</TableCell>
                            <TableCell>{row.Time}</TableCell>
                            <TableCell>{row.Fee}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
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
          {back && <AdminControl/>}
        </div>
    );
};
