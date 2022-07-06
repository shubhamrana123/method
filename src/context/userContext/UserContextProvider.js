import { useEffect, useState } from "react";
import UserContex from "./UserContext";
import { useNavigate } from "react-router-dom";
const UserContextProvider = (props)=>
{
    let navigate = useNavigate();
    const [userInfo,setUserInfo] = useState(null);
    const [isUserLoggedIn,setIsUserLoggedIn] = useState(false);

    const onLoginHandler= (userInfo)=>
    {
        setIsUserLoggedIn(true);
        console.log("Usr Ctx",userInfo);
        const _userInfo = {
            userId : userInfo.id,
            userEmai : userInfo.email,
            userName : userInfo.fname + " " + userInfo.lname,
            userSpec : userInfo.spec_name,
            userDid : userInfo.did

        }
        setUserInfo(_userInfo);
        localStorage.setItem("isLoggedIn",true);
        localStorage.setItem("userInfo",JSON.stringify(_userInfo));

    }
    const onLogOutHandler= ()=>
    {
        setIsUserLoggedIn(false);
        setUserInfo(null);
        navigate("../Login", { replace: true });
        localStorage.setItem("isLoggedIn",false);
        localStorage.removeItem("userInfo");
    }

    const setUserLoginHandler = ()=>
    {
        setIsUserLoggedIn(true);
    }

    const onRefresh = ()=>
    {
        if(userInfo == null)
        {
            const user = JSON.parse(localStorage.getItem('userInfo'));
            console.log("On Refresh",user);
            setUserInfo(user);
        }
    }
    let defaultObj = {
        isUserLoggedIn:isUserLoggedIn,
        userInfo : userInfo,
        loginHandler: onLoginHandler,
        logoutHandler : onLogOutHandler,
        setUserLogin : setUserLoginHandler,
        onRefresh : onRefresh
    }

   // onRefresh();
    useEffect(()=>{
        onRefresh();
    },[userInfo])
   return(
       <UserContex.Provider value={defaultObj}>
           {props.children}
       </UserContex.Provider>
   ) 
}
export default UserContextProvider;