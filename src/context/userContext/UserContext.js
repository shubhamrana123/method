
import React from "react";
const UserContex = React.createContext({
    isUserLoggedIn : Boolean,
    userInfo : {},
    setUserLogin : ()=>{},
    loginHandler: ()=>{},
    logoutHandler : () =>{},
    onRefresh : ()=>{}
})
export default UserContex;