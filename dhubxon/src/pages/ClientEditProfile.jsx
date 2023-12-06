import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditClientProfile = () => {

  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    companyname: '',
    industry: '',
    projectposted: '',
    contactperson: '',
    contactemail: '',
    contactphone: '',
    companydescription: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/client/fetchprofiledata');
        
        const fetchedData = response.data; // Modify this based on the actual response structure
        setFormData({ ...fetchedData });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function inside useEffect

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Client Profile updated:', formData);
    // Handle form submission logic here
if(!validation()){
  return;
}
else{
    submission();
}
  };

const validation=()=>{
  if (
    !formData.companyname ||
    !formData.industry ||
    !formData.contactperson ||
    !formData.contactemail ||
    !formData.contactphone ||
    isNaN(parseInt(formData.contactphone)) ||
    parseInt(formData.contactphone) < 0 ||
    !formData.companydescription ||
    !formData.projectposted ||
    isNaN(parseInt(formData.projectposted)) ||
    parseInt(formData.projectposted) < 0
  ) {
    Swal.fire("Please fill in all fields, ensure 'Projects Posted Must a positive Num' and Contact Phone Must be in Correct Format.");
    return false;
  }
  return true;
}


  const submission=async()=>{
const companyname=formData.companyname;
const industry=formData.industry;
const contactperson=formData.contactperson;
const contactemail=formData.contactemail;
const contactphone=formData.contactphone;
const companydescription=formData.companydescription;
const projectposted=formData.projectposted;

try {
  const response = await axios.post('http://127.0.0.1:5000/client/setprofile',{ companyname,industry,contactperson,contactemail,contactphone,companydescription,projectposted});
  // Handle the response, e.g., show a success message or redirect
  console.log('Response:', response.data);
  Swal.fire("Profile Edited Successfully");
  navigate("/clientdashboard");

} catch (error) {
  // Handle errors, e.g., show an error message
  console.error('Error submitting form:', error);
  Swal.fire("Error Occur");
}


  }

  return (
    <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-md p-6 mt-10 bg-green-100 mb-8">
      <h2 className='text-2xl font-poppins font-bold text-center mb-5'>Edit Your Client Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information Section */}
        <div className="md:col-span-2">
          <SectionHeader title="Basic Information" />
          <InputField label="Company Name" name="companyname" value={formData.companyname} onChange={handleChange} placeholder="Enter your company name" />
          <InputField label="industry" name="industry" value={formData.industry} onChange={handleChange} placeholder="Enter your industry" />
        </div>

        {/* Contact Information */}
        <div className="md:col-span-2">
          <SectionHeader title="Contact Information" />
          <InputField label="Contact Person" name="contactperson" value={formData.contactperson} onChange={handleChange} placeholder="Enter contact person's name" />
          <InputField label="Contact Email" name="contactemail" value={formData.contactemail} onChange={handleChange} placeholder="Enter contact email" />
          <InputField label="Contact Phone" name="contactphone" value={formData.contactphone} onChange={handleChange} placeholder="Enter contact phone number" />
        </div>

        {/* Company Details */}
        <div className="md:col-span-2">
          <SectionHeader title="Company Details" />
          <TextareaField label="Company Description" name="companydescription" value={formData.companydescription} onChange={handleChange} placeholder="Describe your company..." />
          <InputField label="Projects Posted" name="projectposted" value={formData.projectposted} onChange={handleChange} placeholder="Number of projects posted" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-medium py-2.5 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mt-6 md:col-span-2">Update Profile</button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">{label}</label>
    <input type="text" name={name} id={name} value={value} onChange={onChange} className="bg-white block w-full py-2.5 px-4 text-gray-900  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder={placeholder} required />
  </div>
);

const TextareaField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">{label}</label>
    <textarea name={name} id={name} value={value} onChange={onChange} className="p-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm mt-2" rows="4" placeholder={placeholder}></textarea>
  </div>
);

const SectionHeader = ({ title }) => (
  <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
);

export default EditClientProfile;
