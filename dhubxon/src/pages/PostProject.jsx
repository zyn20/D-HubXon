import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PostProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillRequired, setSkillRequired] = useState('');
  const [projectDuration, setProjectDuration] = useState('');
  const [pricingType, setPricingType] = useState('');
  const [projectDeadline, setProjectDeadline] = useState('');
  const [budget, setBudget] = useState('');
  const navigate = useNavigate(); 


  const validation = () => {
    const errors = {};
    
    if (!title) errors.title = 'Title is required';
    if (!description) errors.description = 'Description is required';
    if (!skillRequired) errors.skillRequired = 'Skill required is required';
    if (!projectDuration) errors.projectDuration = 'Project duration is required';
    if (!pricingType) errors.pricingType = 'Pricing type is required';
    if (!projectDeadline) errors.projectDeadline = 'Project deadline is required';
    
    // Check if budget is a valid integer
    if (!budget || isNaN(parseInt(budget))) {
      errors.budget = 'Budget must be a valid integer';
    }

    if (Object.keys(errors).length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        html: Object.values(errors).map((error) => `<p>${error}</p>`).join(''),
      });

      return false;
    }

    return true;
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validation()){
       return;
    }
 

    try {
     

      const response = await axios.post('http://127.0.0.1:5000/client/post_project', {
        title,
        description,
        skillRequired,
        projectDuration,
        pricingType,
        projectDeadline,
        budget,
      });
      // console.log('Project posted successfully:', response.data);
      Swal.fire('Project posted successfully');
      // navigate("postproject");
      
    } catch (error) {
      console.error('Error posting project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-20 bg-gray-100 bg-opacity-50 h-[70%]">
      <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
        <div className="bg-gray-100 p-4 bg-opacity-5 border-green-400 rounded-t">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <img
                className="w-10 h-10 object-cover rounded-full"
                alt="User avatar"
                src="https://example.com/client-avatar.jpg" // Change the client's avatar URL
              />
              <h1 className="text-green-600">Client's Name</h1>
            </div>
          </div>
        </div>
        <div className="bg-white space-y-6">
          {/* Job Section */}
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 max-w-sm mx-auto">Job</h2>
            <div className="md:w-2/3 max-w-sm mx-auto">
              <label className="text-sm text-gray-400">Title</label>
              <div className="w-full inline-flex border">
                <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                  <svg
                    fill="none"
                    className="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="Write title of your project"
                />
              </div>
            </div>
          </div>
          <hr />
  
          {/* Detailed Info Section */}
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 mx-auto max-w-sm">Detailed info</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
              <div>
                <label className="text-sm text-gray-400">Description</label>
                <div className="w-full inline-flex border">
                  <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-11/12 h-24 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="What do you want?"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Skill required</label>
                <div className="w-full inline-flex border">
                  <select
                    className="w-11/12 h-10 focus:outline-none focus:text-gray-600 p-2"
                    onChange={(e) => setSkillRequired(e.target.value)}
                  >
                    <option value="" selected>Select an option</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Content Writing">Content Writing</option>
                    <option value="Project Management">Project Management</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Project Duration</label>
                <div className="w-full inline-flex border">
                  <select
                    className="w-11/12 h-10 focus:outline-none focus:text-gray-600 p-2"
                    onChange={(e) => setProjectDuration(e.target.value)}
                  >
                    <option value="" selected>Select an option</option>
                    <option value="Long Term">Long Term</option>
                    <option value="Short Term">Short Term</option>
                    <option value="Regular">Regular</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <hr />
  
          {/* Pricing Info Section */}
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 mx-auto max-w-sm">Pricing info</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
              <div>
                <label className="text-sm text-gray-400">Price</label>
                <div className="w-full inline-flex border">
                  <select
                    className="w-11/12 h-10 focus:outline-none focus:text-gray-600 p-2"
                    onChange={(e) => setPricingType(e.target.value)}
                  >
                    <option value="" selected>Select an option</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Project Deadline</label>
                <div className="w-full inline-flex border">
                  <input
                    onChange={(e) => setProjectDeadline(e.target.value)}
                    type="datetime-local"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Budget</label>
                <div className="w-full inline-flex border">
                  <input
                    onChange={(e) => setBudget(e.target.value)}
                    value={budget}
                    type="text"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="Enter your budget"
                  />
                </div>
              </div>
            </div>
          </div>
  
          <hr />
          <div className="w-full p-2 text-right text-gray-500 flex items-center justify-center">
            <button
              type="submit"
              className="text-white rounded-md text-center bg-green-400 py-2 px-8 inline-flex items-center focus:outline-none"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
  
};

export default PostProject;
