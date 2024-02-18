
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaRegStar, FaMoneyBillAlt, FaImage } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Navbar_Freelancer from '../components/Freelancer/Navbar_Freelancer'
const ProductForm = () => {
    const navigate = useNavigate();









    const [formData, setFormData] = useState({
        category: '',
        description: '',
        image: '',
        price: '',
        rating: {
            rate: 0,
            count: 0,
        },
        title: '',
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
 const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file && file.type === 'application/zip') {
            setSelectedFile(file);
        } else {
            alert('Only ZIP files are accepted. Please select a valid ZIP file.');
            setSelectedFile(null);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.zip',
        multiple: false
    });
const onImageDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        setImageFile(file); // Store the file object
        const fileUrl = URL.createObjectURL(file);
        setFormData({ ...formData, image: fileUrl }); // Used for display purposes
    } else {
        alert('Only PNG or JPG files are accepted.');
    }
}, [formData]);

const { getRootProps: getZipRootProps, getInputProps: getZipInputProps } = useDropzone({
    onDrop,
    accept: '.zip',
    multiple: false
});
const titleTooltipStyle = {
    visibility: 'hidden', // Hide the tooltip by default
    opacity: 0,
    transform: 'translateX(100%)',
    left: '50%',
    bottom: '-1px',
    // Add any additional styles you want here
  };
  

const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    onDrop: onImageDrop,
    accept: 'image/png, image/jpeg',
    multiple: false
});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleChange2 = (e) => {
        const input = e.target.value;
      
        // Use a regular expression to test if the input consists of only alphabets
        if (/^[A-Za-z]*$/.test(input) || input === '') {
          setFormData({
            ...formData,
            title: input,
          });
        }
      };
      
    const handleChange1 = (e) => {
        const input = e.target.value;
      
        // Check if the input consists of only digits or if it's an empty string (Backspace)
        if (/^\d*$/.test(input) || input === '') {
          setFormData({
            ...formData,
            price: input,
          });
        }
      };
      
      
      
    const validateTitle = (title) => {
        const regex = /^.{3,}$/; // Title should be at least 3 characters long
        return regex.test(title);
    };

    const validatePrice = (price) => {
        // Validates a non-negative number (with up to 2 decimal places)
        const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
        return regex.test(price) && parseFloat(price) >= 0;
    };

    const validateDescription = (description) => {
        const wordCount = description.trim().split(/\s+/).length;
        return wordCount >= 30;
    };





    const handleSubmit = async (e) => {
        e.preventDefault();


        const token = localStorage.getItem('token');
        if (!formData.category || !formData.description || !imageFile || !formData.price || !formData.title) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Please fill in all the fields.',
            });
            return;
        }
        if (!validateTitle(formData.title) || !validatePrice(formData.price) || !validateDescription(formData.description)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please check your inputs.',
            });
            return;
        }
        const uploadFormData = new FormData();
        uploadFormData.append('category', formData.category);
        uploadFormData.append('description', formData.description);
        uploadFormData.append('image', imageFile); // Append the image file
        uploadFormData.append('price', formData.price);
        uploadFormData.append('title', formData.title);
        uploadFormData.append('rate', formData.rating.rate);
        uploadFormData.append('count', formData.rating.count);
    
        if (selectedFile) {
            uploadFormData.append('zipFile', selectedFile);
        }
        if (token) {
            uploadFormData.append('token', token);
        }
    
    
        try {
            const response = await fetch('http://127.0.0.1:5000/freelancer/courses', {
                method: 'POST',
                body: uploadFormData, // Send the form data
                // Don't set Content-Type header, let the browser set it
            });
    
            if (response.ok) {
                // ... success handling
                
                Swal.fire({
                                   icon: 'success',
                                   title: 'Success!',
                                   text: 'Data added successfully!',
                              });

navigate('/freelancer/')
                
            } else {
                // ... error handling

                Swal.fire({
                                     icon: 'error',
                                     title: 'Error!',
                                     text: 'Failed to add data. Please try again.',
                                 });
            }
        } catch (error) {
            console.error('Error:', error);
            // ... error handling
        }
    
        // Reset the file input after form submission
        setSelectedFile(null);
        setImageFile(null);
    };
    

 // Manually trigger the file input dialog
 const handleFileIconClick = () => {
    // document.getElementById('file-upload-input').click();
};
    
    return (
        <>
        
        <style>
        {`
            #description-textarea:hover + #description-tooltip {
                visibility: visible;
                opacity: 1;
                transform: translateX(100%);
                left: 50%;
                bottom:-1px;
            }
            #image-upload-field:hover + #image-tooltip {
                visibility: visible;
                opacity: 1;
                transform: translateX(100%);
                left: 50%;
                bottom: -20px; /* Adjust for image tooltip */
            }
            #zip-upload-field:hover + #zip-tooltip {
                visibility: visible;
                opacity: 1;
                transform: translateX(100%);
                left: 50%;
                bottom: -20px;
            }
        `}
    </style>




        <Navbar_Freelancer/>
        <div className="max-w-md mt-28 mb-14 mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-300">
            <form onSubmit={handleSubmit} className="space-y-4">

            <div className="mb-4">
                     <label htmlFor="category" className="block text-sm font-semibold text-gray-800">
                         Category
                     </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select Category</option>
                        <option value="Graphics Designing">Graphics Designing</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="AI">AI</option>
                        <option value="Writing">Writing</option>
                        <option value="UML">UML</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="relative mb-4">
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-800">Description</label>
                        <textarea
                            id="description-textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        <div 
                            id="description-tooltip"
                            role="tooltip"
                            className="absolute bottom-full mb-2 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                        >
                            Description must be at least 30 words.
                            <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </div>
        

                    <div className="relative mb-4">
                    <label htmlFor="image-url" className="block text-sm font-semibold text-gray-800">
                        Image URL (PNG or JPG)
                    </label>
                    <div {...getImageRootProps()} id="image-upload-field" className="flex items-center">
                        <input {...getImageInputProps()} id="image-url" style={{ display: 'none' }} />
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Drag 'n' drop an image file here, or click to select file"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        <FaImage className="ml-2 text-gray-500 cursor-pointer" />
                    </div>
                    <div 
                        id="image-tooltip"
                        role="tooltip"
                        className="absolute bottom-full mb-2 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                    >
                        Maximum image size should be 5 MB
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>
                <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-semibold text-gray-800">
                  Price in $
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange1}
                    placeholder="Price"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              {/* Title Input */}
