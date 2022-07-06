import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useState,useContext ,forwardRef} from 'react';
import Form from '../../shared/Form';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from "../../utils/spinner/LoadingSpinner";
import {loginApiCall} from '../../api/user/userApi';
import userContext from '../../context/userContext/UserContext'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Login = ()=>
{
    const [open, setOpen] = useState(false);

    //set alert message and alert bg color for snackbar
    const [alertMessage, setAlertMessage] = useState("");
    const [alertBgColor,setAlertBgColor] = useState("")
    
    const usrCtx = useContext(userContext);
    const [isloading,setIsloading] = useState(false);
   
    const navigate = useNavigate();
    const onSignupHandler  = async(event)=>
    {
        event.preventDefault();
        navigate('../signup');
        
    }

    const onLoginHandler = async(userInputs)=>
    {
        try
        {
            setIsloading(true);
            const userDetails = {
                email : userInputs['Email'],
                password : userInputs['Password']
            }
            const res = await loginApiCall(userDetails);
            if(res.data.statusCode === 200)
            {
                if(res.data.result.id > 0)
                {
                    usrCtx.loginHandler(res.data.result);
                    navigate('../app/index');
                }
                else
                {
                    const keys = Object.keys(res.data.result)
                    setAlertMessage(res.data.result[keys[0]]);
                    setAlertBgColor("error");
                    setOpen(true);
                    //alert(res.data.result[keys[0]]);
                }
            }
            else
            {
                alert('something went wrong');
            }
            setIsloading(false);
        }
       catch(ex)
       {
            console.log(ex)
            setIsloading(false);
       }

    }


    const formInputs = [
        {label : "Email",required : true, maxLength : 100, minLength : 1,  type:"text" ,pattern : ''},
        {label : "Password",required : true, maxLength : 20, minLength : 1,  type:"password", pattern : ''}
        
    ];
    const BtnInfo = [
        {btnLabel : "Login", type : "submit" , actionHandler: null},
        {btnLabel : "Signup", type: "" , actionHandler : onSignupHandler},
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
       <div className='container'>
           <div className='row'> 
                {isloading && <LoadingSpinner/>}
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
                                <Form formInputs = {formInputs} BtnInfo={BtnInfo} onAction={onLoginHandler}/>
                            </CardContent>
                                
                        </Card>
                </div>
            </div>
       </div>
        
    )
}

export default Login;