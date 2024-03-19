
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

const Card = ({ title, balance, color }) => {
  // Fallback to 'green' if the specified color is not found
  const classes = colorClasses[color] || colorClasses.green;

  return (
    <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
      <div className="flex items-center justify-between p-4 rounded-lg bg-white shadow-md shadow-indigo-50">
        <div>
          <h2 className="text-gray-900 text-lg font-bold">{title}</h2>
          <h3 className={`mt-2 text-xl font-bold ${classes.text} text-left`}>+ {balance} ₭</h3>
          <p className="text-sm font-semibold text-gray-400">Last Transaction</p>
          <button className={`text-sm mt-6 px-4 py-2 ${classes.bg} text-white rounded-lg tracking-wider ${classes.hoverBg} outline-none`}>
            View proposals
          </button>
        </div>
        <div className={`w-32 h-32 rounded-full flex justify-center items-center shadow-2xl border-white border-dashed border-2 ${classes.shadow} ${`bg-gradient-to-tr ${classes.gradientFrom} ${classes.gradientTo}`}`}>
          <div className="text-white text-2xl">Active</div>
        </div>
      </div>
    </div>
  );
};

export default Card;