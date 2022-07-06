import {useState,Fragment, useEffect,forwardRef,useRef} from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Form from "../../shared/Form";
import { useNavigate,useParams ,useLocation } from "react-router-dom";
import {createNewDidApiCall} from '../../api/veramo/didApi';
import {onApiCall} from '../../api/user/userApi'; 
import LoadingSpinner from "../../utils/spinner/LoadingSpinner";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const RequestSignup = () => {

    const navigate = useNavigate();
    const { requestId,rqstFrom } = useParams();
    const fNameRef = useRef('');
    const lNameRef = useRef('');
    const passRef = useRef('');
    const conPassRef = useRef('');
    const emailRef = useRef('');
    const [open, setOpen] = useState(false);
    const [isloading,setIsLoading] = useState(false);

    //set alert message and alert bg color for snackbar
    const [alertMessage, setAlertMessage] = useState("");
    const [alertBgColor,setAlertBgColor] = useState("");
    const [formDetails,setFormDetails] = useState(null);
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason)=>
    {
        if (reason === 'clickaway') {
            return;
        }
      
        setOpen(false);
    }

    const moveToLogin = ()=>
    {
        navigate('../login');
    }


    const onSignupHandler = async(event)=>
    {
        event.preventDefault();
        if(conPassRef.current.value != passRef.current.value)
        {
            setAlertMessage("Password and confirm Password did'nt match");
            setAlertBgColor("error");
            setOpen(true);
        }
        else
        {
            const res = await createNewDidApiCall();
            if(res.data.statusCode == 200)
            {
                const userDetails = {
                    firstName : fNameRef.current.value,
                    lastName : lNameRef.current.value,
                    email : formDetails.email,
                    password : passRef.current.value,
                    //ilke admin, or super Admin or doctor
                    specId : formDetails?.spec_id,
                    did : res.data.result,
                    department_id : formDetails?.department_id,
                    hospitalId : formDetails?.hospital_id
                }
                //add user details into the database.
                const response  = await onApiCall('post','user/addUser',userDetails,null);
                if(response.data.statusCode === 200 )
                {
                    console.log(response.data.result)
                    if(response.data.result)
                    {
                        setAlertMessage("user added successfully");
                        setAlertBgColor("success");
                        setOpen(true);
                        navigate('../login')
                    }
                    else
                    {
                        const keys = Object.keys(res.data.result)
                        setAlertMessage(res.data.result[keys[0]]);
                        setAlertBgColor("warning");
                        setOpen(true);
                    }
                }
                else{
                    
                    setAlertMessage("something went wrong");
                    setAlertBgColor("error");
                    setOpen(true);
                }
                setIsLoading(false);
            }
            else{
                console.log("something went wrong ",res);
                setIsLoading(false);
            }
        }
      
    }
    console.log("on Rerender---")

    useEffect(()=>
    {
        const onLoad = async()=>
        {
            const res = await onApiCall('get','admin/getSignupDetailByRqstId',null,{requestId :requestId , rqstFrom : rqstFrom});
            if(res.data.statusCode == 200)
            {
                setFormDetails(res.data.result[0]);
            }
            else
            {
                const keys = Object.keys(res.data.result)
                setAlertMessage(res.data.result[keys[0]]);
                setAlertBgColor("warning");
                setOpen(true);
            }
        }
        onLoad();
    },[])

    return (
        <Fragment>
            <div className='container'>
                <div className='row'>
                    {isloading && <LoadingSpinner />}
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
                    <div className='col-md-6 offset-md-3 text-center'>
                        <br />
                        <Card sx={{ maxWidth: 500 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://www.thalesgroup.com/sites/default/files/database/assets/images/2021-11/digital-id-wallet_cityscape.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <form onSubmit={onSignupHandler}>
                                    {rqstFrom == 1 ? <lable><b>Practice Name</b></lable> : <lable><b>Hospital Name</b></lable>}
                                    <input className='form-control' disabled={true} value={formDetails?.name}/>
                                    <lable><b>Department Name</b></lable>
                                    <input className='form-control' disabled={true} value={ formDetails?.dep_name}/>
                                    <lable><b>First Name</b></lable>
                                    <input className='form-control' ref={fNameRef}/>
                                    <lable><b>Last Name</b></lable>
                                    <input className='form-control' ref={lNameRef}/>
                                    <lable><b>Email</b></lable>
                                    <input className='form-control' disabled={true} value={formDetails?.email}/>
                                    <lable><b>Password</b></lable>
                                    <input className='form-control' ref={passRef}/>
                                    <lable><b>confirm Password</b></lable>
                                    <input className='form-control' ref={conPassRef}/>
                                    <lable><b>Practice Type</b></lable>
                                    <input className='form-control' disabled={true} value={formDetails?.type}/>
                                    <lable><b>Specilization</b></lable>
                                    <input className='form-control' disabled={true} value={formDetails?.spec_name}/>
                                    <br/>
                                    <button type="submit" className='btn btn-primary'> Submit</button>
                                        &nbsp;
                                    <button className='btn btn-primary' onClick={moveToLogin}> Already User? Login in</button>
                                </form>
                               
                            \
                                
                            </CardContent>

                        </Card>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default RequestSignup;