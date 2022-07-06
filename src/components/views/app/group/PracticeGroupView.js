import { Fragment, useEffect, useState } from "react";
import { onApiCall } from "../../../../api/user/userApi";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from '@mui/material/Grid';

const PracticeGroupView = (props) => {

    const navigate = useNavigate();
    const [groupList, setGroupList] = useState([]);
    const [groupDetailView, setGroupDetailView] = useState(false);
    const [selectedGroupId, setSelectedgroupId] = useState(0);
    const onViewDetails = (groupId) => {
        console.log("groupId---",groupId)
        navigate(`../practicGroupeDetail/${groupId}`);
    }
    useEffect(() => {
        const onLoad = async () => {
            const res = await onApiCall('get', 'user/getPracticeGroupInfo', null, { userId: props?.userId });
            if (res.data.statusCode == 200) {
                setGroupList(res.data.result);
            }
        }
        onLoad();
    }, [])
    return (
        <Fragment>
            <div className="container">
                <h4><b>PRACTICE GROUP</b></h4>
                <br/>
                <div className="row">
                    {!groupDetailView && groupList?.map((item) => (
                        <div className="col-md-4">
                            <Card sx={{ minWidth: 275 }} key={item.userGroupId}>
                                <CardContent >
                                    <Grid container spacing={2}>
                                        <Grid item xs={8}>
                                            <div class="row">
                                                <div class="col-md-9  align-slef-center">
                                                    <p className="text-primary text-start">{item.practice}</p>
                                                    <p className="text-primary">{item.department}</p>
                                                    <p className="text-danger">Position : {item.userType}</p>
                                                    <button className="btn btn-success" onClick={() => onViewDetails(item.id)}>View Details</button>
                                                </div>
                                                <div class="col-md-3 = align-slef-center">

                                                </div>
                                            </div>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                            </Card>
                        </div>
                    ))
                    }
                    {/* {groupDetailView && <GroupDetailView groupId={selectedGroupId} onBack={onBack}/>} */}
                </div>
            </div>
                {groupList.length == 0 && <h5 className="text-primary" >Not a memeber of any group in Practices</h5>}

        </Fragment>
    )
}
export default PracticeGroupView;