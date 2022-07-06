import { Fragment ,useContext, useEffect, useState} from "react";
import UserContex from "../../context/userContext/UserContext";
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
const drawerWidth = 50;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );


const Sidebar = (props) => {
    const navigate = useNavigate();
    const usrCtx = useContext(UserContex);
    const [userName,setUserName] = useState(''); 
    const [isLoggedIn,setIsLoggedIn] = useState(false);


    //check user is admin or not
    const activateSidBar = () => 
    {
        const showNavbar = (toggleId, navId, bodyId, headerId) => {
            const toggle = document.getElementById(toggleId),
                nav = document.getElementById(navId),
                bodypd = document.getElementById(bodyId),
                headerpd = document.getElementById(headerId)
              const contentBody = document.getElementById('contentBody');

            // Validate that all variables exist
            if (toggle && nav && bodypd && headerpd) {
                toggle.addEventListener('click', () => {
                    // show navbar
                    nav.classList.toggle('show')
                    // change icon
                    toggle.classList.toggle('bx-x')
                    // add padding to body
                    bodypd.classList.toggle('body-pd')
                    // add padding to header
                    headerpd.classList.toggle('body-pd')

                    contentBody.classList.toggle('body-pd')
                })  
            }
        }

        showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');
    }
    const loadInitialInfo=()=>{
        if(usrCtx.userInfo == null)
        {
            usrCtx.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            setIsLoggedIn(localStorage.getItem('isloggedIn'));
            setUserName(usrCtx.userInfo?.userName);
        }
        else{
            setIsLoggedIn(true);
            setUserName(usrCtx.userInfo?.userName);
        }
    }

    //function for logout user
    const onLogoutHandler = ()=>
    {
        usrCtx.logoutHandler();
    }

    // function for changign the view using side bar
    const changeView = (view)=>{
        navigate('./' + view)
    }   

    useEffect(()=>{
        loadInitialInfo();
    },[usrCtx.userInfo])

    return (
        <Fragment>
            <div id="body-pd" className="p-0">
                <header className="header" id="header">
                
                    <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle" onClick={activateSidBar}></i> </div>
                    <span   >{usrCtx.userInfo?.userType}</span>
                    <div className="header_img"><img src="" alt="" /> </div>
                    
                    {/* {isLoggedIn &&
                        <Fragment>
                            
                            <button className="btn btn-primary" onClick={onLogoutHandler}>Logout</button>
                        </Fragment>
                    }    */}
                </header>
                <div className="l-navbar" id="nav-bar">
                    <nav className="nav">
                        <div>
                            <a  className="nav_logo btn">
                                <i className='bx bx-layer nav_logo-icon'></i>
                                <span className="nav_logo-name">SMART WALLET</span>
                            </a>
                            <a  className="nav_link active btn">
                                <i className='bx bx-user nav_icon'></i>
                                <span className="text-right">Hello! {usrCtx.userInfo?.userName}</span>
                                <br/>
                                <span className="text-right">{usrCtx.userInfo?.userSpec}</span>
                            </a>


                            <div className="nav_list">
                                <a  className="nav_link active btn"  onClick={()=>changeView("index")}>
                                    <i className='bx bx-grid-alt nav_icon'></i>
                                    <span class="nav_name">Dashboard</span>
                                </a>
                                {/* <a  class="nav_link" onClick={()=>changeView("Credentails")}>
                                    <i class='bx bx-user nav_icon'></i>
                                    <span class="nav_name">Credentails</span>
                                </a> */}
                                {/* {  isAdmin &&   
                                    <Fragment>
                                        <a  class="nav_link" onClick={()=>changeView("AddMember")}>
                                            <i class='bx bx-user nav_icon'></i>
                                            <span class="nav_name">Add Members</span>
                                        </a>
                                        <a  class="nav_link" onClick={()=>changeView("ScheduleMeeting")}>
                                            <i class='bx bx-video nav_icon' ></i>
                                            <span class="nav_name">Schedule Meetings</span>
                                        </a>
                                        <a  class="nav_link" onClick={()=>changeView("AssignCredentials")}>
                                        <i class='bx bx-barcode-reader nav_icon'></i>
                                            <span class="nav_name">Assign Credentails</span>
                                        </a>
                                    </Fragment>
                                    
                                } */}
                                <a  class="nav_link btn" onClick={()=>changeView("Inbox")}>
                                    <i class='bx bxs-inbox nav_icon ' ></i>
                                    <span class="nav_name">Inbox</span>
                                </a>
                                <a  class="nav_link btn" onClick={()=>changeView("UserRoles")}>
                                    <i class='bx bx-credit-card-front nav_icon' ></i>
                                    <span class="nav_name">Assigned Roles</span>
                                </a>
                                <a  class="nav_link btn" onClick={()=>changeView("GroupInfo")}>
                                    <i class='bx bx-group nav_icon'></i>
                                    <span class="nav_name">Group Info</span>
                                </a>
                               
                                {/* <a href="#" class="nav_link">
                                    <i class='bx bx-folder nav_icon'></i>
                                    <span class="nav_name">Files</span>
                                </a> */}
                               
                            </div>
                        </div> <a href="#" class="nav_link" onClick={onLogoutHandler}> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">SignOut</span> </a>
                    </nav>
                </div>

                <div id="contentBody" class="height-100 bg-light ">
                <Main>
                    {props.Outlet}
                </Main>

                </div>
            </div>
        </Fragment>
    )
}
export default Sidebar;