import React, { useState } from 'react';
import { FaCheckCircle, FaRegCircle, FaHeadphonesAlt, FaBookOpen, FaHeartbeat, FaUserMd, FaUsers, FaPiggyBank } from 'react-icons/fa';

const PricingHealth = () => {
  const [isYearly, setIsYearly] = useState(false);

  const features = [
    { name: '24/7 On-call Support', Icon: FaHeadphonesAlt },
    { name: 'Unlimited Access to Health Resources', Icon: FaBookOpen },
    { name: 'Exclusive Wellness Programs', Icon: FaHeartbeat },
    { name: 'Personal Health Advisor', Icon: FaUserMd },
    { name: 'Family Health Plans', Icon: FaUsers },
    { name: 'Double Savings Benefit', Icon: FaPiggyBank }
  ];

  const packages = [
    {
      name: 'Sprout Plan',
      priceMonthly: '29',
      priceYearly: '290',
      includes: [true, true, false, false, false, false]
    },
    {
      name: 'Growth Plan',
      priceMonthly: '59',
      priceYearly: '590',
      includes: [true, true, true, true, false, false]
    },
    {
      name: 'Harvest Plan',
      priceMonthly: '99',
      priceYearly: '990',
      includes: [true, true, true, true, true, true]
    }
  ];

  return (
    <div className="py-12 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-blue-800">DHUBXON Health Care Subscriptions</h2>
          <p className="text-blue-600 mt-3">Empowering Freelancers with Comprehensive Health Plans</p>
          <div className="mt-8 inline-flex justify-center items-center bg-blue-200 rounded-full p-1 transition-colors duration-300 ease-in-out">
            <span className="text-blue-700 font-medium">Monthly</span>
            <label className="switch mx-3">
              <input type="checkbox" onChange={() => setIsYearly(!isYearly)} />
              <span className="slider round"></span>
            </label>
            <span className="text-blue-700 font-medium">Yearly (Save 20%)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {packages.map((pkg, index) => (
            <div key={index} className="rounded-xl shadow-xl bg-white p-8 transition duration-500 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-blue-800 mb-5">{pkg.name}</h3>
              <div className="text-lg mb-5">
                <span className="font-bold">
                  ${isYearly ? pkg.priceYearly : pkg.priceMonthly}
                </span>
                <span className="text-gray-600"> / {isYearly ? 'yr' : 'mo'}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <feature.Icon className={`text-xl mr-2 ${pkg.includes[featureIndex] ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className={`${pkg.includes[featureIndex] ? 'text-gray-700' : 'text-gray-400'}`}>{feature.name}</span>
                    <span className="ml-auto">
                      {pkg.includes[featureIndex] ? <FaCheckCircle className="text-green-500" /> : <FaRegCircle className="text-gray-300" />}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 text-white bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition duration-300">
                Choose {pkg.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingHealth;
