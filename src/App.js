
import Login from './components/auth/Login';
import TopNavbar from './components/navbar/TopNavbar';
import Sidebar from './components/navbar/Sidebar';
import './App.css';
import Signup from './components/auth/Signup';
import {Routes,Route,Outlet} from 'react-router-dom'
import AppRoute from './Routes/AppRoute';
import Home from "./components/views/app/Home";
import "reflect-metadata";
import IdentifierDetail from './components/views/app/identifiers/IdentifierDetail';
import CredentialsList from './components/views/app/credentials/CredentialsList';
import DidList from './components/views/app/identifiers/DidList';
import CreateCredentials from './components/views/app/credentials/CreateCredentails';
import CredentialDetails from './components/views/app/credentials/CredentialDetails';
import AddMember from './components/views/admin/AddMember';
import AssignCredentails from './components/views/admin/AssignCredentials';
import InboxView from './components/views/admin/InboxView';
import ViewRolesList from './components/views/user/ViewRolesList';
import { useContext } from 'react';
import UserContext from './context/userContext/UserContext';
import RequestSignup from './components/auth/RequestSignup';
import GroupIndex from './components/views/app/group/GroupIndex';
import PracticeGroupDetailView from './components/views/app/group/DetailView/PracticeGroupDetail';
import HospitalGroupDetailView from './components/views/app/group/DetailView/HospitaGroupDetail';


const AppLayout = () => (
  <>
    <Sidebar Outlet={<Outlet />} />
  </>
);
function App() {
  const usrCtx = useContext(UserContext);

  return (
    <div className="App">
      
       <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/:rqstFrom/:requestId" element={<RequestSignup />} />

          <Route path="/app" element={<AppLayout />} >
              <Route path="index" element={<Home />} /> 
              <Route path="Identifiers" element={<DidList />} /> 
              <Route path="identifier/:id" element={<IdentifierDetail/>} /> 
              <Route path="Credentails" element={<CredentialsList/>} /> 
              <Route path="createCredentail" element={<CreateCredentials/>} /> 
              <Route path="credential/:id" element={<CredentialDetails/>} /> 
              <Route path="AddMember" element={<AddMember/>} /> 
              <Route path="AssignCredentials" element={<AssignCredentails/>} /> 
              <Route path="ScheduleMeeting" element={<AssignCredentails/>} />
              <Route path="Inbox" element={<InboxView/>} />
              <Route path="UserRoles" element={<ViewRolesList/>} />
              <Route path="GroupInfo" element={<GroupIndex/>} />
              <Route path="practiceGroupeDetail/:id" element={<PracticeGroupDetailView/>} />
              <Route path="hospitalGroupeDetail/:id" element={<HospitalGroupDetailView/>} />
              
          </Route>
        </Routes>

     

    </div>
  );
}

export default App;
