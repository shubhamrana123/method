import { Fragment, useEffect, useState,forwardRef } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { onApiCall } from "../../../api/user/userApi";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'
const MessageDetail = (props) => {

    console.log("--props---", props)
    const onBackHandler = () => {
        props.showInboxHandler();
    }

    const [open, setOpen] = useState(false);

    //set alert message and alert bg color for snackbar
    const [alertMessage, setAlertMessage] = useState("");
    const [alertBgColor, setAlertBgColor] = useState("")

    const handleClose = (event, reason)=>
    {
        if (reason === 'clickaway') {
            return;
        }
      
        setOpen(false);
    }

    const onAcceptOrDenyRequest = async (_response, item) => {
        let _hospitalId = null;
        let _departmentId = null;
        let _practiceId = null;
        let _practiceDepId = null;
        //true for accept false for deny
        if (typeof (item.hospital_id) !== 'undefined') {
            _hospitalId = item?.hospital_id;
            _departmentId = item?.department_id;
        }
        else {
            _practiceId = item?.practice_id;
            _practiceDepId = item?.practice_Department_id;
        }
        const obj = {
            invitationType: 1,
            messageId: item.id,
            response: _response,
            groupId: item.groupId,
            userId: props.userId,
            hospitalId: _hospitalId,
            departmentId: _departmentId,
            practiceId: _practiceId,
            practiceDepId: _practiceDepId,
            typeId : item.type_id

        }
        console.log("------obj--------", obj);
        const res = await onApiCall('patch', 'user/acceptInvitation', obj, null);
        if (res.data.statusCode == 200) {
            setAlertMessage("Thanks for your Response.");
            setAlertBgColor("success");
            setOpen(true);
            props.onRefresh();
        }
        else{
            setAlertMessage("Something went wrong");
            setAlertBgColor("error");
            setOpen(true);
        }

    }

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    useEffect(() => {

    }, [])
    return (
        <Fragment>
            <div class="container">
                <h2>Message</h2>

                <br />
                &nbsp;
                <Card>
                    <CardContent style={{ background: '#eff5f5' }}>
                        <div className="row">
                            <div className="col-md-3">
                                <p>sender : {props.item?.sender}</p>

                            </div>
                            <div className="col-md-6">
                                <p class="text-start">Message: </p>
                                <Card >
                                    <CardContent>
                                        {props.item?.practice == undefined || props.item?.practice == null
                                            ? <p class="text-center">{props.item?.message + " Hospital : " + props.item?.hospital + " In Department : " + props.item?.department + ` as ( ${props.item?.userRole} ) `}</p>
                                            :
                                            <p class="text-center">{props.item?.message + " Practice : " + props.item?.practice + " In Department : " +  props.item?.department + ` as ( ${props.item?.userRole}  )`}</p>
                                        }

                                        {
                                            props.item.message_type_id == 1 && (props.item.isAccepted.data[0] == 0 && props.item.isDenied.data[0] == 0) ?
                                                <>
                                                    <button className="btn btn-primary" onClick={() => onAcceptOrDenyRequest(true, props.item)}>Accept</button>
                                                    &nbsp;
                                                    <button className="btn btn-danger" onClick={() => onAcceptOrDenyRequest(false, props.item)}>Deny</button>
                                                </>

                                                :
                                                props.item.isAccepted.data[0] == 1 ? "Already Accepted" : "Already denied"
                                        }

                                    </CardContent>
                                </Card>
                                <Snackbar
                                    open={open}
                                    autoHideDuration={2000}
                                    message={alertMessage}
                                    onClose={handleClose}
                                >
                                    <Alert onClose={handleClose} severity={alertBgColor} sx={{ width: '100%' }}>
                                        {alertMessage}
                                    </Alert>
                                </Snackbar>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary" onClick={onBackHandler}> Back</button>
                                &nbsp;
                                <button className="btn btn-danger" > Delete</button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Fragment>

    )
}
export default MessageDetail;