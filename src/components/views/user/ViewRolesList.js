import { Fragment, useEffect, useContext, useState } from "react";
import { onApiCall } from "../../../api/user/userApi";
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import UserContex from "../../../context/userContext/UserContext";

const ViewRolesList = () => {
    //let optionValue;
    let options = [{ id: 1, title: "Hospital" }, { id: 2, title: "Practice" }];
    let hospitalList = [{ id: 1, name: "Max", typeId: 1 }, { id: 2, name: "Apollo", typeId: 1 }];
    let practise = [{ id: 1, name: "practise1" }, { id: 2, name: "practise2" }]
    let departmentList = [{ id: 1, name: "dep1" }, { id: 2, name: "dep2" }]
    let practiseList = [{ id: 1, name: "ortho", typeId: 2 }, { id: 2, name: "demo", typeId: 2 }]
    const usrCtx = useContext(UserContex);
    const [groupOptions, setGroupOptions] = useState([]);
    const [hosOptions, setHosOptions] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [optionValue, setOptionValue] = useState();

    const getUserRolesByGroupId = async (groupId) => {
        // if(groupId > 0 )
        // {
        //     const res = await onApiCall('get', 'user/getUserAssignedRoles', null, { userId: usrCtx?.userInfo?.userId, groupId: groupId, userDid: usrCtx?.userInfo?.userDid });
        //     if (res.data.statusCode == 200) {
        //         setUserRoles(res.data.result);
        //     }
        // }
        // else{
        //     setUserRoles([]);
        // }

    }

    const getCredentailDetails = async (hash) => {
        // const res = await onApiCall('get', 'user/getUserAssignedRoles', null, {hashId: hash});
        // if (res.data.statusCode == 200) {
        //     setUserRoles(res.data.result);
        // }
    }
    const chooseOption = (event) => {
        setOptionValue(event.target.value);
        console.log(optionValue);
        // console.log(hospitalValue);
        // console.log(event.target.value);
        if (event.target.value == 1) {

            setHosOptions(hospitalList);
        } else
            if (event.target.value == 2) {
                setHosOptions(practiseList);
            }




    }
    const selectHospital = (event) => {
        // if(event.target.value==optionValue){
        // console.log(optionValue);
        // }
    }
    useEffect(() => {
        const loadRoles = async () => {
            const res = await onApiCall('get', 'user/getAllGroupByUserId', null, { userId: usrCtx?.userInfo?.userId });
            if (res.data.statusCode == 200) {
                setGroupOptions(res.data.result);
            }
        }
        loadRoles();
    }, [])

    return (
        <Fragment>
            <div class="container">
                <div className="row">
                    <div className="col-md-4">
                        <select className="form-control" onChange={(event) => chooseOption(event)}>
                            <option value="0">Please select</option>
                            {options?.map(item => (
                                <option key={item.id} value={item.id}>{item.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        
                        <select className="form-control" onChange={(event) => selectHospital(event)}>
                            {/* {hospitalValue} */}
                            <option value="0">Please select</option>

                            {hosOptions?.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                            }
                            {/* {optionValue == 1 ? groupOptions?.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            )) : practiseList?.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))} */}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select className="form-control" onChange={(event) => selectHospital(event)}>
                            <option value="0">Please select</option>
                            {departmentList?.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <br />

                <div class="row">
                    &nbsp;
                    {userRoles.length > 0 ?
                        userRoles?.map((item, index) => (
                            <Card sx={{ minWidth: 250 }} style={{ marginLeft: '20px', background: '#8585e0' }} onClick={() => getCredentailDetails(item.hash)}>
                                <CardContent >
                                    <div class="row">
                                        <div class="col-md-12  align-slef-center">
                                            <p className="text-center">Credentails</p>
                                            <p className="text-center">{JSON.stringify(item?.verifiableCredential?.type[Object.keys(item?.verifiableCredential?.type)[1]])}</p>
                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
                        ))

                        :
                        <Card sx={{ minWidth: 1250 }} >
                            <CardContent >
                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                        <div class="row">
                                            <div class="col-md-9  align-slef-center">
                                                <p>No Roles Assigned for you.{optionValue}</p>
                                            </div>
                                            <div class="col-md-3 = align-slef-center">

                                            </div>
                                        </div>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Card>

                    }
                </div>


            </div>
        </Fragment>
    )
}
export default ViewRolesList;