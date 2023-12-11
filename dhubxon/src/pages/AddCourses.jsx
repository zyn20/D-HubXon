
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaRegStar, FaMoneyBillAlt, FaImage } from 'react-icons/fa';
import Swal from 'sweetalert2';
const ProductForm = () => {
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

const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    onDrop: onImageDrop,
    accept: 'image/png, image/jpeg',
    multiple: false
});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.category || !formData.description || !imageFile || !formData.price || !formData.title) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Please fill in all the fields.',
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
            // uploadFormData.append('zipFile', selectedFile);
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
        <Navbar_Freelancer/>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-300">
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
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-800">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                {/* Image URL field with dropzone */}
                <label htmlFor="image-url" className="block text-sm font-semibold text-gray-800">
                    Image URL (PNG or JPG)
                </label>
                <div {...getImageRootProps()} className="flex items-center">
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
            </div>


                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-semibold text-gray-800">Price</label>
                    <div className="flex items-center">
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        <FaMoneyBillAlt className="ml-2 text-gray-500" />
                    </div>
                </div>

             

                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-800">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>
                {/* ... Other form fields ... */}

                <div {...getRootProps()} className="mb-4">
                <label htmlFor="file-upload-input" className="block text-sm font-semibold text-gray-800">
                    Upload ZIP File
                </label>
                <div className="flex items-center justify-between">
                    <input {...getInputProps()} id="file-upload-input" style={{ display: 'none' }} />
                    <input
                        type="text"
                        placeholder="Select your .zip file"
                        readOnly
                        value={selectedFile ? selectedFile.name : ''}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <FaImage className="ml-2 text-gray-500 cursor-pointer" onClick={handleFileIconClick} />
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





















