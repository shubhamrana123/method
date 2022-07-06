
import { Fragment, useState, useEffect,useContext } from "react";
import Container from '@mui/material/Container';
import LoadingSpinner from "../../../../utils/spinner/LoadingSpinner";
import { useNavigate, Link } from 'react-router-dom';
import TableView from '../../../../shared/TableView';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {createNewDidApiCall} from '../../../../api/veramo/didApi';
import { AspectRatio } from "@mui/icons-material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import UserContex from "../../../../context/userContext/UserContext";
// import { FundViewOutlined, TrademarkOutlined } from '@ant-design/icons';
const { onVeramoApiCall } = require('../../../../api/veramo/didApi');
const DidList = () => {
    const navigate = useNavigate();
    const usrCtx = useContext(UserContex);
    const [identifierList, setIdentifiersList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [identifierProvider, setIdentifierProvider] = useState("");
    const [domain, setDomain] = useState("")
    const [alias, setAlias] = useState("")
    const [alert,setAlert] = useState(false);


    const onSelectHandler = (did) => {
        console.log("DID", did);
        navigate('../identifier/' + did);
    }

    const generateIdentifier = async() => {
        setIsLoading(true)
        const res = await createNewDidApiCall();
        if(res.statusCode == 200)
        {
            
        }
        setIsLoading(false);
    }

    const Alert = ()=>
    {
        return(
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                This is a success alert — <strong>check it out!</strong>
            </Alert>
        )
    }

    useEffect(() => {
        const getIdenetifiers = async () => {
            setIsLoading(true)
            const res = await onVeramoApiCall('get', 'app/getAllIdentifiers', null,{type : usrCtx.userInfo?.userType});
            console.log(res);
            if (res.data.statusCode == 200) {
                setAlert(true);
                setIdentifiersList(res.data.result);
                setIsLoading(false)
            }
            else {
                setIsLoading(false)
            }
            setIsLoading(false)
        };

        getIdenetifiers();

    }, [])

    return (


        <Fragment>
            <div className="row">
            
                <div className="col-md-1"></div>
                <div className="col-md-10">
                   {isLoading && <LoadingSpinner/>} 
                    <Card>
                        <CardContent>
                            <form class="row g-3">
                                <div class="col-md-4">
                                    {/* <label for="provider" class="visually-hidden">Provider:</label> */}
                                    <input type="text" readOnly class="form-control" id="provider" value="did:ethr:rinkbey" />
                                </div>
                                <div class="col-md-4">
                                    {/* <label for="alias" class="visually-hidden">Alias:</label> */}
                                    <input type="text" class="form-control" id="alias" placeholder="Alias" onChange={(event)=>setAlias(event.target.value)}/>
                                </div>
                                <div class="col-auto">
                                    <button type="submit" class="btn btn-primary mb-3" onClick={generateIdentifier}>Create identity</button>
                                </div>
                            </form>
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Create identifer</Button>
                        </CardActions> */}
                    </Card>
                    <br />
                    <TableView data={identifierList} onAction={onSelectHandler} />
                </div>
                <div className="col-md-1"></div>
            </div>

        </Fragment>
    )
}
export default DidList;