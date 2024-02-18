import React, { useState,useEffect } from 'react';
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const SetupProfile = () => {
  const [formData, setFormData] = useState({
    email:'',
    city: '',
    country: '',
    headline: '',
    headlineDescription: '',
    portfolioDescription: '',  
    skills: '',
    languages: '',
    education: '',
    certifications: '',
    employmentHistory: '',
    otherExperiences: '',
    KEYWORDS: '',

  });
  const navigate=useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const Email=decodedToken.freelancerData.email

  console.log("Email in Fetch Data:",Email);
  const response = await axios.get('http://127.0.0.1:5000/freelancer/fetchprofiledata', {
    params: {
      Email: Email,
    },
  });
        
        const fetchedData = response.data; // Modify this based on the actual response structure
        setFormData({ ...fetchedData });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function inside useEffect

  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'portfolioFile') {
      setFormData({
        ...formData,
        portfolio: { ...formData.portfolio, file: files[0] },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {

const city=formData.city;
const country=formData.country;
const headline=formData.headline;
const headlineDescription=formData.headlineDescription;
const portfolioDescription=formData.portfolioDescription;
const skills=formData.skills;
const languages=formData.languages;
const education=formData.education;
const certifications=formData.certifications;
const employmentHistory=formData.employmentHistory;
const otherExperiences=formData.otherExperiences;
const KEYWORDS=formData.KEYWORDS.toUpperCase();


    e.preventDefault();
    console.log('Form submitted:', formData);

    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const Email=decodedToken.freelancerData.email
      console.log(decodedToken.freelancerData.email);
        const response = await axios.post('http://127.0.0.1:5000/freelancer/setprofile',{ Email,city,country,headline,headlineDescription,portfolioDescription,skills,languages,education,certifications,employmentHistory,otherExperiences,KEYWORDS});
        Swal.fire({
          title: "Done!",
          text: "Your Profile has been Updated Successfully.",
          icon: "success"
        });
        navigate("/freelancer/");


        console.log('Response:', response.data);
    } catch (error) {
        // Handle errors, e.g., show an error message
        console.error('Error submitting form:', error);
    }
};


  return (
    <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-md p-6 mt-10 bg-blue-100 mb-8">
      <h2 className='text-2xl font-poppins font-bold text-center mb-5'>Basic Profile Setup</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="md:col-span-2">
          <SectionHeader title="Basic Information" />
          <InputField label="City" name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city" />
          <InputField label="Country" name="country" value={formData.country} onChange={handleChange} placeholder="Enter your country" />
        </div>

        {/* Professional Info */}
        <div className="md:col-span-2">
          <SectionHeader title="Professional Details" />
          <InputField label="Headline" name="headline" value={formData.headline} onChange={handleChange} placeholder="Enter Profile Headline" />
          <TextareaField label="Description" name="headlineDescription" value={formData.headlineDescription} onChange={handleChange} placeholder="Write your Description..." />
        </div>

        {/* Portfolio */}
        <div className="md:col-span-2">
          <SectionHeader title="Portfolio" />
          {/* <FileField label="Portfolio File" name="portfolioFile" onChange={handleChange} /> */}
          <TextareaField label="Portfolio Description" name="portfolioDescription" value={formData.portfolioDescription} onChange={handleChange} placeholder="Describe your portfolio..." />
        </div>

        {/* Skills and Languages */}
        <div className="md:col-span-2">
          <SectionHeader title="Skills & Languages" />
          <InputField label="Skills" name="skills" value={formData.skills} onChange={handleChange} placeholder="List your skills" />
          <InputField label="Languages" name="languages" value={formData.languages} onChange={handleChange} placeholder="List languages you speak" />
        </div>

        {/* Education and Certifications */}
        <div className="md:col-span-2">
          <SectionHeader title="Education & Certifications" />
          <TextareaField label="Education" name="education" value={formData.education} onChange={handleChange} placeholder="Detail your educational background" />
          <TextareaField label="Certifications" name="certifications" value={formData.certifications} onChange={handleChange} placeholder="List your certifications" />
        </div>

        {/* Employment and Other Experiences */}
        <div className="md:col-span-2">
          <SectionHeader title="Professional Experience" />
          <TextareaField label="Employment History" name="employmentHistory" value={formData.employmentHistory} onChange={handleChange} placeholder="Outline your employment history" />
          <TextareaField label="Other Experiences" name="otherExperiences" value={formData.otherExperiences} onChange={handleChange} placeholder="Describe any other relevant experiences" />
        </div>

        <div className="md:col-span-2">
          <SectionHeader title="KEYWORDS" />
          {/* <TextareaField label="Employment History" name="employmentHistory" value={formData.employmentHistory} onChange={handleChange} placeholder="Outline your employment history" /> */}
          <TextareaField label="Enter Keywords" name="KEYWORDS" value={formData.KEYWORDS} onChange={handleChange} placeholder="Describe any other relevant experiences KEYWORDS" />
        </div>

        <button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2.5 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-6 md:col-span-2">Submit</button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium  text-gray-600">{label}</label>
    <input type="text" name={name} id={name} value={value} onChange={onChange} className="block w-full py-2.5 px-4 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={placeholder} required />
  </div>
);

const TextareaField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">{label}</label>
    <textarea name={name} id={name} value={value} onChange={onChange} className="p-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2" rows="4" placeholder={placeholder}></textarea>
  </div>
);

const FileField = ({ label, name, onChange }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">{label}</label>
    <input type="file" name={name} id={name} onChange={onChange} className="block w-full py-2.5 px-4 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  </div>
);

const SectionHeader = ({ title }) => (
  <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
);

export default SetupProfile;
