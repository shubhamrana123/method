import { createContext, useState, Fragment } from 'react'
import ViewRolesList from './ViewRolesList'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const hospitalContext = createContext();
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


function DepartmentCredential(props) {

  return (
    <>
      {props.maxList.map(item => (
        <Card sx={{ minWidth: 275 }} variant="outlined" ma key={item.id}>
          <CardContent>
            {item.name}
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}

      {/* <Card variant="outlined">{card}</Card> */}
    </>
  )
}

export default DepartmentCredential;
