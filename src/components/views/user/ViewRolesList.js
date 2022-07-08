import { Fragment, useEffect, useContext, useState } from "react";
import { onApiCall } from "../../../api/user/userApi";
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import UserContex from "../../../context/userContext/UserContext";
import DepartmentCredential from './HospitalDepartmentCredential.js'
const ViewRolesList = (props) => {

    console.log("-----hospital ctx", props);
    //let optionValue;
    let options = [{ id: 1, title: "Hospital" }, { id: 2, title: "Practice" }];



    const [hosOptions, setHosOptions] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [departmentNameOption, setDepartmentNameOption] = useState('');
    const [optionSubValue, setOptionSubValue] = useState();
    const [condition, setCondition] = useState(false);
    const [credentialForDeps, setCredentialForDeps] = useState([]);
    const credentialForDep = [{
        id: 1,
        hospitalId: 5,
        departmentId: 18,
        name: 'credentail 1',
        details: "credentail 1 details"
    },
    {
        id: 2,
        hospitalId: 5,
        departmentId: 18,
        name: 'credentails 2',
        details: "credentail 2 details"
    },
    {
        id: 3,
        hospitalId: 5,
        departmentId: 19,
        name: 'credentails 3',
        details: "credential 1 details"
    },
    {
        id: 4,
        hospitalId: 5,
        departmentId: 19,
        name: 'credentails 4',
        details: "credential 2 details"
    }]
    const [showDepartmentCards, setShowDepartmentCards] = useState(false)
    //type 1 for hosiptal and 0 for practice
    const [selectedType, setSelectedType] = useState(-1);

    const getCredentailDetails = () => {
    }
    const chooseOptionType = async (event) => {

        setCredentialForDeps([])


        if (event.target.value == 1) {
            const res = await onApiCall("get", 'user/getAllHospitalsInfo', null, null);
            if (res.data.statusCode == 200) {
                setHosOptions(res.data.result);
            }
            setSelectedType(1);
            setOptionSubValue([]);
        }
        else {
            const res = await onApiCall("get", 'user/getAllPractice', null, null);
            if (res.data.statusCode == 200) {
                setHosOptions(res.data.result);
            }
            setOptionSubValue([]);
            setSelectedType(0);
        }

    }
    const selectHospital = async (event) => {
        let res = null;

        if (selectedType == 0) {

            res = await onApiCall('get', 'user/getAllDepartmentByPracticeId', null, { practiceId: event.target.value })
            if (res.data.statusCode == 200) {
                setOptionSubValue(res.data.result);
            }
        }
        if (selectedType == 1) {

            res = await onApiCall('get', 'user/getAllDepartmentByHospitalId', null, { hospitalId: event.target.value })
            if (res.data.statusCode == 200) {
                setOptionSubValue(res.data.result);
            }
        }
        if (event.target.value == 0) {
            setShowDepartmentCards(false)
        }
    }
    const selectDepartmentOrPractise = (event) => {

        console.log(event.target.value);
        if (optionSubValue.length > 0) {
            setShowDepartmentCards(true);
        }
        if (event.target.value == 0) {
            setShowDepartmentCards(false);
        }
        setCredentialForDeps([])
        if (event.target.value == 18) {
            setCredentialForDeps([])
            credentialForDep.filter((data) => {
                if (data.departmentId == 18 && data.hospitalId == 5) {
                    // console.log(data);

                    setCredentialForDeps(prevState => (
                        [...prevState, data]))

                }

            })
        }
        else
            if (event.target.value == 19) {
                setCredentialForDeps([])
                credentialForDep.filter((data) => {
                    if (data.departmentId == 19 && data.hospitalId == 5) {
                        console.log(data);

                        setCredentialForDeps(prevState =>
                            [...prevState, data])

                    }

                })
            }
    }


    return (
        <Fragment>
            <div class="container">
                <div className="row">
                    <div className="col-md-4">
                        <select className="form-control" onChange={(event) => chooseOptionType(event)}>
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
                        <select className="form-control" onChange={(event) => selectDepartmentOrPractise(event)}>
                            <option value="0">Please select</option>
                            {/* {departmentList?.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))} */}
                            {optionSubValue?.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                            }
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
                        <>

                            {showDepartmentCards ? <DepartmentCredential maxList={credentialForDeps} /> :
                                <Card sx={{ minWidth: 1250 }} >
                                    <CardContent >
                                        <Grid container spacing={2}>
                                            <Grid item xs={8}>
                                                <div class="row">
                                                    <div class="col-md-9  align-slef-center">
                                                        <p>No Roles Assigned for you.

                                                        </p>
                                                    </div>
                                                    <div class="col-md-3 = align-slef-center">

                                                    </div>
                                                </div>
                                            </Grid>

                                        </Grid>
                                    </CardContent>
                                </Card>

                            }

                        </>
                    }
                </div>


            </div>
        </Fragment>
    )
}
export default ViewRolesList;