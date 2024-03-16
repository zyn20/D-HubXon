import React, { useState, useEffect } from 'react';
import UserButton from '../components/Messages/UserButton'; 
import UserList from '../components/Messages/UserList'; 
import MessageBox from '../components/Messages/MessageBox'; 
import {jwtDecode} from 'jwt-decode';

const Chat = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);

    const fetchUsers = async (type) => {
        let url = `http://127.0.0.1:5000/${type}/${type}s`; 
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${type}s`);
            }
            const data = await response.json();
            // Append userType to each user object
            const usersWithType = data.map(user => ({ ...user, userType: type }));
            setUsers(usersWithType);
            setError(null);
        } catch (error) {
            setError(`Error fetching ${type}s: ${error.message}`);
            setUsers([]); // Optionally clear users in case of an error
        }
    };

    const handleUserButtonClick = (type) => {
        fetchUsers(type);
    };

    useEffect(() => {
        fetchUsers('client'); // Fetch clients by default
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-center">
                <UserButton userType="client" onClick={() => handleUserButtonClick('client')} />
                <UserButton userType="freelancer" onClick={() => handleUserButtonClick('freelancer')} />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {users.length > 0 && <UserList users={users} handleUserClick={setSelectedUser} />}
            {selectedUser && <MessageBox selectedUser={selectedUser} />}
        </div>
    );
};

export default Chat;



