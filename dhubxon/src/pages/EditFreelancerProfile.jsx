import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SetupProfile = () => {
  const InitialImage="https://res.cloudinary.com/dig2awru0/image/upload/v1708116157/WhatsApp_Image_2024-02-17_at_01.33.28_b9e28513_xtihdt.jpg";
  const [imageurl, setimageurl] = useState(InitialImage);
  const [image, setImage] = useState(null);
  const [changeimage,setchangeimage]=useState(false);
    const [isLoading, setIsLoading] = useState(false); // New state variable

  const [formData, setFormData] = useState({
    email: "",
    city: "",
    country: "",
    headline: "",
    headlineDescription: "",
    portfolioDescription: "",
    skills: "",
    languages: "",
    education: "",
    certifications: "",
    employmentHistory: "",                                                
    otherExperiences: "",
    KEYWORDS: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const Email = decodedToken.freelancerData.email;

        console.log("Email in Fetch Data:", Email);
        const response = await axios.get(
          "http://127.0.0.1:5000/freelancer/fetchprofiledata",
          {
            params: {
              Email: Email,
            },
          }
        );

        const fetchedData = response.data;
        setFormData({ ...fetchedData });
        setimageurl(fetchedData.ProfileURL);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const isNumeric = (value) => {
    return /^\d+$/.test(value);
  };

  const validateEmail = (email) => {
    return email.includes("@");
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setimageurl(URL.createObjectURL(e.target.files[0]));
    setchangeimage(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "portfolioFile") {
      setFormData({
        ...formData,
        portfolio: { ...formData.portfolio, file: files[0] },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const uploadimage = () => {
    return new Promise((resolve, reject) => {
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


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Set isLoading to true to show the loading screen
    setIsLoading(true);
  
    const city = formData.city;
    const country = formData.country;
    const headline = formData.headline;
    const headlineDescription = formData.headlineDescription;
    const portfolioDescription = formData.portfolioDescription;
    const skills = formData.skills;
    const languages = formData.languages;
    const education = formData.education;
    const certifications = formData.certifications;
    const employmentHistory = formData.employmentHistory;
    const otherExperiences = formData.otherExperiences;
    const KEYWORDS = formData.KEYWORDS.toUpperCase();
  
    const errors = {};
  
    // Validation code here...

    if (isNumeric(city)) errors.city = "City should not contain numeric values";
    if (isNumeric(country))
      errors.country = "Country should not contain numeric values";

    if (headline.length < 5 || headline.length > 100) {
      errors.headline = "Headline should be between 5 and 100 characters";
    }

    if (headlineDescription.length < 50 || headlineDescription.length > 200) {
      errors.headlineDescription =
        "Description should be between 50 and 200 characters";
    }

    if (portfolioDescription.length < 50 || portfolioDescription.length > 500) {
      errors.portfolioDescription =
        "Portfolio description should be between 50 and 500 characters";
    }

    if (skills.length < 1 || skills.length > 500) {
      errors.skills =
        "Skill Description should be between 1 and 500 characters";
    }
    if (languages.length < 1 || languages.length > 50) {
      errors.languages = "language should be between 1 and 50 characters";
    }

    if (education.length < 1 || education.length > 50) {
      errors.education = "Education should be between 1 and 50 characters";
    }

    if (certifications.length < 1 || certifications.length > 50) {
      errors.certifications =
        "certifications should be between 1 and 50 characters";
    }

    if (employmentHistory.length < 1 || employmentHistory.length > 50) {
      errors.employmentHistory =
        "employmentHistory should be between 1 and 50 characters";
    }

    if (otherExperiences.length < 1 || otherExperiences.length > 50) {
      errors.otherExperiences =
        "otherExperiences should be between 1 and 50 characters";
    }

    if (KEYWORDS.length < 1 || KEYWORDS.length > 50) {
      errors.KEYWORDS = "KEYWORDS should be between 1 and 50 characters";
    }
  
    if (Object.keys(errors).length > 0) {
      // Handle validation errors, e.g., show an error message
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: Object.values(errors).map((error) => `<p>${error}</p>`).join(""),
      });
  
      // Set isLoading back to false to hide the loading screen
      setIsLoading(false);
      return;
    }
  
    try {
      // Upload image and get imageUrl
      const imageUrl = await uploadimage();
  
      // Get token from localStorage
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);

      console.log("decodedToken is:",decodedToken);
      // console.log("Token is:",token);

      const Email = decodedToken.freelancerData.email;
      console.log("Email is:",Email);

      const response = await axios.post(
                    "http://127.0.0.1:5000/freelancer/setprofile",
                    {
                      Email,
                      city,
                      country,
                      headline,
                      headlineDescription,
                      portfolioDescription,
                      skills,
                      languages,
                      education,
                      certifications,
                      employmentHistory,
                      otherExperiences,
                      KEYWORDS,
                      imageUrl,
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
  
      // Show success message
      Swal.fire({
        title: "Done!",
        text: "Your Profile has been Updated Successfully.",
        icon: "success",
      });
  
      // Navigate to the freelancer page
      navigate("/freelancer/");
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error submitting form:", error);
      Swal.fire("Error Occurred");
    } finally {
      // Set isLoading back to false after submission
      setIsLoading(false);
    }
  };
  






  

  // const handleSubmit = async (e) => {
  //   const city = formData.city;
  //   const country = formData.country;
  //   const headline = formData.headline;
  //   const headlineDescription = formData.headlineDescription;
  //   const portfolioDescription = formData.portfolioDescription;
  //   const skills = formData.skills;
  //   const languages = formData.languages;
  //   const education = formData.education;
  //   const certifications = formData.certifications;
  //   const employmentHistory = formData.employmentHistory;
  //   const otherExperiences = formData.otherExperiences;
  //   const KEYWORDS = formData.KEYWORDS.toUpperCase();

  //   /////////////////////////////////////////////////////////////

  //   const errors = {};

  //   if (isNumeric(city)) errors.city = "City should not contain numeric values";
  //   if (isNumeric(country))
  //     errors.country = "Country should not contain numeric values";

  //   if (headline.length < 5 || headline.length > 100) {
  //     errors.headline = "Headline should be between 5 and 100 characters";
  //   }

  //   if (headlineDescription.length < 50 || headlineDescription.length > 200) {
  //     errors.headlineDescription =
  //       "Description should be between 50 and 200 characters";
  //   }

  //   if (portfolioDescription.length < 50 || portfolioDescription.length > 500) {
  //     errors.portfolioDescription =
  //       "Portfolio description should be between 50 and 500 characters";
  //   }

  //   if (skills.length < 1 || skills.length > 500) {
  //     errors.skills =
  //       "Skill Description should be between 1 and 500 characters";
  //   }
  //   if (languages.length < 1 || languages.length > 50) {
  //     errors.languages = "language should be between 1 and 50 characters";
  //   }

  //   if (education.length < 1 || education.length > 50) {
  //     errors.education = "Education should be between 1 and 50 characters";
  //   }

  //   if (certifications.length < 1 || certifications.length > 50) {
  //     errors.certifications =
  //       "certifications should be between 1 and 50 characters";
  //   }

  //   if (employmentHistory.length < 1 || employmentHistory.length > 50) {
  //     errors.employmentHistory =
  //       "employmentHistory should be between 1 and 50 characters";
  //   }

  //   if (otherExperiences.length < 1 || otherExperiences.length > 50) {
  //     errors.otherExperiences =
  //       "otherExperiences should be between 1 and 50 characters";
  //   }

  //   if (KEYWORDS.length < 1 || KEYWORDS.length > 50) {
  //     errors.KEYWORDS = "KEYWORDS should be between 1 and 50 characters";
  //   }

  //   if (Object.keys(errors).length > 0) {
  //     // Handle validation errors, e.g., show an error message
  //     Swal.fire({
  //       icon: "error",
  //       title: "Validation Error",
  //       html: Object.values(errors)
  //         .map((error) => `<p>${error}</p>`)
  //         .join(""),
  //     });
    
  //   }

    

  //   e.preventDefault();
  //   if (("Length is:", Object.keys(errors).length === 0)) {
  //     e.preventDefault();
  //     console.log("Form submitted:", formData);

  //     console.log("Length is:", Object.keys(errors).length);

  //     uploadimage()
  //       .then(async (imageUrl) => {
  //         console.log("IMAGE URLLL:", imageUrl); 
  //         try {
  //           const token = localStorage.getItem("token");
  //           const decodedToken = jwtDecode(token);
  //           const Email = decodedToken.freelancerData.email;
  //           console.log(decodedToken.freelancerData.email);
  //           console.log("Image is:", image);
  //           const response = await axios.post(
  //             "http://127.0.0.1:5000/freelancer/setprofile",
  //             {
  //               Email,
  //               city,
  //               country,
  //               headline,
  //               headlineDescription,
  //               portfolioDescription,
  //               skills,
  //               languages,
  //               education,
  //               certifications,
  //               employmentHistory,
  //               otherExperiences,
  //               KEYWORDS,
  //               imageUrl,
  //               headers: {
  //                 "Content-Type": "multipart/form-data",
  //               },
  //             }
  //           );
  //           Swal.fire({
  //             title: "Done!",
  //             text: "Your Profile has been Updated Successfully.",
  //             icon: "success",
  //           });
  //           navigate("/freelancer/");

  //           console.log("Response:", response.data);
  //         } catch (error) {
  //           // Handle errors, e.g., show an error message
  //           console.error("Error submitting form:", error);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error uploading image:", error);
  //       });
  //     console.log("IMAGE URL:", imageurl);
  //   }
  // };

  return (
    <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-md p-6 mt-10 bg-blue-100 mb-8">

{isLoading && (
          <div className="flex items-center justify-center h-screen fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-gray-700">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        )}

      <h2 className="text-2xl font-poppins font-bold text-center mb-5">
        Basic Profile Setup
      </h2>

      <div className="ml-[18vw]">
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
        <div className="md:col-span-2">
          <SectionHeader title="Basic Information" />
          <InputField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
          />
          <InputField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter your country"
          />
        </div>

        <div className="md:col-span-2">
          <SectionHeader title="Professional Details" />
          <InputField
            label="Headline"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            placeholder="Enter Profile Headline"
          />
          <TextareaField
            label="Description"
            name="headlineDescription"
            value={formData.headlineDescription}
            onChange={handleChange}
            placeholder="Write your Description..."
          />
        </div>

        {/* Portfolio */}
        <div className="md:col-span-2">
          <SectionHeader title="Portfolio" />
          {/* <FileField label="Portfolio File" name="portfolioFile" onChange={handleChange} /> */}
          <TextareaField
            label="Portfolio Description"
            name="portfolioDescription"
            value={formData.portfolioDescription}
            onChange={handleChange}
            placeholder="Describe your portfolio..."
          />
        </div>

        {/* Skills and Languages */}
        <div className="md:col-span-2">
          <SectionHeader title="Skills & Languages" />
          <InputField
            label="Skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="List your skills"
          />
          <InputField
            label="Languages"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            placeholder="List languages you speak"
          />
        </div>

        {/* Education and Certifications */}
        <div className="md:col-span-2">
          <SectionHeader title="Education & Certifications" />
          <TextareaField
            label="Education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Detail your educational background"
          />
          <TextareaField
            label="Certifications"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            placeholder="List your certifications"
          />
        </div>

        {/* Employment and Other Experiences */}
        <div className="md:col-span-2">
          <SectionHeader title="Professional Experience" />
          <TextareaField
            label="Employment History"
            name="employmentHistory"
            value={formData.employmentHistory}
            onChange={handleChange}
            placeholder="Outline your employment history"
          />
          <TextareaField
            label="Other Experiences"
            name="otherExperiences"
            value={formData.otherExperiences}
            onChange={handleChange}
            placeholder="Describe any other relevant experiences"
          />
        </div>

        <div className="md:col-span-2">
          <SectionHeader title="KEYWORDS" />
          {/* <TextareaField label="Employment History" name="employmentHistory" value={formData.employmentHistory} onChange={handleChange} placeholder="Outline your employment history" /> */}
          <TextareaField
            label="Enter Keywords"
            name="KEYWORDS"
            value={formData.KEYWORDS}
            onChange={handleChange}
            placeholder="Describe any other relevant experiences KEYWORDS"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2.5 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-6 md:col-span-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium  text-gray-600">
      {label}
    </label>
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="block w-full py-2.5 px-4 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      className="p-4 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-2"
      rows="4"
      placeholder={placeholder}
    ></textarea>
  </div>
);

const FileField = ({ label, name, onChange }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-600">
      {label}
    </label>
    <input
      type="file"
      name={name}
      id={name}
      onChange={onChange}
      className="block w-full py-2.5 px-4 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

const SectionHeader = ({ title }) => (
  <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
);

export default SetupProfile;
