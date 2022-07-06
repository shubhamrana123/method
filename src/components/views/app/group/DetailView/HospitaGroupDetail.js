import { Fragment, useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useParams } from "react-router-dom";
import { onApiCall } from "../../../../../api/user/userApi";
const HospitalGroupDetailView = (props)=>
{
    const { id } = useParams();
    const [groupDetails,setGroupDetails] = useState([]);
    useEffect(()=>
    {
        const onload = async()=>
        {
            const res = await onApiCall('get','user/getAllUserInfoInHospitalGroup',null,{groupId : id });
            if(res.data.statusCode == 200)
            {
                console.log(res.data.result);
            }
        }
        onload();
    },[])

    return(
        <Fragment>
            <div className="container">
                <div className="row">
                    <br/>
                <Card sx={{ minWidth: 1250 }}>
                    <CardContent >

                    </CardContent>
                </Card>
                </div>

            </div>
        </Fragment>
    )
}

export default HospitalGroupDetailView;