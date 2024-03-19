
import { useNavigate } from 'react-router-dom';
const colorClasses = {
  green: {
    text: 'text-green-500',
    bg: 'bg-green-400',
    hoverBg: 'hover:bg-green-500',
    shadow: 'shadow-green-400',
    gradientFrom: 'from-green-500',
    gradientTo: 'to-green-400',
  },
  blue: {
    text: 'text-blue-500',
    bg: 'bg-blue-400',
    hoverBg: 'hover:bg-blue-500',
    shadow: 'shadow-blue-400',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-400',
  },
  // Add more colors as needed
};


const Card = ({id, title, balance, color, duration, pricingType,status  }) => {


  const navigate = useNavigate(); // Initialize the navigate function

  // Event handler for clicking the button
  const handleViewProposalsClick = () => {
    localStorage.setItem('project_id', id); // Store the project ID in local storage
    navigate('/allproposals'); // Navigate to the desired page. Replace '/some-other-page' with your target path
  };

  // Fallback to 'green' if the specified color is not found
  const classes = colorClasses[color] || colorClasses.green;

  return (
    // Set a fixed width and a minimum height for each card
    <div className="p-4 md:w-1/3 w-full flex flex-col items-stretch">
      <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-md shadow-indigo-50 min-h-[300px] w-full">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-gray-900 text-lg font-bold text-center">{title}</h2>
          <div className={`w-24 h-24 rounded-full flex justify-center items-center shadow-2xl border-white border-dashed border-2 ${classes.shadow} bg-gradient-to-tr ${classes.gradientFrom} ${classes.gradientTo}`}>
            <div className="text-white text-2xl">{status}</div>
          </div>
        </div>
        <div className="mt-2 w-full">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">Duration:</span>
            <h3 className={`text-xl font-bold ${classes.text}`}>{duration}</h3>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">Pricing Type:</span>
            <h3 className={`text-xl font-bold ${classes.text}`}>{pricingType}</h3>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">Budget:</span>
            <h3 className={`text-xl font-bold ${classes.text}`}>${balance}</h3>
          </div>
        </div>
        {status === 'Active' ? (
          <>
            <button onClick={() => navigate(`/details/${id}`)} className={`mt-auto px-4 py-2 ${classes.bg} text-white rounded-lg tracking-wider ${classes.hoverBg} outline-none`}>
              Details
            </button>
            <button onClick={() => navigate(`/complete/${id}`)} className={`mt-2 px-4 py-2 ${classes.bg} text-white rounded-lg tracking-wider ${classes.hoverBg} outline-none`}>
              Complete Project
            </button>
          </>
        ) : (
          <button onClick={handleViewProposalsClick} className={`mt-auto px-4 py-2 ${classes.bg} text-white rounded-lg tracking-wider ${classes.hoverBg} outline-none`}>
            View Proposals
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;



