import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const AddPost = () => {
    const [postData, setPostData] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Fetch and decode token
        // const token = localStorage.getItem('token');
        // const decodedToken = jwtDecode(token);
        // console.log(decodedToken.freelancerData);
    }, []);

    const handleInputChange = (e) => {
        setPostData(e.target.value);
    };

    const getCurrentDateTimeString = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        const timeString = `${hours}:${minutes}:${seconds}`;
        const dateTimeString = `${dateString} ${timeString}`;
        return dateTimeString;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        // console.log("FIND EMAIL:",decodedToken);

        const post = {
            NAME: decodedToken.freelancerData.name,
            PICTURE: "x",
            TIME: getCurrentDateTimeString(),
            CONTENT: postData,
            LIKES: 0,
            COMMENTS:0,
            EMAIL:decodedToken.freelancerData.email
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/freelancer/ADDcommunity_post', post);
            console.log('Post data sent successfully:', response.data);
            setPostData('');
        } catch (error) {
            console.error('Error sending post data:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto mt-8 bg-gray-100 shadow-md rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-4 text-indigo-600">Add a Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="postData"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Post Data
                    </label>
                    <input
                        type="text"
                        id="postData"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your post data"
                        value={postData}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                    />
                </div>
                <button
                    type="submit"
                    className={`bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Adding Post...' : 'Add Post'}
                </button>
            </form>
        </div>
    );
};

export default AddPost;


