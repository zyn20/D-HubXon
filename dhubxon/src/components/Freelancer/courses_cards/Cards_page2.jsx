
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
// Ensure correct import
import TaskCard from './Cardcourse';
 // Assuming this is used somewhere else or remove if not used
import { Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
// import Navbar_Freelancer from '../components/Freelancer/Navbar_Freelancer';
import Navbar_Freelancer from "../../Freelancer/Navbar_Freelancer";
function CardPage() {
  const navigate = useNavigate();
  const [CARDS, SetCARDS] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        // Ensure you have a valid token stored or handle the absence of the token appropriately

        if (!token) {
          console.error('No token found');
          return; // Exit if no token is found
        }

        const response = await axios.post('http://127.0.0.1:5000/dal/productOne', { token });

        console.log("Response Data is:", response.data);
        SetCARDS(response.data); // Use SetCARDS to update the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []); // Empty dependency array to run the effect only once


  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/dal/products/${id}`);
      // Remove the deleted course from the state
      SetCARDS(CARDS.filter(card => card.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };
  const handleEditClick = (id) => {
    localStorage.setItem('itemid', id);
    // Here you can add more logic for editing, such as showing an edit form
    navigate("/productstable");
  };


  return (
    <>
    <Navbar_Freelancer/>
      <div className="container mx-auto p-4">
        <div className="flex justify-center mt-20">
        <Link to="/course/add" className="mr-2">
        <Button className="mr-2">Add Software Products</Button>
        </Link>
         
        </div>
        <div className="flex justify-center mt-6">
        <h2 className="text-2xl font-bold mb-4">All products</h2>
        </div>
        <div className="flex flex-wrap -mx-2 mt-20">
          {CARDS.map((card, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <TaskCard 
              id={card.id}   
              title={card.title} 
                description={card.description} 
                onEdit={handleEditClick} 
                imageSrc={`http://127.0.0.1:5000${card.image.startsWith('/uploads') ? card.image : '/uploads/' + card.image}`} 
                onDelete={deleteCourse}
                />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CardPage;
