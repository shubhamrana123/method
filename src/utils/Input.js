import { Fragment,useEffect, useState } from "react";
import {onApiCall} from '../api/user/userApi'; 
const Input = (props)=>
{   
    //
    const [options,setOptions] = useState([]);
    const [defaultOption,setDefaultOption] = useState(0);
    const optionsInput = ()=>
    {
        if(props.type !=null)
        {
            let item = null;
            if(props.item.label == "Practice Type" )
            {
                item = options?.find(item=>item.id == props.type);
            }
            else
            {
                return returnOptions();
            }
            if(item)
            {
                console.log("ITEM",item);
                return(
                    <option value={item['id']}>
                        {item['name']}
                    </option>
                )
            }
            else{
                <option value="">
                    {}
                </option>
            }
            
        }
        else{
            return returnOptions();
        }
        
    }

    const returnOptions = ()=>
    {
        console.log("returnOptions")
        if(options?.length > 0)
        {
            const keys = Object.keys(options[0]);
            console.log("KEYS",keys);
            return(
                options.map(item=>(
                    <option value={item[keys[0]]}>
                        {item[keys[1]]}
                    </option>
                )
            ))
        }
        else
        {
            return(
                options.map(item=>(
                    <option value={item.id}>
                     
                    </option>
                )
            ))
        }
    }

    const property = props.item;
    useEffect(()=>
    {
        if(property.type == "select")
        {
            console.log("property.type",property.type)
            const getTypes=async()=>{
                let res = null;
                if(property.queryParam != null || property.queryParam != undefined)
                {
                    console.log('------------',property.queryParam)
                    const query = property.queryParam;
                    res = await onApiCall('get',`user/${property.fetchData}`,null,{userId : query[Object.keys(query)[0]]});
                    if(res.data.statusCode == 200)
                    {
                        setOptions(res.data.result);
                        
                    }
                }
                else
                {
                    res = await onApiCall('get',`user/${property.fetchData}`,null,null);
                    if(res.data.statusCode == 200)
                    {
                        setOptions(res.data.result);
                        
                    }
                }
                
            }
            getTypes();
        }
        if(props.type !=null)
        {
            setDefaultOption(props.type);
        }
    },[])


    return(
        <Fragment>
            <label  className="form-label" ><b>{property.label}</b></label>
           {property.type != "select" ? <input id={property.id} type={property.type}  className="form-control" { ...props.register(property?.label, { required: property?.required ,maxLength: property?.maxLength ,minLength: property?.minLength} )}/>
           : 
           <select id={property.id} type={property.type} defaultValue="select" className="form-control" { ...props.register(property?.label, { required: property?.required , maxLength: property?.maxLength ,minLength: property?.minLength} )}>
                <option value="">Please choose an option</option>
                {optionsInput()}

            </select> 
           } 
            {props.errors[property.label]?.type === 'required' && <p className="text-danger">{`${property.label} is required`}</p>}
            {props.errors[property.label]?.type === 'maxLength' && <p className="text-danger" >{`${property.label} can't be more than ${props.item.maxLength} words `}</p>}
        </Fragment>
      
    )
}
export default Input;