
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


const Card = ({id, title, balance, color, duration, pricingType }) => {


  const navigate = useNavigate(); // Initialize the navigate function

  // Event handler for clicking the button
  const handleViewProposalsClick = () => {
    localStorage.setItem('project_id', id); // Store the project ID in local storage
    navigate('/allproposals'); // Navigate to the desired page. Replace '/some-other-page' with your target path
  };

  // Fallback to 'green' if the specified color is not found
  const classes = colorClasses[color] || colorClasses.green;

  return (
    <div className="p-4 sm:w-1/2 lg:w-1/3 w-full">
      <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-md shadow-indigo-50">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-gray-900 text-lg font-bold text-center">{title}</h2>
          <div className={`w-24 h-24 rounded-full flex justify-center items-center shadow-2xl border-white border-dashed border-2 ${classes.shadow} bg-gradient-to-tr ${classes.gradientFrom} ${classes.gradientTo}`}>
            <div className="text-white text-2xl">Pending</div>
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
       
        <button onClick={handleViewProposalsClick} className={`mt-6 px-4 py-2 ${classes.bg} text-white rounded-lg tracking-wider ${classes.hoverBg} outline-none self-start`}>
          View proposals
        </button>
      </div>
    </div>
  );
};

export default Card;



