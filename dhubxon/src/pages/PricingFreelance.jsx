import React, { useState } from 'react';
import { FaCheckCircle, FaRegCircle, FaRocket, FaUserAstronaut, FaStar, FaUsers, FaEnvelopeOpenText, FaHandshake } from 'react-icons/fa';

const Pricing = () => {
  const [isPro, setIsPro] = useState(false);

  const features = [
    { name: 'Direct Client Access', Icon: FaUsers },
    { name: 'Priority Proposal Placement', Icon: FaEnvelopeOpenText },
    { name: 'Exclusive Job Offers', Icon: FaHandshake },
    { name: 'Personal Branding Support', Icon: FaUserAstronaut },
    { name: 'Stellar Success Managers', Icon: FaStar }
  ];

  const packages = [
    {
      name: 'Launch Pad',
      description: 'Kickstart your freelance journey',
      includes: [true, false, false, false, false]
    },
    {
      name: 'Orbit',
      description: 'Elevate your presence and reach new heights',
      includes: [true, true, true, false, false]
    },
    {
      name: 'Stellar',
      description: 'Achieve galactic success with premium features',
      includes: [true, true, true, true, true]
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-indigo-200 to-purple-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-800">Galactic Freelance Marketplace Plans</h2>
          <p className="text-purple-700 mt-3">Propel Your Freelance Career to New Heights</p>
          <div className="mt-8">
            <button className={`py-2 px-6 rounded-lg font-bold transition duration-300 ${isPro ? 'bg-white text-purple-600' : 'bg-purple-500 text-white'}`} onClick={() => setIsPro(false)}>Launch Pad</button>
            <button className={`py-2 px-6 ml-4 rounded-lg font-bold transition duration-300 ${isPro ? 'bg-purple-500 text-white' : 'bg-white text-purple-600'}`} onClick={() => setIsPro(true)}>Pro Plans</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {packages.map((pkg, index) => (
            <div key={index} className={`rounded-xl shadow-2xl p-8 bg-white text-gray-800 transform transition duration-500 hover:-translate-y-2`}>
              <div className="flex items-center">
                <FaRocket className="text-lg text-purple-500 mr-2" />
                <h3 className="text-2xl font-bold">{pkg.name}</h3>
              </div>
              <p className="mt-2 text-purple-600">{pkg.description}</p>
              <ul className="mt-4">
                {features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mt-3">
                    <feature.Icon className={`text-xl mr-2 ${pkg.includes[featureIndex] ? 'text-purple-500' : 'text-gray-400'}`} />
                    <span className={`${pkg.includes[featureIndex] ? 'text-gray-700' : 'text-gray-400'}`}>{feature.name}</span>
                    <span className="ml-auto">
                      {pkg.includes[featureIndex] ? <FaCheckCircle className="text-green-500" /> : <FaRegCircle className="text-gray-300" />}
                    </span>
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full py-3 text-white ${index === 0 ? 'bg-purple-500' : index === 1 ? 'bg-indigo-500' : 'bg-purple-700'} rounded-lg font-medium hover:opacity-90 transition duration-300`}>
                Choose {pkg.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
