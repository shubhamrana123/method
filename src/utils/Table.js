
import { Fragment } from "react"


const Table = (props) => {
    console.log("pops table",props.Details);

    const onAction = (did)=>{
    props.onAction(did);
}
    return (
        <Fragment>
             <h2>Identites</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">DID</th>
                        <th scope="col">Provider</th>
                        <th scope="col">Alias</th>
                    </tr>
                </thead>
                <tbody>
                    {props.Details.length > 0  ? props.Details.map((item,index)=> {
                        console.log("In map",item)
                         return (
                            <tr key={index+1}>
                                <th scope="row">{index+1}</th>
                                <th scope="row">{item.identity[0].did}</th>
                                <td>{item.identity[0].provider}</td>
                                <td>{item.identity[0].alias[0]}</td>
                                <td><button className="btn btn-warning" onClick={()=>onAction(item.identity[0].did)}>View</button></td>
                            </tr>
                        )
                    }) : ""}
                   
                    
                </tbody>
            </table>
        </Fragment>
    )

}

export default Table