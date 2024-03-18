import React, { useEffect } from 'react';
import icon from "../../assets/Sendicon.png"
import { FaClock, FaTag, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Jobcard = ({
  id,
  title,
  description,
  skillRequired,
  projectDuration,
  pricingType,
  projectDeadline,
  budget,
  KEYWORDS,
  onClick,
}) => {
  const navigate = useNavigate();
  const keywordsArray = KEYWORDS.split(' ');
  const handleproposalsubmit=()=>{
    navigate("/freelancer/proposalsubmission",{ state: { title,description,skillRequired,projectDuration,pricingType,projectDeadline,budget,ID:id} });  
  }

  // 
  return (
    <div
      className="bg-blue-50 p-4 rounded-md mb-4 shadow-md cursor-pointer hover:bg-blue-200 transition duration-200"
      onClick={() =>
        onClick({
          id,
          title,
          description,
          skillRequired,
          projectDuration,
          pricingType,
          projectDeadline,
          budget,
          KEYWORDS
        })
      }
    >
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
<p className="text-gray-600 mb-4">{description}</p>
<div className="flex items-center text-gray-600 text-sm mb-2">
  <FaClock className="mr-2" /> Skill Required: {skillRequired}
</div>
<div className="flex items-center text-gray-600 text-sm mb-2">
  <FaTag className="mr-2" /> Project Duration: {projectDuration}
</div>
<div className="flex items-center text-gray-600 text-sm mb-2">
  <FaMoneyBillWave className="mr-2" /> Budget: {budget}
</div>
<div className="flex items-center text-gray-600 text-sm mb-2">
  <FaTag className="mr-2" /> Pricing Type: {pricingType}
</div>
<p className="text-gray-600 text-sm mb-2">Deadline: {projectDeadline}</p>

{/* // Inside Jobcard component */}
<div className="flex flex-wrap items-center justify-between text-gray-600 text-sm">
  <div>
  {keywordsArray.length > 0 && keywordsArray.map((keyword, index) => (
    <span key={index} className="mr-2 mb-2 bg-blue-900 text-white rounded-full px-3 py-1">
      {keyword}
    </span>
  ))}
  </div>

<div className='' onClick={handleproposalsubmit}>
<Button size="lg" color="white" className="flex items-center gap-3 h-[6vh]">
        <img src={icon} alt="metamask" className="h-6 w-6" />
        Send Proposal
      </Button>
      </div>
      </div>
    </div>



  );
};

export default Jobcard;
