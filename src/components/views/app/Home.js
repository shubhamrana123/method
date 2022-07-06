import { Fragment } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Dashboard from "./Dashboard/Dashboard";
const Home = () => {
    return (
        <Fragment>
            <CssBaseline />
            <Container style={{paddingTop: '100px'}}>
            {
                  <Dashboard/>
            }
            </Container>
        </Fragment>
    )
}
export default Home;