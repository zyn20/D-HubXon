import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Navbar_Client from '../components/client/Navbar';

const PostProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillRequired, setSkillRequired] = useState('');
  const [projectDuration, setProjectDuration] = useState('');
  const [pricingType, setPricingType] = useState('');
  const [projectDeadline, setProjectDeadline] = useState('');
  const [budget, setBudget] = useState('');
  // const [KEYWORDS, setKEYWORDS] = useState('');
  const [KEYWORDS, setKEYWORDS] = useState();

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
    if (!validation()) {
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
        KEYWORDS
      });

      Swal.fire('Project posted successfully');
      navigate("/client/")
    } catch (error) {
      console.error('Error posting project:', error);
    }
  };

  return (
    <>
      <Navbar_Client />
      <form onSubmit={handleSubmit} className="py-20 bg-gray-100 bg-opacity-50 h-[70%]">
        <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md bg-white rounded-lg overflow-hidden">
          <div className="bg-green-500 text-white p-4">
            <h1 className="text-2xl font-bold">Post a New Project</h1>
          </div>
          <div className="p-4">
            {/* Job Section */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Write title of your project"
              />
            </div>

            {/* Detailed Info Section */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">Description</label>
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="What do you want?"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">Skill required</label>
              <select
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                onChange={(e) => setSkillRequired(e.target.value)}
              >
                <option value="" selected>Select an option</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Project Management">Project Management</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">Project Duration</label>
              <select
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                onChange={(e) => setProjectDuration(e.target.value)}
              >
                <option value="" selected>Select an option</option>
                <option value="Long Term">Long Term</option>
                <option value="Short Term">Short Term</option>
                <option value="Regular">Regular</option>
              </select>
            </div>

            {/* Pricing Info Section */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">Price</label>
              <select
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                onChange={(e) => setPricingType(e.target.value)}
              >
                <option value="" selected>Select an option</option>
                <option value="Fixed">Fixed</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">Project Deadline</label>
              <input
                onChange={(e) => setProjectDeadline(e.target.value)}
                type="datetime-local"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">Budget</label>
              <input
                onChange={(e) => setBudget(e.target.value)}
                value={budget}
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Enter your budget"
              />
            </div>

      

<div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">KEYWORDS</label>
              <input
                onChange={(e) => setKEYWORDS(e.target.value)}
                value={KEYWORDS}
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Enter KeyWords Related to your Project (Space-separated)"
              />
            </div>



            <div className="text-right">
              <button
                type="submit"
                className="text-white rounded-md bg-green-500 py-2 px-8 inline-flex items-center focus:outline-none"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PostProject;
