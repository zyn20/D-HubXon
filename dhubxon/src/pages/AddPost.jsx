import React, { useState } from 'react';

const AddPost = () => {
  const [postData, setPostData] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setPostData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate loading state while submitting
    setIsSubmitting(true);
    try {
      // Here you can add your logic to send post data to the backend API
      console.log('Post data submitted:', postData);
      // Simulate successful submission after 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Post data submitted successfully!');
      // Clear input field after successful submission
      setPostData('');
    } catch (error) {
      console.error('Error submitting post data:', error);
    } finally {
      setIsSubmitting(false); // Reset submitting state
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
            disabled={isSubmitting} // Disable input while submitting
          />
        </div>
        <button
          type="submit"
          className={`bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? 'Adding Post...' : 'Add Post'}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
