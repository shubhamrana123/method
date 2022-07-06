import { Fragment, useEffect, useState,useContext } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Form from "../../../shared/Form";
import { onApiCall } from "../../../api/user/userApi";
import UserContext from '../../../context/userContext/UserContext';
const AddMember = ()=>
{
    const usrCtx = useContext(UserContext);
    console.log("USER",usrCtx);
    const [refresh,setRefresh] = useState(false);

    const onClearForm = (event)=>
    {
        event.preventDefault();
        setRefresh(!refresh)
    }

    const formInputs = [
        {label : "Practice",required : true, maxLength : 20, minLength : 1,  type:"select", pattern : '',fetchData : "getAllGroupByUserIdForAddMember",queryParam : {userId : usrCtx?.userInfo?.userId }},
        {label : "Level",required : true, maxLength : 20, minLength : 1,  type:"select", pattern : '',fetchData : "getAllUserType",queryParam : {typeId : usrCtx?.userInfo?.userTypeId }},
        {label : "Email",required : true, maxLength : 100, minLength : 1,  type:"text", pattern : '',}
    ];
        const BtnInfo = [
        {btnLabel : "Add", type : "submit" , actionHandler:null },
        // {btnLabel : "clear", type: "clear" , actionHandler : onClearForm},
    ];

    const onSendEmail = async(data)=>
    {
        const obj = {
            practiceId : parseInt(data['Practice']),
            email : data['Email'],
            typeId : parseInt(data['Level']),
            senderId : usrCtx?.userInfo?.userId
        }
        const res = await onApiCall('post','admin/AddAdminForPractice',obj,null)
    }

    useEffect(()=>{

    },[])

    return(
        <Fragment>
             <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <Card>
                            <CardContent>
                                <Form  formInputs = {formInputs} BtnInfo={BtnInfo} onAction={onSendEmail}/>   
                            </CardContent>
                        </Card>
                        

                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </Fragment>
    )
}
export default AddMember;