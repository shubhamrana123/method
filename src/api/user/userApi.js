
const axios = require('axios');
const {path} = require('../config');

const  onloginApiCall = async(userData)=>{
    const res = await  axios({
        method: 'post',
        url: `${path}/user/login`,
        data: {
          email: userData.email,
          password: userData.password
        }
    });

    return res;
    
}

const onSignupApiCall = async(userData)=>
{
    const res = await  axios({
        method: 'post',
        url: `${path}/user/addUser`,
        data: {
            firstName : userData.firstName,
            lastName : userData.lastName,
            email: userData.email,
            password: userData.password,
            did : userData.did
        }
    });

   return res;
}
const onApiCall = async(_method,_url,_body,_queryParam=null)=>
{
    const res = await  axios({
        method: _method,
        url: `${path}/${_url}`,
        data: _body,
        params : _queryParam,
        timeout: 1000 * 5
    });

    return res;

}
module.exports = {
    loginApiCall : onloginApiCall,
    signupApiCall : onSignupApiCall,
    onApiCall : onApiCall
}