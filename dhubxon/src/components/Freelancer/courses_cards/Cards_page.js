
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode'; // Ensure correct import
import TaskCard from './Cardcourse';
import logo1 from './logo1.png'; // Assuming this is used somewhere else or remove if not used

function CardPage() {
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

        const response = await axios.post('http://127.0.0.1:5000/freelancer/courseOne', { token });

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
      await axios.delete(`http://127.0.0.1:5000/freelancer/course/${id}`);
      // Remove the deleted course from the state
      SetCARDS(CARDS.filter(card => card.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };


  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold mb-4">All Courses</h2>
        </div>
        <div className="flex flex-wrap -mx-2 mt-20">
          {CARDS.map((card, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <TaskCard 
              id={card.id}   
              title={card.title} 
                description={card.description} 
                
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
