
import React from 'react';
import Sidebar from '../components/Chat_Sidebar';
import ChatArea from '../components/Chat_ChatArea';
import Chat_Navbar from '../components/Chat_Navbar'

function Chat() {
  return (
    <>

    <Chat_Navbar/>
    <div className="flex h-screen ">
      
      <Sidebar />
      <ChatArea />
    </div>
    </>
  );
}

export default Chat;
