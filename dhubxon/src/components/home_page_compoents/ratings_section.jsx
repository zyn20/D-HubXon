const RatingsSection = ({ rating, totalVotes }) => {
    return (
      <>
        <div className="flex flex-row items-center justify-center gap-2 text-1xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="32"
            height="32"
            className="text-green-400"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="font-bold text-green-600">
            <span>{rating} / 10</span>
            <span className="px-8">{totalVotes}</span>
          </p>
        </div>
      </>
    );
  };
  
  export default RatingsSection;