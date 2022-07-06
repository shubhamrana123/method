import { Fragment, useEffect, useState } from "react"

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from '@mui/material/Grid';
import { onApiCall } from "../../../../api/user/userApi";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
const GroupDetailView = (props) => {

    const [userList, setuserList] = useState([]);

    const moveBack = () => {
        props.onBack();
    }
    useEffect(() => {
        const loadDetail = async () => {
            const res = await onApiCall('get', 'user/getGroupDetail', null, { groupId: props.groupId });
            if (res.data.statusCode == 200) {
                console.log(res.data.result);
                setuserList(res.data.result);
            }
        }
        loadDetail();
    }, [])
    return (
        <Fragment>
            <button className="btn btn-primary" onClick={moveBack}>Move Back</button>
            &nbsp;
            <Card sx={{ minWidth: 1150 }}>
                <CardContent >
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <div class="row">
                                <div class="col-md-9  align-slef-center">
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        {
                                            userList.map((item) => (
                                                <Fragment>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={item.name}
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        {item.email}<br />
                                                                        {`User Type : ${item.auth}`}<br />
                                                                        {`Speciallization : ${item.spec}`}
                                                                    </Typography>

                                                                </Fragment>
                                                            }

                                                        />
                                                        <ListItemButton role={undefined}  dense>
                                                            <ListItemIcon>
                                                            <i class='bx bx-edit-alt bx-md'></i> 
                                                                &nbsp;&nbsp;
                                                            <i class='bx bx-comment-x bx-md'></i>
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                </Fragment>
                                            ))
                                        }

                                    </List>
                                </div>
                                <div class="col-md-3 = align-slef-center">

                                </div>
                            </div>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </Fragment>
    )
}
export default GroupDetailView