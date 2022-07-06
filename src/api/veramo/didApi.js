

const axios = require('axios');
const {path} = require('../config');

const  onCreateNewDid = async()=>{
    const res = await  axios({
        method: 'post',
        url: `${path}/app/createIdentifier`,
    });
   
    return res;
    
}

const onVeramoApiCall = async(_method,_url,_body,_queryParam=null)=>
{
    const res = await  axios({
        method: _method,
        url: `${path}/${_url}`,
        data: _body,
        params : _queryParam
    });

    return res;

}


module.exports = {
    createNewDidApiCall : onCreateNewDid,
    onVeramoApiCall : onVeramoApiCall
}