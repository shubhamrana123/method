
import Home from "../components/views/app/Home";
import { Routes,Route } from "react-router-dom";
const AppRoute = ()=>
{   
    return(
        <Routes>
            <Route path='index' element={<Home />} />
        </Routes>
    )
    
}
export default AppRoute;