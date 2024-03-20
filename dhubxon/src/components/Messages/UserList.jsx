// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

// const UserList = ({ users, handleUserClick, selectedUser }) => {
//   return (
//     <div className="w-1/4 bg-gray-200 p-4 space-y-6 overflow-y-auto custom-scrollbar">
//       <div className="rounded-lg shadow-xl">
//         <h2 className="text-xl font-semibold mb-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">Users</h2>
//         {users.map((user) => (
//           <div key={user.Email} className={`flex items-center space-x-2 mb-2 px-4 py-2 hover:bg-gray-300 rounded-md transition duration-300 ${selectedUser && selectedUser.Email === user.Email ? 'bg-gray-400' : ''}`} onClick={() => handleUserClick(user)}>
//             <FontAwesomeIcon icon={faUser} className="text-blue-500" />
//             <span className="font-medium">{user.Name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserList;


// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

// const UserList = ({ users, handleUserClick, selectedUser }) => {
//   return (
//     <div className="w-1/4 bg-gray-200 p-4 space-y-4 overflow-y-auto custom-scrollbar">
//       <div className="rounded-lg shadow-xl">
//         <h2 className="text-xl font-semibold mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">Users</h2>
//         <div className="divide-y divide-gray-300">
//           {users.map((user) => (
//             <div key={user.Email} className={`flex items-center space-x-4 py-3 px-4 hover:bg-gray-100 cursor-pointer transition duration-300 ${selectedUser && selectedUser.Email === user.Email ? 'bg-gray-100' : ''}`} onClick={() => handleUserClick(user)}>
//               <FontAwesomeIcon icon={faUser} className="text-blue-500 text-lg" />
//               <span className="text-gray-800 font-medium">{user.Name}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserList;



import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserList = ({ users, handleUserClick, selectedUser }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-full overflow-y-auto custom-scrollbar">
        <div className="rounded-lg shadow-xl">
          <div className="divide-y divide-gray-300">
            {users.map((user) => (
              <div key={user.Email} className={`flex items-center space-x-4 py-3 px-4 hover:bg-gray-100 cursor-pointer transition duration-300 ${selectedUser && selectedUser.Email === user.Email ? 'bg-gray-100' : ''}`} onClick={() => handleUserClick(user)}>
                <FontAwesomeIcon icon={faUser} className="text-blue-500 text-lg" />
                <span className="text-gray-800 font-medium overflow-hidden whitespace-nowrap">{user.Name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
