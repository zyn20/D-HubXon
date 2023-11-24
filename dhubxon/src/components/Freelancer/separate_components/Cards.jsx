import React, { useState } from "react";
import Jobcard from "../Jobcard";

import Fullviewjob from "./Fullviewjob";

const Cards = () => {
  const [activeTab, setActiveTab] = useState("best-match"); // Initial active tab

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
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
          <Jobcard
  title="UI/UX Developer Required"
  description="Looking for an experienced UI/UX Developer to revamp our member and admin panels. The backend is already integrated, and we need a fresh, user-friendly design."
  projectType="Short Term"
  price="$300"
  projectTime="2 hours ago"
  location="Remote"
  budget="$1000 - $1500"
  keywords={["UI/UX", "Web Design", "React", "Frontend"]}
  onClick={handleJobClick}

/>

<Jobcard
  title="Looking for React Developer"
  description="Need a React Developer for updating forms and adding CRUD operations in our existing application. The project is nearly complete, requiring only maintenance."
  projectType="Maintenance"
  price="$200"
  projectTime="1 day ago"
  location="Remote"
  budget="$500 - $800"
  keywords={["React", "JavaScript", "CRUD", "Frontend"]}
  onClick={handleJobClick}

/>

<Jobcard
  title="Full-Stack Developer Needed"
  description="Seeking a Full-Stack Developer for a new e-commerce project. Required to build both frontend and backend from scratch. Must have experience with React and Node.js."
  projectType="Long Term"
  price="$500"
  projectTime="3 days ago"
  location="On-site, New York"
  budget="$2000 - $3000"
  keywords={["Full-Stack", "React", "Node.js", "E-commerce"]}
  onClick={handleJobClick}
 
/>

<Jobcard
  title="WordPress Expert Wanted"
  description="Urgently looking for a WordPress Expert to optimize and enhance an existing website. Focus on SEO, performance improvements, and theme customization."
  projectType="Short Term"
  price="$150"
  projectTime="5 hours ago"
  location="Remote"
  budget="$300 - $500"
  keywords={["WordPress", "SEO", "Performance", "Customization"]}
  onClick={handleJobClick}
 
/>
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
          <Jobcard
  title="Angular Developer Needed"
  description="Seeking an Angular expert for a healthcare web application. Focus on building user-centric interfaces and integrating with REST APIs."
  projectType="Long Term"
  price="$350"
  projectTime="4 hours ago"
  location="Remote"
  budget="$1500 - $2000"
  keywords={["Angular", "REST API", "Healthcare"]}
  onClick={handleJobClick}
/>

<Jobcard
  title="Python Developer for Data Analysis Project"
  description="Looking for a Python Developer with experience in data analysis and machine learning. Project involves analyzing large datasets."
  projectType="Short Term"
  price="$400"
  projectTime="1 day ago"
  location="Remote"
  budget="$800 - $1200"
  keywords={["Python", "Data Analysis", "Machine Learning"]}
  onClick={handleJobClick}
/>

<Jobcard
  title="Node.js Backend Developer"
  description="Need a Node.js Developer for building and maintaining the backend of a fintech platform. Must have experience with microservices architecture."
  projectType="Long Term"
  price="$450"
  projectTime="2 days ago"
  location="Remote"
  budget="$2000 - $2500"
  keywords={["Node.js", "Microservices", "Fintech"]}
  onClick={handleJobClick}
/>

<Jobcard
  title="Freelance Graphic Designer"
  description="Graphic designer needed for creating engaging designs for digital marketing. Experience with Adobe Creative Suite required."
  projectType="Freelance"
  price="$200"
  projectTime="3 hours ago"
  location="Remote"
  budget="$300 - $600"
  keywords={["Graphic Design", "Adobe Creative Suite", "Digital Marketing"]}
  onClick={handleJobClick}
/>

<Jobcard
  title="SEO Specialist for E-commerce Website"
  description="E-commerce startup seeking an SEO Specialist to improve website traffic and search rankings. Knowledge of Google Analytics is a must."
  projectType="Short Term"
  price="$250"
  projectTime="5 days ago"
  location="Remote"
  budget="$500 - $1000"
  keywords={["SEO", "Google Analytics", "E-commerce"]}
  onClick={handleJobClick}
/>

<Jobcard
  title="iOS App Developer for Social Media Startup"
  description="Social media startup looking for an iOS Developer to build a new, innovative mobile application. Must be skilled in Swift and UX design."
  projectType="Long Term"
  price="$500"
  projectTime="1 week ago"
  location="Remote"
  budget="$2500 - $3500"
  keywords={["iOS", "Swift", "Social Media"]}
  onClick={handleJobClick}
/>

<Jobcard
  title="Blockchain Developer for NFT Project"
  description="Innovative NFT project searching for a Blockchain Developer with Ethereum and smart contract experience."
  projectType="Project-based"
  price="$600"
  projectTime="6 hours ago"
  location="Remote"
  budget="$3000 - $5000"
  keywords={["Blockchain", "Ethereum", "NFT", "Smart Contracts"]}
  onClick={handleJobClick}
/>

<Jobcard
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
  keywords={["Content Writing", "Blogging", "Tech"]}
  onClick={handleJobClick}
/>

 
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
          <Jobcard
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
  keywords={["Content Writing", "Blogging", "Tech"]}
  onClick={handleJobClick}
/>
          {/* Placeholder for Job Cards */}
       


          {selectedJob && <Fullviewjob title={selectedJob.title} description={selectedJob.description} />}
        </div>
      </div>
    </div>
  );
};

export default Cards;
