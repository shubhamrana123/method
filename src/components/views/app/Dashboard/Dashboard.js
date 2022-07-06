import { Fragment, useEffect ,useContext,useState} from "react";
import CardTheme from './cards/Card';
import UserInfoScreen from "../../admin/DashboardScreens/UserInfoScreen";
import UserContex from "../../../../context/userContext/UserContext";
import { onApiCall } from "../../../../api/user/userApi";
const Dashboard = ()=>
{
    const usrCtx = useContext(UserContex);
    const [totalMsgCount,setTotalMsgCount] = useState(0);

    const cardsInfo =  [
        {title : "Total Vc", bgColor : "#f03a3a",totalCount : 10, icon: "bx bxs-id-card bx-lg"},
        {title : "Total DID", bgColor : "#408de6",totalCount : 10, icon: "bx bxs-user-rectangle bx-lg"},
        {title : "Messages", bgColor : "#4ce67a",totalCount : totalMsgCount, icon: "bx bx-message bx-lg"},
        {title : "Alerts", bgColor : "#f59d18",totalCount : 0, icon: "bx bxs-bell bx-lg"}
    ]


    useEffect(()=>
    {
        const loadMessages = async () => {
          const res = await onApiCall('get', 'user/loadMessagesForInbox', null, { userId: usrCtx?.userInfo?.userId });
          if (res.data.statusCode == 200) {
              const totalMsgCount = res.data.result.length;
              setTotalMsgCount(totalMsgCount);
          }
        }
        loadMessages();
      },[])
    
    return(
        <Fragment>
            <div className="row">
                {
                    cardsInfo.map((item,index)=>(
                        <div className="">
                            <CardTheme key={index} cardInfo={item}/>
                        </div>
                    ))
                }
               
            </div>
            <div className="container">
                &nbsp;
                <UserInfoScreen/>
            </div>
        </Fragment>
    )
}
export default Dashboard;