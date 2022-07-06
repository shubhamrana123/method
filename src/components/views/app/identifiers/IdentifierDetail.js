import { Fragment, useEffect, useState ,useContext} from "react";
import { useParams } from 'react-router-dom';
import { Card, Layout } from 'antd';
import LoadingSpinner from "../../../../utils/spinner/LoadingSpinner";
import {onVeramoApiCall} from '../../../../api/veramo/didApi';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from 'react-router-dom'
import UserContex from '../../../../context/userContext/UserContext';
const IdentifierDetail = ()=>
{   const navigate = useNavigate();
    const { id } = useParams();
    const usrCtx = useContext(UserContex);
    console.log(id)
    const [isloading,setIsLoading] = useState(false);
    const [identifer,setIdentifier] = useState(null);

    const onBackHandler = ()=>
    {
        navigate(-1);
    }
    useEffect(()=>{
        const getIdenetifierInfo = async () => {
            setIsLoading(true);
            const res = await onVeramoApiCall('post','app/resolveDid',{did: id,type: usrCtx?.userInfo?.userType});
            console.log(res);
            if(res.data.statusCode == 200)
            {
                setIdentifier(res.data.result);
                setIsLoading(false)
            }
            else
            {
                setIsLoading(false)
            }
        };
        
        getIdenetifierInfo();
    },[])
    return(
        <Fragment>
            <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                {isloading && <LoadingSpinner/>}
                <IconButton aria-label="delete"  onClick={onBackHandler}>
                    <ArrowBackIcon />
                </IconButton>
                <h2>Identifier</h2>
                <p>{identifer?.didDocument?.id}</p>                
                    <Card  title={'DID Document'} align="left">
                        {identifer == null ?  <h2>LOADING...</h2>: 
                        <pre>{JSON.stringify(identifer, null, 2)}</pre>
                        }
                        
                    </Card>
                </div>
                <div className='col-md-2'></div>
            </div>
        </Fragment>
    )
}

export default IdentifierDetail;