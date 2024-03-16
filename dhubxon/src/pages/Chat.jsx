import React from 'react';
import { useChat } from '../contexts/ChatContext'; // Correctly import the useChat hook
import Sidebar from '../components/Chat_Sidebar';
import ChatArea from '../components/Chat_ChatArea';
import ChatNavbar from '../components/Chat_Navbar';

function Chat() {
    const { selectedUser, selectUser } = useChat(); // Now correctly using the useChat hook

    return (
        <>
            <ChatNavbar />
            <div className="flex h-screen">
                <Sidebar handleUserSelect={selectUser} />
                <ChatArea selectedUser={selectedUser} />
            </div>
        </>
    );
}

export default Chat;
