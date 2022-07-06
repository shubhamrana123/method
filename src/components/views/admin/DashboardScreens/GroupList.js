import { Fragment, useEffect, useContext, useState } from "react";
import { onApiCall } from "../../../../api/user/userApi";
import UserContex from "../../../../context/userContext/UserContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from '@mui/material/Grid';

import GroupDetailView from "./GroupDetailView";

const GroupList = () => {
    const usrCtx = useContext(UserContex);
    const [groupList, setGroupList] = useState([]);
    const [groupDetailView,setGroupDetailView] = useState(false);
    const [selectedGroupId,setSelectedgroupId] = useState(0);
    
    const onViewDetails = async(groupId)=>
    {
       setGroupDetailView(true);
       setSelectedgroupId(groupId);
    }

    const onBack = ()=>
    {
        setGroupDetailView(false);
    }
    useEffect(() => {
        const loadGroups = async () => {
            const res = await onApiCall('get', 'user/getGroupInfoByUserId', null, { userId: usrCtx?.userInfo?.userId });
            if (res.data.statusCode == 200) {
                setGroupList(res.data.result);
                console.log("----------- ", res.data.result);
            }
        }
        loadGroups();
    }, [])
    return (
        <Fragment>
            <div className="row">
                {   !groupDetailView && groupList.map((item) => (
                        <div className="col-md-4">
                            <Card sx={{ minWidth: 275 }} key={item.userGroupId}>
                                <CardContent >
                                    <Grid container spacing={2}>
                                        <Grid item xs={8}>
                                            <div class="row">
                                                <div class="col-md-9  align-slef-center">
                                                    <span></span>
                                                    <h2>{item.groupName}</h2>
                                                    <p>Position : {item.typeName}</p>
                                                    <button className="btn btn-success" onClick={()=>onViewDetails(item.groupId)}>View Details</button>
                                                </div>
                                                <div class="col-md-3 = align-slef-center">
                                                  
                                                </div>
                                            </div>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                            </Card></div>
                    ))
                }
            {groupDetailView && <GroupDetailView groupId={selectedGroupId} onBack={onBack}/>}
            </div>

        </Fragment>
    )
}
export default GroupList;