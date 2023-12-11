import React, { useState } from "react";
import Jobcard from "../Jobcard";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';


import Fullviewjob from "./Fullviewjob";

const Cards = () => {
  const [most_recent, setMostRecent] = useState([]);
  const [Best_Match, setBESTMATCH] = useState([]);

  const [activeTab, setActiveTab] = useState("best-match"); 

  const fetch_recent = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/freelancer/AllProjects');
      setMostRecent(response.data);
    } catch (error) {
      console.error('Error fetching recent projects:', error);
      
    }
  };
  


  const fetch_BESTMATCH = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const Email = decodedToken.freelancerData.email;
  
      const response = await axios.get('http://127.0.0.1:5000/freelancer/fetchBESTMATCHES', {
        params: {
          Email: Email,
        },
      });
  
      // Assuming the data you need is in response.data
      setBESTMATCH(response.data);
    } catch (error) {
      console.error('Error fetching BESTMATCH:', error);
      // Handle the error or log it as needed
    }
  };
  



  const handleTabClick = (tabId) => {
    setActiveTab(tabId);

if(tabId==="most-recent"){
fetch_recent()
}

if(tabId==="best-match"){
  fetch_BESTMATCH()
  }

  };


  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = ({ title, description }) => {
    setSelectedJob({ title, description });
  };

  return (
    <div className="mx-auto w-[1280px] bg-white border border-gray-200 rounded-lg shadow dark:bg-blue-800 dark:border-gray-700">
      {/* Tab for small screens */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select tab
        </label>
        <select
          id="tabs"
          className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Best Matches</option>
          <option>Most Recent</option>
          <option>Saved jobs</option>
        </select>
      </div>

      {/* Tabs for larger screens */}
      <ul
        className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
        id="fullWidthTab"
        role="tablist"
      >
        {/* Statistics Tab */}
        <li
          className={`w-full ${activeTab === "best-match" ? "active-tab" : ""}`}
        >
          <button
            onClick={() => handleTabClick("best-match")}
            type="button"
            className={`inline-block w-full p-4 rounded-ss-lg ${
              activeTab === "best-match" ? "bg-blue-900 text-white" : "bg-white"
            } focus:outline-none`}
          >
            Best Matches
          </button>
        </li>

        {/* Services Tab */}
        <li
          className={`w-full ${
            activeTab === "most-recent" ? "active-tab" : ""
          }`}
        >
          <button
            onClick={() => handleTabClick("most-recent")}
            type="button"
            className={`inline-block w-full p-4 ${
              activeTab === "most-recent"
                ? "bg-blue-900 text-white"
                : "bg-white"
            } focus:outline-none`}
          >
            Most Recent
          </button>
        </li>

        {/* saved-jobs Tab */}
        <li
          className={`w-full ${activeTab === "saved-jobs" ? "active-tab" : ""}`}
        >
          <button
            onClick={() => handleTabClick("saved-jobs")}
            type="button"
            className={`inline-block w-full p-4 rounded-se-lg ${
              activeTab === "saved-jobs" ? "bg-blue-900 text-white" : "bg-white"
            } focus:outline-none`}
          >
            Saved Jobs
          </button>
        </li>
      </ul>

      {/* Tab content */}
      <div
        id="fullWidthTabContent"
        className="border-t border-gray-200 dark:border-gray-600"
      >
        {/* Statistics Tab Content */}
        <div
          className={`p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 ${
            activeTab === "best-match" ? "" : "hidden"
          }`}
          id="best-match"
          role="tabpanel"
          aria-labelledby="best-match-tab"
        >
          {/* Statistics content here */}
          <h2 className="text-2xl font-bold mb-4">Best Matches</h2>
          {/* Placeholder for Job Cards */}
          
          {Best_Match.map((project, index) => (
    
    <Jobcard
      key={index}
      title={project.title}
      description={project.description}
      skillRequired={project.skillRequired}
      projectDuration={project.projectDuration}
      pricingType={project.pricingType}
      projectDeadline={project.projectDeadline}
      budget={project.budget}
      KEYWORDS={project.KEYWORDS} // Make sure keywords is defined, use an empty array if not
      onClick={handleJobClick}
    />
  ))}

{/*  */}




{/* Add more JobCard components as needed */}
</div>

{/* Services Tab Content */}
<div
  className={`p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 ${
    activeTab === "most-recent" ? "" : "hidden"
  }`}
  id="most-recent"
  role="tabpanel"
  aria-labelledby="most-recent-tab"
>
  {/* Services content here */}
  <h2 className="text-2xl font-bold mb-4">Most Recent </h2>
  {/* Placeholder for Job Cards */}


  {most_recent.map((project, index) => (
    
  <Jobcard
    key={index}
    title={project.title}
    description={project.description}
    skillRequired={project.skillRequired}
    projectDuration={project.projectDuration}
    pricingType={project.pricingType}
    projectDeadline={project.projectDeadline}
    budget={project.budget}
    KEYWORDS={project.KEYWORDS} // Make sure keywords is defined, use an empty array if not
    onClick={handleJobClick}
  />
))}






  

{/*  */}

          {/* Add more JobCard components as needed */}
        </div>

        {/* saved-jobs Tab Content */}
        <div
          className={`p-4 bg-white rounded-lg dark:bg-gray-800 ${
            activeTab === "saved-jobs" ? "" : "hidden"
          }`}
          id="saved-jobs"
          role="tabpanel"
          aria-labelledby="saved-jobs-tab"
        >
          {/* saved-jobs content here */}
          <h2 className="text-2xl font-bold mb-4">Saved Jobs</h2>
          {/* <Jobcard
  title="Cybersecurity Expert Required"
  description="Seeking a Cybersecurity Expert to enhance the security of our online platforms. Experience with network security and ethical hacking preferred."
  projectType="Consultancy"
  price="$400"
  projectTime="2 weeks ago"
  location="On-site, London"
  budget="$1500 - $2500"
  keywords={["Cybersecurity", "Network Security", "Ethical Hacking"]}
  onClick={handleJobClick}
/>

<Jobcard
  title="Digital Marketing Specialist"
  description="Digital marketing specialist needed to strategize and execute campaigns across various online platforms. Experience with social media marketing is essential."
  projectType="Medium Term"
  price="$350"
  projectTime="3 days ago"
  location="Remote or Hybrid"
  budget="$1000 - $2000"
  keywords={["Digital Marketing", "Social Media", "Campaign Management"]}
  onClick={handleJobClick}
/>

<Jobcard
  title="Content Writer for Tech Blog"
  description="Tech company seeks a creative Content Writer to produce engaging, high-quality blog posts on current tech trends and products."
  projectType="Freelance"
  price="$100 per article"
  projectTime="1 day ago"
  location="Remote"
  budget="$100 - $300 per article"
  keywords={["Content Writing", "Blogging", "Tech"]} */}
  {/* onClick={handleJobClick} */}
{/* /> */}
          {/* Placeholder for Job Cards */}
       


          {selectedJob && <Fullviewjob title={selectedJob.title} description={selectedJob.description} />}
        </div>
      </div>
    </div>
  );
};

export default Cards;
