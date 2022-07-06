import { Fragment } from "react";


const Home = ()=>
{
    const formInputs = [
        {label : "Group Name",required : true, maxLength : 20, minLength : 1, type:"text", pattern : '',},
        {label : "Reciever Email",required : false, maxLength : 20, minLength : 1,  type:"text" , pattern : ''},
        {label : "Privilage Type",required : true, maxLength : 100, minLength : 3, type:"select" , pattern : ''}
    ];

    const BtnInfo = [
        {btnLabel : "Signup", type: "submit", actionHandler : null},
        {btnLabel : "Already a user?",  type: "", actionHandler: moveToLogin}
    ];
    return (
        <Fragment>
            
        </Fragment>
    )
}
export default Home;