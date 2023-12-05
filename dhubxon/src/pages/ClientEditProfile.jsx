import React, { useState, useEffect } from 'react';

const EditClientProfile = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    projectsPosted: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    companyDescription: '',
  });

  useEffect(() => {
    // Fetch and populate existing client data here
    // Example: setFormData({ ...fetchedData });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Client Profile updated:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-md p-6 mt-10 bg-green-100 mb-8">
      <h2 className='text-2xl font-poppins font-bold text-center mb-5'>Edit Your Client Profile</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information Section */}
        <div className="md:col-span-2">
          <SectionHeader title="Basic Information" />
          <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter your company name" />
          <InputField label="Industry" name="industry" value={formData.industry} onChange={handleChange} placeholder="Enter your industry" />
        </div>

        {/* Contact Information */}
        <div className="md:col-span-2">
          <SectionHeader title="Contact Information" />
          <InputField label="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="Enter contact person's name" />
          <InputField label="Contact Email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} placeholder="Enter contact email" />
          <InputField label="Contact Phone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="Enter contact phone number" />
        </div>

        {/* Company Details */}
        <div className="md:col-span-2">
          <SectionHeader title="Company Details" />
          <TextareaField label="Company Description" name="companyDescription" value={formData.companyDescription} onChange={handleChange} placeholder="Describe your company..." />
          <InputField label="Projects Posted" name="projectsPosted" value={formData.projectsPosted} onChange={handleChange} placeholder="Number of projects posted" />
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
