
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import useCountdown from './countdown';
import axios from 'axios'; // Make sure axios is imported

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


const Card = ({id, title, balance, color, duration, pricingType,status,takenby  , projectDeadline }) => {


  const navigate = useNavigate(); // Initialize the navigate function
  const { days, hours, minutes, seconds } = useCountdown(projectDeadline);
  // Event handler for clicking the button
  const handleViewProposalsClick = () => {
    localStorage.setItem('project_id', id); // Store the project ID in local storage
    navigate('/allproposals'); // Navigate to the desired page. Replace '/some-other-page' with your target path
  };
  const handleDetailsClick = () => {
    localStorage.setItem('taken', takenby);
    navigate('/oneproposal'); // Navigate to the details page for the given project ID
  };
  const handleCompleteProjectClick = async () => {
    try {
      // Send a POST request to your backend
      await axios.post('http://127.0.0.1:5000/client/complete-project', { id });
      // Navigate to a confirmation or success page, or refresh the current page to show updated status
       // Adjust the route as needed
       window.location.reload();
    } catch (error) {
      console.error('Error completing project:', error);
      // Optionally, handle the error, e.g., by showing an error message to the user
    }
  };

  // Fallback to 'green' if the specified color is not found
  const classes = colorClasses[color] || colorClasses.green;

  return (
    // Set a fixed width and a minimum height for each card
    <div className="p-4 md:w-1/3 w-full flex flex-col items-stretch">
      <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-md shadow-indigo-50 min-h-[300px] w-full">
      <div className="text-sm font-medium">
  {status !== 'Done' && (
    <div className="flex items-center justify-center space-x-2">
      {days > 0 && (
        <span className="flex items-center justify-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          <span>{days}</span>
          <span className="ml-1">days</span>
        </span>
      )}
      {hours > 0 && (
        <span className="flex items-center justify-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
          <span>{hours}</span>
          <span className="ml-1">hrs</span>
        </span>
      )}
      {minutes > 0 && (
        <span className="flex items-center justify-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
          <span>{minutes}</span>
          <span className="ml-1">min</span>
        </span>
      )}
      <span className="flex items-center justify-center bg-red-100 text-red-800 px-3 py-1 rounded-full">
        <span>{seconds}</span>
        <span className="ml-1">sec</span>
      </span>
    </div>
  )}
</div>
  
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
            <button  onClick={handleDetailsClick } className={`mt-auto px-4 py-2 ${classes.bg} text-white rounded-lg tracking-wider ${classes.hoverBg} outline-none`}>
              Details
            </button>
            <button onClick={handleCompleteProjectClick} className={`mt-2 px-4 py-2 ${classes.bg} text-white rounded-lg tracking-wider ${classes.hoverBg} outline-none`}>
              Complete Project
            </button>
          </>
        ) : status === 'Done' ? (
          <div className="mt-auto text-green-500 flex items-center justify-center">
            <FaCheckCircle className="mr-2" /> Completed Successfully!!!!
          </div>
        ):
         (
          <button onClick={handleViewProposalsClick} className={`mt-auto px-4 py-2 ${classes.bg} text-white rounded-lg tracking-wider ${classes.hoverBg} outline-none`}>
            View Proposals
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;



