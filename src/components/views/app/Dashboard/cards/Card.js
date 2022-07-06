import { Fragment, useState,useEffect,useContext ,forwardRef} from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import { onApiCall } from "../../../../../api/user/userApi";
import UserContex from "../../../../../context/userContext/UserContext";

const CardTheme = (props) => {

const usrCtx = useContext(UserContex);
const [totalMsgCount,setTotalMsgCount] = useState(0);
const navigate = useNavigate();
const [open, setOpen] = useState(false);

//set alert message and alert bg color for snackbar
const [alertMessage, setAlertMessage] = useState("");
const [alertBgColor,setAlertBgColor] = useState("")
const handleClose = (event, reason)=>
{
    if (reason === 'clickaway') {
        return;
    }
  
    setOpen(false);
}

const moveToScreen = (screen)=>
{

    switch(screen.toUpperCase())
    {
      case "MESSAGES" : 
        navigate("../Inbox");
        break;
      case "ALERTS" :
        navigate("../Alerts");
        break;
        case "USERROLES" :
          navigate("../UserRoles");
          break;
      default :
        navigate("./Index");
    }
}
useEffect(()=>
    {
      if(props.cardInfo?.title == "Messages")
      {
        const loadMessages = async () => {
          const res = await onApiCall('get', 'user/loadMessagesForInbox', null, { userId: usrCtx?.userInfo?.userId });
          if (res.data.statusCode == 200) {
              const totalMsgCount = res.data.result.length;
              setTotalMsgCount(totalMsgCount);
          }
        }
        loadMessages();
      }
       
    },[])

  return (
    <Fragment>
      <Card sx={{ minWidth: 275 }} onClick={()=>moveToScreen(props.cardInfo?.title)}>
          <CardContent  style={{backgroundColor: props.cardInfo.bgColor}}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                <div class="row">
                    <div class="col-md-9  align-slef-center">
                        <span>{props.cardInfo?.title}</span>
                        <h2>{totalMsgCount}</h2>
                    </div>
                    <div class="col-md-3 = align-slef-center">
                        <i className={` text-end ${props.cardInfo?.icon}`}></i>
                    </div>
                </div>
                </Grid>
                
            </Grid>
            {/* <div class="row">
              <div class="col-md-6 col-sm-6 col-6 align-slef-center">
                <span>Total VC</span>
                <h2>{props.cardInfo?.totalCount}</h2>
              </div>
              <div class="col-md-6 col-sm-6 col-6 align-slef-center">
                <i className="bx bxs-id-card bx-lg"></i>
              </div>
            </div> */}
          </CardContent>
      </Card>
    </Fragment>
  );
};
export default CardTheme;
