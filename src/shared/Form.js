import Input from "../utils/Input";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import {useState,useRef,useEffect} from 'react';

const Form = (props)=>{
    console.log("ON Form", props)
    const { register, formState: { errors }, handleSubmit ,getValues,reset,setValue} = useForm();
    const [onRefresh,setOnRefresh] = useState(false);
    const onSubmit = ()=>
    {
        let resetFormFields = {} 
        const values = getValues();
        const fields = [...props.formInputs];
        const lables = fields.map(item=> item.label);
        lables.forEach(item =>{
            resetFormFields[item] = ""
        })
        props.onAction(values);
        reset(resetFormFields);
    }

    const clearForm = ()=>
    {
        let resetFormFields = {} 
        const fields = [...props.formInputs];
        const lables = fields.map(item=> item.label);
        lables.forEach(item =>{
            resetFormFields[item] = ""
        })
        reset(resetFormFields);
    }

    useEffect(()=>{
        let updateFileds = {} 
        const fields = [...props.formInputs];
        const lables = fields.map(item=> item.label);
        lables.forEach((item,index) =>{
            updateFileds[item] = fields[index].value;
        })
        reset(updateFileds);
    },[])
    

    return (
        <form>
            {
                props.formInputs.map((item,index)=>(
                    <div className="mb-3" key={index}>
                        <Input key={index} item={item} errors={errors} register={register} setValue={setValue}/>
                        
                    </div>
                ))
            }
            <CardActions>
                {props.BtnInfo.map((item,index)=>(
                    <button  key={index} className='btn btn-primary' onClick={item.type == "submit" ? handleSubmit(onSubmit) : item.actionHandler }>{item.btnLabel}</button>
                ))}
                
            </CardActions>
        </form>
      );
}
export default Form