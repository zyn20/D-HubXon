import React from 'react';

const PostProject = () => {
  return (
    <section className="py-20 bg-gray-100 bg-opacity-50 h-[70%]">
      <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
        <div className="bg-gray-100 p-4 bg-opacity-5 border-indigo-400 rounded-t">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <img
                className="w-10 h-10 object-cover rounded-full"
                alt="User avatar"
                src="https://avatars3.githubusercontent.com/u/72724639?s=400&u=964a4803693899ad66a9229db55953a3dbaad5c6&v=4"
              />
              <h1 className="text-gray-600">Charly Olivas</h1>
            </div>
          </div>
        </div>
        <div className="bg-white space-y-6">
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 max-w-sm mx-auto">Job</h2>
            <div className="md:w-2/3 max-w-sm mx-auto">
              <label className="text-sm text-gray-400">Title</label>
              <div className="w-full inline-flex border">
                <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                  <svg
                    fill="none"
                    className="w-6 text-gray-400 mx-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                  placeholder="Write title of your project"
                  
                />
              </div>
            </div>
          </div>

          <hr />
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 mx-auto max-w-sm">Detailed info</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
              <div>
                <label className="text-sm text-gray-400">Description</label>
                <div className="w-full inline-flex border">
                
                  <textarea
                    type="text"
                    className="w-11/12 h-24 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="What do you want?"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Skill required</label>
                <div className="w-full inline-flex border">
               
              <select
                className="w-11/12 h-10 focus:outline-none focus:text-gray-600 p-2"
              >
                <option value="" selected>Select an option</option>
                <option value="option1">Full Stack Developer</option>
                <option value="option2">Graphic Design</option>
                <option value="option3">Writing tutoring</option>
              </select>
            </div>
              </div>
              <div>
              <label className="text-sm text-gray-400">Project Duration</label>
              <div className="w-full inline-flex border">
             
            <select
              className="w-11/12 h-10 focus:outline-none focus:text-gray-600 p-2"
            >
              <option value="" selected>Select an option</option>
              <option value="option1">Long Term</option>
              <option value="option2">Short Term</option>
              <option value="option3">Regular</option>
            </select>
          </div>
            </div>
            </div>
          </div>
          <hr />
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <h2 className="md:w-1/3 mx-auto max-w-sm">Pricing info</h2>
            <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
             
              <div>
                <label className="text-sm text-gray-400">Price</label>
                <div className="w-full inline-flex border">
                
              <select
                className="w-11/12 h-10 focus:outline-none focus:text-gray-600 p-2"
              >
                <option value="" selected>Select an option</option>
                <option value="option1">Milstone</option>
                <option value="option2">Fixed</option>
                
              </select>
            </div>
              </div>
              <div>
              <label className="text-sm text-gray-400">Project Deadline</label>
              <div className="w-full inline-flex border">
              
            <input
            type="datetime-local"
            className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
           
            
          />
          </div>
            </div>
            <div>
            <label className="text-sm text-gray-400">Budget</label>
            <div className="w-full inline-flex border">
         
          <input
          type="text"
          className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
         
          
        />
        </div>
        
          </div>
            </div>
          </div>
        
        
          <hr />
          <div className="w-full p-2 text-right text-gray-500 flex items-center justify-center">
          <button className="text-white  rounded-md text-center bg-indigo-400 py-2 px-8 inline-flex items-center focus:outline-none">
      
           
            Post
          </button>
        </div>
        
        </div>
      </div>
    </section>
  );
};

export default PostProject;
