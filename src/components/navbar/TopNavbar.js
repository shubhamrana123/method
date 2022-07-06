
import { AppBar,Toolbar,IconButton,Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
const TopNavbar = ()=>
{
    return(
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon/>
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    Photos
                </Typography>
               
            </Toolbar>
        </AppBar>
    )
}
export default TopNavbar;