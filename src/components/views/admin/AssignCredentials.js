import { Fragment, useEffect, useState, useContext } from "react";
import UserContex from "../../../context/userContext/UserContext";
import { onApiCall } from "../../../api/user/userApi";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import UserDetailView from "./credentails/UserDetailView";
import CredentailForm from "./credentails/CredentailForm";

const AssignCredentails = () => {

    const usrCtx = useContext(UserContex);
    const [groupOptions, setGroupOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [selectedUser,setSelectedUser] = useState(null); 
    const [credentailFormView,setCredentialFormView] = useState(false);
    const [selectedGroupId,setSelectedGroupId] = useState(0); 

    const onChangeGroup = async (event) => {
        console.log('---item----');
        console.log(event.target.value);
        const groupId = event.target.value;
       
        const res = await onApiCall('get', 'user/getUserListByGroupId', null, { groupId: groupId });
        if (res.data.statusCode == 200) {
            setUserOptions(res.data.result);
        }
        setSelectedGroupId(groupId);
    }

    const onUserSelect = async(event)=>
    {
        console.log("----userId ",event.target.value);
        const userId = event.target.value;
        const res = await onApiCall('get','user/getUserInfoById',null,{userId : userId});
        if(res.data.statusCode == 200)
        {
            setSelectedUser(res.data.result[0])
        }
    }

    const openForm = ()=>
    {
        setCredentialFormView(!credentailFormView);
    }

    useEffect(() => {
        const loadGroupsByUserId = async () => {
            const res = await onApiCall('get', 'user/getAllGroupByUserId', null, { userId: usrCtx?.userInfo?.userId });
            if (res.data.statusCode == 200) {
                setGroupOptions(res.data.result);
            }
        }
        loadGroupsByUserId();
    }, [])
    return (
        <Fragment>
            <div className="container">
                <h3>Assign Role to </h3>
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <select defaultValue="select" className="form-control" onChange={(item) => onChangeGroup(item)} >
                            <option value="0">Please choose an Group</option>
                            {groupOptions.map(item => (
                                <option key={item.groupId} value={item.groupId}>{item.name}</option>
                            ))}

                        </select>
                    </div>
                    <div className="col-md-6">
                        <select defaultValue="select" className="form-control" onChange={(item)=>onUserSelect(item)}>
                            <option value="0">Please choose an User</option>
                            {userOptions?.map(item => (
                                <option key={item.id} value={item.id}>{item.email}</option>
                            ))}

                        </select>
                    </div>


                </div>
                <br />
                <div className="row">
                    {selectedUser != null &&  <UserDetailView selectedUser = {selectedUser}/>}
                    &nbsp;  
                    <br/>
                    &nbsp;       
                    &nbsp; &nbsp;<button className="btn btn-primary" onClick={openForm}>Assign Role</button>
                    {credentailFormView && <CredentailForm selectedUser = {selectedUser} issuer={usrCtx?.userInfo} groupId={selectedGroupId}/>}
                </div>

            </div>
        </Fragment>

    )
}
export default AssignCredentails;