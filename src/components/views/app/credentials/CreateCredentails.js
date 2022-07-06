import { Fragment ,useRef,useState,useContext} from "react";
import { Typography, Form, Input, Button, Select, Row,Card } from 'antd';
import {onVeramoApiCall} from '../../../../api/veramo/didApi';
import LoadingSpinner from "../../../../utils/spinner/LoadingSpinner";
import UserContex from '../../../../context/userContext/UserContext';
const CreateCredentials = () => {

    const subjectRef = useRef("");
    const issuerRef = useRef("");
    const typeRef = useRef("");
    const urlRef = useRef("");
    const claimValueRef = useRef("");
    const proofFormatRef = useRef("");
    const [fields, updateFields] = useState([]);
    const [claimType, setClaimType] = useState('');
    const [claimValue, setClaimValue] = useState('');
    const [errorMessage, setErrorMessage] = useState();
    const [isLoading,setIsLoading] = useState(false);
    const usrCtx = useContext(UserContex);
    const onAddClaims = (field)=>
    {
        console.log("test")
        const claimTypes = fields.map((field) => field.type)
        const newfields = fields.concat([field])
        setErrorMessage(null)
        if (!field.type) {
          setErrorMessage('Enter claim type')
          return
        }
    
        if (!field.value) {
          setErrorMessage('Enter claim value')
          return
        }
    
        if (claimTypes.includes(field.type)) {
          setErrorMessage('Claim type already exists')
          return
        }
    
        updateFields(newfields)
        setClaimValue('')
        setClaimType('')
    }

    const claimToObject = (arr) => {
        console.log("arr",arr)
        return arr.reduce(
          (obj, item) => Object.assign(obj, { [item.type]: item.value }),
          {},
        )
    }
    
    const onCreateCredentails = async()=>
    {
        setIsLoading(true);
        const _issuer = issuerRef.current.value;
        const _type = typeRef.current.value;
        const _receiver = subjectRef.current.value;
        const _contextUrl  = urlRef.current.value;
        const _proofFormat = proofFormatRef.current.value;
        const _claims = fields;
    
        const obj = {
            issuer : _issuer,
            type : _type,
            receiver : _receiver,
            claims : _claims,
            userType : usrCtx?.userInfo.userType,
            customContext : _contextUrl,
            proofFormat : _proofFormat
        }
        const res = await onVeramoApiCall('post','app/addCredentials',obj);
        if(res.statusCode == 200)
        {
            alert("created");
        }
        else{
            alert("error");
        }
        setIsLoading(false);
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-2">

                </div>
                <div className="col-md-8">
                    <h3 className="text-left">&nbsp;&nbsp;ISSUE CREDENTAILS</h3>
                    <br/>
                    <Typography.Text>Credential preview</Typography.Text>
                    <Row>
                        
                        {/* <code> is inline and <pre> is block level  both is used to show your data as text */}
                        <code>
                            <pre>{JSON.stringify(claimToObject(fields), null, 2)}</pre>
                        </code>
                    </Row>
                        <div class="mb-3 row">
                            <label for="subject" class="col-sm-3 col-form-label">Subject Did</label>
                            <div class="col-sm-9">
                                <input type="text" readonly class="form-control" id="subject" ref={subjectRef}/>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="issuer" class="col-sm-3 col-form-label">Issuer Did</label>
                            <div class="col-sm-9">
                                <input type="issuer" class="form-control" ref={issuerRef} id="inputPassword" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="type" class="col-sm-3 col-form-label">Credentials type</label>
                            <div class="col-sm-9">
                                <input type="text" ref={typeRef} class="form-control" id="type" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="url" class="col-sm-3 col-form-label">Custom context url</label>
                            <div class="col-sm-9">
                                <input type="issuer" ref={urlRef} class="form-control" id="url" />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="jwt" class="col-sm-3 col-form-label">jwt</label>
                            <div class="col-sm-9">
                                <input type="issuer" class="form-control" id="jwt"  value="jwt"/>
                            </div>
                        </div>
                        <div class="mb-3 row ">
                            <label for="claimType" class="col-sm-3 col-form-label">Claim Type</label>
                            <div class="col-sm-9">
                                <input type="issuer"  class="form-control" id="claimType" placeholder="claim type eg: name" onChange={(e)=>setClaimType(e.target.value)}/>
                            </div>
                       </div> 
                        <div class="mb-3 row">
                            <label for="claimValue" class="col-sm-3 col-form-label">Calim Value</label>
                            <div class="col-sm-9">
                                <input type="issuer" ref={claimValueRef} class="form-control" id="claimValue" placeholder="claim value eg: Alice" onChange={(e)=>setClaimValue(e.target.value)}/>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <div class="col-sm-9">
                                <button className="btn btn-primary" onClick={()=>onAddClaims({
                                    type: claimType,
                                    value: claimValue,
                                })}>Add</button>
                            </div>
                           
                        </div>
                        <div class="mb-3 row">
                            <div class="col-sm-8">
                                <button className="btn btn-primary" onClick={onCreateCredentails}>Issue</button> &nbsp;
                                <button className="btn btn-primary">Issue and Send</button>
                            </div>
                           
                        </div>
                </div>
                <div className="col-md-2">

                </div>
            </div>



        </Fragment>
    )
}
export default CreateCredentials;