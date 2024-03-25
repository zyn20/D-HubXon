


import React, { useState, useEffect } from 'react';
import UserButton from '../components/Messages/UserButton';
import UserList from '../components/Messages/UserList';
import MessageBox from '../components/Messages/MessageBox';
import FetchedMessagesCard from '../components/Messages/FetchedMessagesCard';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'; // Import axios for making HTTP requests

const Chat = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [chatMessages, setChatMessages] = useState({ data: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({});
    const [imageurl, setimageurl] = useState(null);

    const [userNAME, setuserNAME] = useState('');


    const fetchUsers = async (type) => {
        let url = `http://127.0.0.1:5000/${type}/${type}s`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${type}s`);
            }
            const data = await response.json();
            console.log(data);
            const usersWithType = data.map(user => ({ ...user, userType: type }));
            setUsers(usersWithType);
            setError(null);
        } catch (error) {
            setError(`Error fetching ${type}s: ${error.message}`);
            setUsers([]);
        }
    };


    const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
          const decodedToken = jwtDecode(token);
          const Email = decodedToken.freelancerData.email;
  
          const response = await axios.get(
            "http://127.0.0.1:5000/freelancer/fetchprofiledata",
            {
              params: {
                Email: Email,
              },
            }
          );
          const fetchedData = response.data;
          setFormData({ ...fetchedData });
          setimageurl(fetchedData.ProfileURL);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };



    const addMessageToChat = (newMessage) => {
        setChatMessages((prevMessages) => ({
          ...prevMessages,
          data: [...prevMessages.data, newMessage], // Add new message to chat messages array
        }));
      };
      

    const fetchChatMessages = async () => {
        if (!selectedUser) {
            console.log('No user selected');
            return;
        }
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        setLoading(true);
        try {
            const decodedToken = jwtDecode(token);
            const fromUserEmail = decodedToken?.freelancerData?.email || decodedToken?.clientData?.email;


            const userRole = decodedToken.role;
            //const fromUserType = decodedToken?.freelancerData?.userRole
            console.log("Kid ka UserRole : ",userRole);


            const tempuser = decodedToken?.freelancerData?.name || decodedToken?.clientData?.name;
            console.log("UserName hai mera", tempuser);
            setuserNAME(tempuser);

            if (!fromUserEmail) {
                console.error('Invalid token data');
                setLoading(false);
                return;
            }
            const toUserEmail = selectedUser.Email;
            const response = await fetch(`http://localhost:5000/message/fetch-chat?fromUserEmail=${fromUserEmail}&toUserEmail=${toUserEmail}&fromUserType=${userRole}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch chat messages');
            }

            const messages = await response.json();
            console.log('New msgs',messages)
            setChatMessages(messages);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching chat messages:', error);
        }
    };

    useEffect(() => {
        fetchUsers('client');
       
    }, []);

    useEffect(() => {
        fetchChatMessages();
    }, [selectedUser]);

    const handleUserButtonClick = (type) => {
        fetchUsers(type);
    };

    
    return (
        <div className="container mx-auto mt-8 flex">
            <div className="w-1/4 bg-gray-200 p-4 space-y-6 overflow-y-auto custom-scrollbar">
                <div className="rounded-lg shadow-xl">
                    <h2 className="text-xl font-semibold mb-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg text-center">Available Users</h2>
                    <div className="flex justify-center">
                        <UserButton userType="Clients" onClick={() => handleUserButtonClick('client')} />
                        <UserButton userType="Freelancers" onClick={() => handleUserButtonClick('freelancer')} />
                    </div>
                    {users.length > 0 && <UserList users={users} handleUserClick={setSelectedUser} selectedUser={selectedUser} />}
                </div>
            </div>
            <div className="w-3/4 p-4">
                {selectedUser && (
                    <>
                    {console.log('Mera naam zain hai aur me and Sehri time',userNAME)}
                    {console.log('Mera naam zain hai aur me')}
                        <FetchedMessagesCard selectedUser={selectedUser} chatMessages={chatMessages} UserName = {userNAME} users={users} imageUrl={imageurl} /> 
                        <MessageBox selectedUser={selectedUser} chatMessages={chatMessages} addMessageToChat={addMessageToChat} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Chat;
