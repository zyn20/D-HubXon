import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const DataForClaim = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [documents, setDocuments] = useState(null); // Changed initial state to null
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const documentUrl = await uploadFile(documents);
        const profilePictureUrl = await uploadFile(profilePicture);

        console.log("Document URL:", documentUrl); // Log document URL
        console.log("Profile Picture URL:", profilePictureUrl); // Log profile picture URL
        console.log("Name:", fullName); // Log profile picture URL
        console.log("Email:", email); // Log profile picture URL
        
  
        const response = await axios.post(
          "http://localhost:5000/freelancer/claim",
          {
            FULLNAME: fullName,
            EMAIL: email,
            FILEURL: documentUrl,
            PROFILEURL: profilePictureUrl,
          }
        );

        console.log("API Response:", response.data);


        // Reset form fields
        setFullName("");
        setEmail("");
        setDocuments(null); // Reset documents to null
        setProfilePicture(null);

        // Close the modal
        onClose();
      } catch (error) {
        console.error("Error submitting claim:", error);
      }
    } else {
      setErrors(errors);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!documents) {
      errors.documents = "Document is required";
    }
    if (!profilePicture) {
      errors.profilePicture = "Profile Picture is required";
    }
    return errors;
  };

  const uploadFile = async (file) => {
    if (!file) return null;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "hixrhbq4");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dig2awru0/image/upload",
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      throw new Error("Error uploading file:", error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-8">
              <h2 className="text-2xl font-bold mb-4">Claim Form</h2>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.fullName && "border-red-500"
                  }`}
                  placeholder="Enter Full Name"
                  required
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email && "border-red-500"
                  }`}
                  placeholder="Enter Email"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="documents"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Document
                </label>
                <input
                  type="file"
                  id="documents"
                  onChange={(e) => setDocuments(e.target.files[0])}
                  className={`
                  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.documents && "border-red-500"
                  }`}
                  required
                />
                {errors.documents && (
                  <p className="text-red-500 text-xs italic">
                    {errors.documents}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="profilePicture"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.profilePicture && "border-red-500"
                  }`}
                  accept="image/*"
                  required
                />
                {errors.profilePicture && (
                  <p className="text-red-500 text-xs italic">
                    {errors.profilePicture}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataForClaim;
