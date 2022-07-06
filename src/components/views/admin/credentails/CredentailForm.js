import { Fragment, useState } from "react";
import { onApiCall } from "../../../../api/user/userApi";


const CredentailForm = (props) => {

    console.log(props);
    const [claimType, setClaimType] = useState('');
    const [claimValue, setClaimValue] = useState('');
    const [fields, updateFields] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [credentailType,setCredentailType] = useState('')

    const claimToObject = (arr) => {
        return arr.reduce(
            (obj, item) => Object.assign(obj, { [item.type]: item.value }),
            {},
        )
    }

    const updateClaimFields = (field) => {
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

    const clearClaimFields  = ()=>
    {
        updateFields([])
    }

    const issueCredentailHandler = async()=>
    {
        const credentails = {
            issuer : props.issuer.userDid,
            receiver : props.selectedUser.did,
            customContext : '',
            type : credentailType,
            claims : fields,
            proofFormat : 'jwt',
            groupId : props.groupId,
            userId : props.issuer.userId
        }
        console.log("---------credentails----------");
        console.log(credentails);
        const res = await onApiCall('post','app/createCredential',credentails,null);
        if(res.data.statusCode == 200)
        {
            alert('Role is assigned successfully');
        }
    }

    console.log(props.issuer)
    return (
        <Fragment>

            <div className="col-md-12">
                <Fragment>
                    <p>Credentails Preview</p>
                    <p>{JSON.stringify(claimToObject(fields), null, 2)}</p>
                </Fragment>
                <div class="card">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Assign To</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" disabled value={props.selectedUser?.fname + " " + props.selectedUser?.lname} />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Email</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" disabled value={props.selectedUser?.email} />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Subject DID</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" disabled value={props.selectedUser?.did} />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Issuer DID</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" disabled value={props.issuer.userDid} />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Credentails Type</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" onChange={(event)=>setCredentailType(event.target.value)} placeholder="ex Profile" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Context Url</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" disabled placeholder="Coustim context url" value="" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Jwt</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" disabled value="jwt" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Claim type</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" value={claimType} onChange={(e) => setClaimType(e.target.value)} placeholder="ex. name" />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Claim Value</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" value={claimValue} onChange={(e) => setClaimValue(e.target.value)} placeholder="ex. alice" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-3"></div>
                            <div class="col-sm-9 text-secondary">
                                <input type="button" class="btn btn-primary px-4" value="Add" onClick={() => updateClaimFields({
                                    type: claimType,
                                    value: claimValue,
                                })} /> &nbsp;
                                <input type="button" className="btn btn-primary px-4" value="Clear" onClick={()=> clearClaimFields()}/>
                            </div>
                        </div>
                        <br/>
                        {errorMessage && <p className="text-danger">ERROR MESSAGE : {errorMessage}</p>}
                        <br/>
                        <div class="row">
                            <div class="col-sm-3"></div>
                            <div class="col-sm-9 text-secondary">
                                <input type="button" class="btn btn-primary px-4" value="Save Changes" onClick={issueCredentailHandler}/>
                            </div>
                        </div>
                            
                    </div>
                </div>

            </div>
            
        </Fragment>
    )
}
export default CredentailForm;