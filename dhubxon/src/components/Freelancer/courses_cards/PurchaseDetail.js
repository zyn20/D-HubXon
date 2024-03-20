// import React from 'react';

// // Assuming you have a list of customers
// const customers = [
//   {
//     name: 'Alex Shatov',
//     email: 'alexshatov@gmail.com',
//     spent: '$2,890.66',
//     country: '🇺🇸',
//     image: 'https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg'
//   },
//   // Add other customers following the same structure
// ];

// const CustomerTable = () => {
//   return (
//     <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
//       <div className="flex flex-col justify-center h-full">
//         <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
//           <header className="px-5 py-4 border-b border-gray-100">
//             <h2 className="font-semibold text-gray-800">Customers</h2>
//           </header>
//           <div className="p-3">
//             <div className="overflow-x-auto">
//               <table className="table-auto w-full">
//                 <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
//                   <tr>
//                     <th className="p-2 whitespace-nowrap">
//                       <div className="font-semibold text-left">Name</div>
//                     </th>
//                     <th className="p-2 whitespace-nowrap">
//                       <div className="font-semibold text-left">Email</div>
//                     </th>
//                     <th className="p-2 whitespace-nowrap">
//                       <div className="font-semibold text-left">Spent</div>
//                     </th>
//                     <th className="p-2 whitespace-nowrap">
//                       <div className="font-semibold text-center">Country</div>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-sm divide-y divide-gray-100">
//                   {customers.map((customer, index) => (
//                     <tr key={index}>
//                       <td className="p-2 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
//                             <img className="rounded-full" src={customer.image} width="40" height="40" alt={customer.name} />
//                           </div>
//                           <div className="font-medium text-gray-800">{customer.name}</div>
//                         </div>
//                       </td>
//                       <td className="p-2 whitespace-nowrap">
//                         <div className="text-left">{customer.email}</div>
//                       </td>
//                       <td className="p-2 whitespace-nowrap">
//                         <div className="text-left font-medium text-green-500">{customer.spent}</div>
//                       </td>
//                       <td className="p-2 whitespace-nowrap">
//                         <div className="text-lg text-center">{customer.country}</div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CustomerTable;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerTable = () => {
  // State to store the customer data
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemId = localStorage.getItem('itemid'); // Assuming the token is stored with this key
        if (!itemId) {
          console.error('No token found');
          return; // Exit if no token is found
        }

        const response = await axios.post('http://127.0.0.1:5000/freelancer/purchaseitem', { itemId });
        
        // Assuming the response data is an array of customers
        // If it's a single object, wrap it in an array
        setCustomers([response.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
      <div className="flex flex-col justify-center h-full">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Customers</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Address</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Amount</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">CreatedAt</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {customers.map((customer, index) => (
                    <tr key={index}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="font-medium text-gray-800">{customer.name}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.address}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{customer.Amount}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{new Date(customer.createdAt).toLocaleDateString()}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTable;
