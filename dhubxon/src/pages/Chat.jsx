
import React, { useState, useEffect } from 'react';
import UserButton from '../components/Messages/UserButton';
import UserList from '../components/Messages/UserList';
import MessageBox from '../components/Messages/MessageBox';
import FetchedMessagesCard from '../components/Messages/FetchedMessagesCard'; // Import the FetchedMessagesCard
import { jwtDecode } from 'jwt-decode';

const Chat = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);

    const fetchUsers = async (type) => {
        let url = `http://127.0.0.1:5000/${type}/${type}s`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${type}s`);
            }
            const data = await response.json();
            const usersWithType = data.map(user => ({ ...user, userType: type }));
            setUsers(usersWithType);
            setError(null);
        } catch (error) {
            setError(`Error fetching ${type}s: ${error.message}`);
            setUsers([]);
        }
    };

    const handleUserButtonClick = (type) => {
        fetchUsers(type);
    };

    useEffect(() => {
        fetchUsers('client');
    }, []);

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
                        <FetchedMessagesCard selectedUser={selectedUser} /> {/* Display fetched messages */}
                        <MessageBox selectedUser={selectedUser} /> {/* Send new messages */}
                    </>
                )}
            </div>
        </div>
    );
};

export default Chat;
