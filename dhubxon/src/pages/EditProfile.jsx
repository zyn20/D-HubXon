import React, { useState, useEffect } from 'react';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    phone: '',
    company: '',
    city: '',
    country: '',
    headline: '',
    headlineDescription: '',
    // portfolio: {
    //   file: null,
    //   description: '',
    // },
    description:'',
    skills: '',
    languages: '',
    education: '',
    certifications: '',
    employmentHistory: '',
    otherExperiences: '',
  });

  useEffect(() => {
    // Fetch and populate existing user data here
    // Example: setFormData({ ...fetchedData });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'portfolioFile') {
      setFormData({ ...formData, portfolio: { ...formData.portfolio, file: files[0] } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form updated:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-md p-6 mt-10  bg-blue-100 mb-8">
      <h2 className='text-2xl font-poppins font-bold text-center mb-5'>Edit Your Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information Section */}
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
        <TextareaField label="Portfolio Description" name="portfolioDescription" value={formData.description} onChange={handleChange} placeholder="Describe your portfolio..." />
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


        {/* Submit Button */}
        <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-6 md:col-span-2">Update Profile</button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">{label}</label>
    <input type="text" name={name} id={name} value={value} onChange={onChange} className="bg-white block w-full py-2.5 px-4 text-gray-900  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={placeholder} required />
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
    <input type="file" name={name} id={name} onChange={onChange} className="block w-full py-2.5 px-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  </div>
);

const SectionHeader = ({ title }) => (
  <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
);

export default EditProfile;
