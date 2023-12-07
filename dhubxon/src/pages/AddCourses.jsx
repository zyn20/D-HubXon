



import React, { useState } from 'react';
import { FaRegStar, FaMoneyBillAlt, FaImage } from 'react-icons/fa';dasd
import Swal from 'sweetalert2';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        category: '',
        description: '',
        image: '',
        price: '',
        rating: {
            rate: '',
            count: '',
        },
        title: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'rate' || name === 'count') {
            setFormData({
                ...formData,
                rating: {
                    ...formData.rating,
                    [name]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/freelancer/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Data added successfully!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to add data. Please try again.',
                });
            }
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred. Please try again later.',
            });
        }
    };

    return (
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
                    <label htmlFor="image" className="block text-sm font-semibold text-gray-800">Image URL</label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Image URL"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                        <FaImage className="ml-2 text-gray-500" />
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

                <div className="mb-4 flex space-x-2">
                    <div className="w-1/2">
                        <label htmlFor="rate" className="block text-sm font-semibold text-gray-800">Rating</label>
                        <div className="flex items-center">
                            <input
                                type="number"
                                name="rate"
                                value={formData.rating.rate}
                                onChange={handleChange}
                                placeholder="Rating"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            />
                            <FaRegStar className="ml-2 text-gray-500" />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="count" className="block text-sm font-semibold text-gray-800">Rating Count</label>
                        <input
                            type="number"
                            name="count"
                            value={formData.rating.count}
                            onChange={handleChange}
                            placeholder="Rating Count"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
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

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
