import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar_Client from "../components/client/Navbar";
import { jwtDecode } from "jwt-decode";

const EditClientProfile = () => {
  const InitialImage =
    "https://res.cloudinary.com/dig2awru0/image/upload/v1708116157/WhatsApp_Image_2024-02-17_at_01.33.28_b9e28513_xtihdt.jpg";
  const [imageurl, setimageurl] = useState(InitialImage);
  const [image, setImage] = useState(null);
  const [changeimage, setchangeimage] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state variable


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyname: "",
    industry: "",
    projectposted: "",
    contactperson: "",
    contactemail: "",
    contactphone: "",
    companydescription: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const Email = decodedToken.clientData.email;

        console.log("Email in Fetch Data:", Email);
        const response = await axios.get(
          "http://127.0.0.1:5000/client/fetchprofiledata",
          {
            params: {
              Email: Email,
            },
          }
        );

        const fetchedData = response.data; // Modify this based on the actual response structure
        setFormData({ ...fetchedData });
        setimageurl(fetchedData.ProfileURL);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []);

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setimageurl(URL.createObjectURL(e.target.files[0]));
    setchangeimage(true);
  };

  const uploadimage = () => {
    return new Promise((resolve, reject) => {
      console.log("I am in Upload Image");
      if (imageurl === InitialImage || !changeimage) {
        resolve(imageurl); // Resolve with the current image URL if conditions not met
      } else {
        const formdata = new FormData();
        formdata.append("file", image);
        formdata.append("upload_preset", "hixrhbq4"); // Check your Cloudinary preset name
        axios
          .post(
            "https://api.cloudinary.com/v1_1/dig2awru0/image/upload",
            formdata
          )
          .then((response) => {
            console.log("Cloudinary Response is:", response.data.secure_url);
            setimageurl(response.data.secure_url);
            resolve(response.data.secure_url);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
            reject(error);
          });
      }
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Client Profile updated:", formData);
    // Handle form submission logic here
    if (!validation()) {
      return;
    } else {
      // submission();

      setIsLoading(true); // Set loading state to true before submission
      await submission(); // Wait for submission to complete
      setIsLoading(false); // Set loading state to false after submission
    }
  };

  const validation = () => {
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
      Swal.fire(
        "Please fill in all fields, ensure 'Projects Posted Must a positive Num' and Contact Phone Must be in Correct Format."
      );
      return false;
    }
    return true;
  };

  const submission = async () => {
    try {
      const companyname = formData.companyname;
      const industry = formData.industry;
      const contactperson = formData.contactperson;
      const contactemail = formData.contactemail;
      const contactphone = formData.contactphone;
      const companydescription = formData.companydescription;
      const projectposted = formData.projectposted;

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const decodedToken = jwtDecode(token);
      console.log("Token is:", decodedToken);

      const Email = decodedToken.clientData.email;
      console.log("Email is:", Email);

      const imageUrl = await uploadimage();



      const response = await axios.post(
        "http://127.0.0.1:5000/client/setprofile",
        {
          imageUrl,
          Email,
          companyname,
          industry,
          contactperson,
          contactemail,
          contactphone,
          companydescription,
          projectposted,
        }
      );

      console.log("Response:", response.data);
      Swal.fire({
        title: "Done!",
        text: "Your Profile has been Updated Successfully.",
        icon: "success",
      });
      navigate("/client/");
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error submitting form:", error);
      Swal.fire("Error Occurred");
    }
  };

  return (
    <>
      <Navbar_Client />
      <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-md p-6 mt-10 bg-green-100 mb-8">

      {isLoading && (
          <div className="flex items-center justify-center h-screen fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-gray-700">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-poppins font-bold text-center mb-5">
          Edit Your Client Profile
        </h2>

        <div className="ml-[20vw]">
          <img
            className="h-60 w-60 rounded-full object-cover object-center"
            src={imageurl}
            alt="nature image"
          />
        </div>
        <div className="ml-[22vw] mt-2">
          <input type="file" onChange={handleImageChange} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Basic Information Section */}
          <div className="md:col-span-2">
            <SectionHeader title="Basic Information" />
            <InputField
              label="Company Name"
              name="companyname"
              value={formData.companyname}
              onChange={handleChangeForm}
              placeholder="Enter your company name"
            />
            <InputField
              label="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChangeForm}
              placeholder="Enter your industry"
            />
          </div>

          {/* Contact Information */}
          <div className="md:col-span-2">
            <SectionHeader title="Contact Information" />
            <InputField
              label="Contact Person"
              name="contactperson"
              value={formData.contactperson}
              onChange={handleChangeForm}
              placeholder="Enter contact person's name"
            />
            <InputField
              label="Contact Email"
              name="contactemail"
              value={formData.contactemail}
              onChange={handleChangeForm}
              placeholder="Enter contact email"
            />
            <InputField
              label="Contact Phone"
              name="contactphone"
              value={formData.contactphone}
              onChange={handleChangeForm}
              placeholder="Enter contact phone number"
            />
          </div>

          {/* Company Details */}
          <div className="md:col-span-2">
            <SectionHeader title="Company Details" />
            <TextareaField
              label="Company Description"
              name="companydescription"
              value={formData.companydescription}
              onChange={handleChangeForm}
              placeholder="Describe your company..."
            />
            <InputField
              label="Projects Posted"
              name="projectposted"
              value={formData.projectposted}
              onChange={handleChangeForm}
              placeholder="Number of projects posted"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white font-medium py-2.5 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mt-6 md:col-span-2"
          >
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">
      {label}
    </label>
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="bg-white block w-full py-2.5 px-4 text-gray-900  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      placeholder={placeholder}
      required
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="p-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm mt-2"
      rows="4"
      placeholder={placeholder}
    ></textarea>
  </div>
);

const SectionHeader = ({ title }) => (
  <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
);

export default EditClientProfile;
