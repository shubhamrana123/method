import { Fragment,useState,forwardRef } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Form from "../../shared/Form";
import { useNavigate,useParams,useLocation } from "react-router-dom";
import {createNewDidApiCall} from '../../api/veramo/didApi';
import {onApiCall} from '../../api/user/userApi'; 
import LoadingSpinner from "../../utils/spinner/LoadingSpinner";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Signup = ()=>
{
    const search = useLocation().search;
    const rqstId = new URLSearchParams(search).get("requestId");
    const type = new URLSearchParams(search).get("type");
    console.log('----------SIGN UP TYPE VALUE----------')
    console.log('type : ',type);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isloading,setIsLoading] = useState(false);

    //set alert message and alert bg color for snackbar
    const [alertMessage, setAlertMessage] = useState("");
    const [alertBgColor,setAlertBgColor] = useState("")

    const moveToLogin = (event)=>
    {
        event.preventDefault();
        navigate("../login");
    }
    const onSignupHandler = async(userInfo)=>
    {
        console.log("SIGNUP",userInfo)
        setIsLoading(true);
        //create a new Did for a user.
        const res = await createNewDidApiCall();
        if(res.data.statusCode == 200)
        {
            const userDetails = {
                firstName : userInfo['First Name'],
                lastName : userInfo['Last Name'],
                email : userInfo['Email'],
                password : userInfo['Password'],
                //ilke admin, or super Admin or doctor
                specId : parseInt(userInfo.Specialization),
                did : res.data.result

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

    const formInputs = [
        {label : "First Name",required : true, maxLength : 20, minLength : 1, type:"text", pattern : '',},
        {label : "Last Name",required : false, maxLength : 20, minLength : 1,  type:"text" , pattern : ''},
        {label : "Email", required : true, maxLength : 100, minLength : 11,  type:"text", pattern : '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'},
        {label : "Password",required : true, maxLength : 100, minLength : 3,  type: "Password",  pattern : ''},
        {label : "Confirm Password",required : true, maxLength : 100, minLength : 3, type:"password" , pattern : ''},
        {label : "Practice Type",required : true, maxLength : 100, minLength : 1, type:"select" , pattern : '',fetchData: 'getUserTypeForSignUp'},
        {label : "Specialization",required : true, maxLength : 100, minLength : 1, type:"select" , pattern : '', fetchData : 'getAllSpecialization'}
    ];

    const BtnInfo = [
        {btnLabel : "Signup", type: "submit", actionHandler : null},
        {btnLabel : "Already a user?",  type: "", actionHandler: moveToLogin}
    ];

    const handleClose = (event, reason)=>
    {
        if (reason === 'clickaway') {
            return;
        }
      
        setOpen(false);
    }

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return(
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
                    <br/>
                        <Card sx={{ maxWidth: 500 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://www.thalesgroup.com/sites/default/files/database/assets/images/2021-11/digital-id-wallet_cityscape.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                               <Form formInputs={formInputs} BtnInfo={BtnInfo} onAction={onSignupHandler} />
                            </CardContent>
                                
                        </Card>
                </div>
            </div>
       </div>
        </Fragment>
    )
}
export default Signup;