<div className="mb-4 relative">
<label htmlFor="title" className="block text-sm font-semibold text-gray-800">
  Title
</label>
<input
  type="text"
  name="title"
  value={formData.title}
  onChange={handleChange2}
  placeholder="Title"
  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
  onMouseEnter={() => {
    // Show the tooltip when hovering over the input field
    document.getElementById('title-tooltip').style.visibility = 'visible';
    document.getElementById('title-tooltip').style.opacity = 1;
  }}
  onMouseLeave={() => {
    // Hide the tooltip when the mouse leaves the input field
    document.getElementById('title-tooltip').style.visibility = 'hidden';
    document.getElementById('title-tooltip').style.opacity = 0;
  }}
/>
{/* Tooltip for Title */}
<div
  id="title-tooltip"
  role="tooltip"
  className="absolute bottom-full mb-2 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
  style={titleTooltipStyle}
>
  Title must be at least 3 characters.
  <div className="tooltip-arrow" data-popper-arrow></div>
</div>
</div>


             

                
                    
                    <div className="relative mb-4">
                    <label htmlFor="zip-upload" className="block text-sm font-semibold text-gray-800">
                        Upload ZIP File
                    </label>
                    <div {...getRootProps()} id="zip-upload-field" className="flex items-center">
                        <input {...getInputProps()} id="zip-upload" style={{ display: 'none' }} />
                        {/* ... ZIP file field input ... */}
                        <input
                        type="text"
                        placeholder="Select your .zip file"
                        readOnly
                        value={selectedFile ? selectedFile.name : ''}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    
                    
                        <FaRegStar className="ml-2 text-gray-500 cursor-pointer" onClick={handleFileIconClick} />
                    </div>
                    <div 
                        id="zip-tooltip"
                        role="tooltip"
                        className="absolute bottom-full mb-2 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                    >
                        Maximum ZIP file size should be 150 MB
                        <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                </div>

            {/* ... other form fields ... */}

            <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
                Submit
            </button>

                {/* ... Other form fields ... */}

                
            </form>
        </div>
        </>
    );
};

export default ProductForm;





















