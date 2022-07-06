import { Fragment, useState,useContext } from "react";
import UserContex from "../../../../context/userContext/UserContext";
import HospitalGroupView from "./HospitalGroupView";
import PracticeGroupView from "./PracticeGroupView";

const GroupIndex = ()=>
{
    const usrCtx = useContext(UserContex);
    const [showPractice,setShowPractice] = useState(true);
    const [showHospital,setShowHospital] = useState(false);

    const showPracticeDetails = ()=>
    {
        setShowPractice(true);
        setShowHospital(false);
    }
    const showHospitalList = ()=>
    {
        setShowPractice(false);
        setShowHospital(true);
    }

    return(
        <Fragment>
                <h3><b>GROUP DEATILS</b></h3>
             <hr class="my-4" />
                <span className="btn btn-primary" onClick={showPracticeDetails}>Practice Group</span>&nbsp;&nbsp;&nbsp;
                <span className="btn btn-primary" onClick={showHospitalList}>Hospital Group</span>
                <hr class="my-4" />
                <br/>
                {showPractice && <PracticeGroupView userId = {usrCtx?.userInfo == null ? 0 : usrCtx?.userInfo?.userId }/>}
                {showHospital && <HospitalGroupView userId = {usrCtx?.userInfo == null ? 0 : usrCtx?.userInfo?.userId }/>}
        </Fragment>
    )
}

export default GroupIndex;