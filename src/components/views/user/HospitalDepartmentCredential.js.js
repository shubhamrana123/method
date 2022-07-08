import { createContext, useState, Fragment } from 'react'
import ViewRolesList from './ViewRolesList'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DepartmentCredentialDetails from './DepartmentCredentialDetails';

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
  const [condition, setCondition] = useState(false);
console.log(props);
const goToDepartmentCredentialDetailCard = (event)=>{
console.log(event);
setCondition(true)
}
  return (
    <>
      {    props.maxList.map(item => (
        <Card sx={{ minWidth: 275 }} variant="outlined" ma key={item.id}>
          <CardContent>
            {item.name}
          </CardContent>
          <CardActions>
            <Button size="small" onClick={(event)=>goToDepartmentCredentialDetailCard(event)}>Learn More</Button>
          </CardActions>
        </Card>
      ))
     
      }
      {condition ?<DepartmentCredentialDetails />:null}

      {/* <Card variant="outlined">{card}</Card> */}
    </>
  )
      // props.maxList.filter(item=>{
      //   if(item.hospitalId==5 && item.departmentId==18){
      //     <Card sx={{ minWidth: 275 }} variant="outlined" ma key={item.id}>
      //     <CardContent>
      //       {item.name}
      //     </CardContent>
      //     <CardActions>
      //       <Button size="small">Learn More</Button>
      //     </CardActions>
      //   </Card>
      //   };
      // })
}

export default DepartmentCredential;
