import { Fragment, useState } from "react";
import ProfileCard2 from "./ProfileCard2";
import GroupList from "./GroupList";
const UserInfoScreen = ()=>
{
    const [GroupListView ,setGroupListView] = useState(false);
    const [userProfileView,setprofileView] = useState(true);

    const showUserDetails = ()=>{
        setprofileView(true);
        setGroupListView(false);
    }
    const showGroupList = ()=>
    {
        setprofileView(false);
        setGroupListView(true);
    }
    return(
        <Fragment>
             <hr class="my-4" />
                <span className="btn btn-primary" onClick={showUserDetails}>User Detail</span>&nbsp;
                <span className="btn btn-primary" onClick={showGroupList}>Group Details</span>
                <hr class="my-4" />
                {userProfileView && <ProfileCard2/>}
                {GroupListView && <GroupList/>}
        </Fragment>
    )
}

export default UserInfoScreen;