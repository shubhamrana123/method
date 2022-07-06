import { Fragment, useEffect, useState, useContext } from "react";
import { onApiCall } from "../../../api/user/userApi";
import UserContex from "../../../context/userContext/UserContext";
import MessageDetail from "./MessageDetail";


const InboxView = () => {

    const [refresh,setRefresh] = useState(false);
    const [messages, setMessages] = useState([]);
    const usrCtx = useContext(UserContex);
    const [showMessageView, setShowMessageView] = useState(false);
    const [showInboxView,setShowInboxView] = useState(true);
    const [selectedMessage,setSelectedMessage] = useState(null); 

    const showMessage = async (item) => {
        setShowMessageView(true);
        setShowInboxView(false);
        setSelectedMessage(item)
        const res = await onApiCall('get', 'user/onReadMessage', null, { messageId: item.id });
        if (res.data.statusCode == 200) {

        }

    }

    const showInboxHandler = ()=>
    {
        setShowMessageView(false);
        setShowInboxView(true);
    }

    const onRefresh = ()=>
    {
        setRefresh(!refresh);
        console.log("---on refresh")

    }

    useEffect(() => {
        console.log("UseEffect")
        const loadMessages = async () => {
            const res = await onApiCall('get', 'user/loadMessagesForInbox', null, { userId: usrCtx?.userInfo?.userId });
            if (res.data.statusCode == 200) {
                setMessages(res.data.result);
                if(selectedMessage != null)
                {
                    const index = res.data.result.findIndex((item)=>item.id == selectedMessage.id);
                    if(index != -1)
                    {
                        setSelectedMessage(res.data.result[index]);
                    }

                }
            }
        }
        loadMessages();
    }, [refresh])
    return (
        <Fragment>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
            <div class="container">
                <div class="row">
                    {showInboxView && <div class="table-responsive">
                        <table class="table email-table no-wrap table-hover v-middle mb-0 font-14">
                            <tbody>
                                {
                                    
                                   messages.length > 0 ?  messages?.map(item => (

                                        <tr style={{ background: `${item.isOpen.data[0] == 0 ? '#d0e1e1' : 'white'}` }} >

                                            <td class="pl-3">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input" id="cst1" />
                                                    <label class="custom-control-label" for="cst1">&nbsp;</label>
                                                </div>
                                            </td>

                                            <td><i class="fa fa-star text-warning"></i></td>
                                            <td onClick={() => showMessage(item)}>
                                                <span class="mb-0 text-muted">{item.sender}</span>
                                            </td>

                                            <td onClick={() => showMessage(item)}>
                                                <a class="link" href="javascript: void(0)">
                                                    <span class="badge badge-pill text-white font-medium badge-danger mr-2">{item.type}</span>
                                                    <span class="text-dark">{item.message.substring(0, 10) + '..'}</span>
                                                </a>
                                            </td>

                                            {/* <td><i class="fa fa-paperclip text-muted"></i></td> */}

                                            <td class="text-muted" onClick={() => showMessage(item)}>May 13</td>
                                            <td class="text-muted"><i class='bx bx-trash-alt bx-sm' ></i></td>
                                        </tr>
                                    ))
                                    : <tr style={{ background:  '#d0e1e1' }} >
                                        &nbsp;
                                        <p>No messages yet.</p>
                                    </tr>
                                }


                            </tbody>
                        </table>
                    </div>
                    }
                    {showMessageView && <MessageDetail onRefresh={onRefresh} userId={usrCtx?.userInfo?.userId} item={selectedMessage} showInboxHandler = {showInboxHandler}/>}
                </div>
            </div>

        </Fragment>
    )
}

export default InboxView;