import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ userEmail }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // Fetch clients
            const clientsResponse = await fetch('http://127.0.0.1:5000/client/clients');
            if (clientsResponse.ok) {
                const clientsData = await clientsResponse.json();
                setUsers(prevUsers => [...prevUsers, ...clientsData.map(user => ({ ...user, userType: 'client' }))]);
            } else {
                console.error('Failed to fetch clients');
            }

            // Fetch freelancers
            const freelancersResponse = await fetch('http://127.0.0.1:5000/freelancer/freelancers');
            if (freelancersResponse.ok) {
                const freelancersData = await freelancersResponse.json();
                setUsers(prevUsers => [...prevUsers, ...freelancersData.map(user => ({ ...user, userType: 'freelancer' }))]);
            } else {
                console.error('Failed to fetch freelancers');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserClick = (user) => {
        // Set the selected user in state
        setSelectedUser(user);
        console.log(user);
    };

    return (
        <div className="w-1/4 bg-gray-200 p-4 space-y-6 overflow-y-auto custom-scrollbar">
            <div className="rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">Users</h2>
                {users.map((user) => (
                    <div key={user.Email} className={`flex items-center space-x-2 mb-2 px-4 py-2 hover:bg-gray-300 rounded-md transition duration-300 ${selectedUser && selectedUser.Email === user.Email ? 'bg-gray-400' : ''}`} onClick={() => handleUserClick(user)}>
                        <FontAwesomeIcon icon={faUser} className="text-blue-500" />
                        <span className="font-medium">{user.Name} ({user.userType})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;