
import RatingsSection  from "./ratings_section";

// justify-center  items-center
const Ratings_card=()=>{
 
    return(
<>
<div className="flex items-center justify-center w-full mt-20">
  <h2 className="text-4xl lg:text-5xl text-center md:text-left text-blue-900 leading-tight font-medium">
    What our customers say about us
  </h2>
</div>


  <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:md:grid-cols-1 mt-20 mx-20  gap-10 lg:mx-20 md:mx-25 sm:mx-10 ">
  <div className="  block p-16 hover:border-blue-500   border-gray-200 rounded-lg shadow border-2  bg-white mb-4 ">
    <h5 className="text-center mb-2 text-1xl font-bold tracking-tight dark:text-blue-500">Finance & Accounting</h5>
    <RatingsSection rating={7.5} totalVotes={1813} />
</div>
<div className="  block p-16 hover:border-blue-500   border-gray-200 rounded-lg shadow border-2  bg-white mb-4 ">
<h5 className="text-center mb-2 text-1xl font-bold tracking-tight text-blue-500 dark:text-blue-500">Design & Creativity</h5>
<RatingsSection rating={8} totalVotes={2030} />
</div>
<div className=" block p-16 hover:border-blue-500   border-gray-200 rounded-lg shadow border-2  bg-white mb-4 ">
<h5 className="text-center mb-2 text-1xl font-bold tracking-tight  text-blue-500 dark:text-blue-500">Sales & Marketing</h5>
<RatingsSection rating={8.5} totalVotes={2500} />
</div>
<div className=" block p-16 hover:border-blue-500   border-gray-200 rounded-lg shadow border-2  bg-white mb-4 ">
<h5 className="text-center mb-2 text-1xl font-bold tracking-tight  text-blue-500 dark:text-blue-500">Engineering & Architecture</h5>
<RatingsSection rating={8.5} totalVotes={2500} />
</div>
<div className=" block p-16 hover:border-blue-500   border-gray-200 rounded-lg shadow border-2  bg-white mb-4">
<h5 className="text-center mb-2 text-1xl font-bold tracking-tight  text-blue-500 dark:text-blue-500">AI services</h5>
<RatingsSection rating={9} totalVotes={3030} />
</div>
<div className=" block p-16 hover:border-blue-500   border-gray-200 rounded-lg shadow border-2  bg-white mb-4" >
<h5 className="text-center mb-2 text-1xl font-bold tracking-tight  text-blue-500 dark:text-blue-500">Development & It</h5>
<RatingsSection rating={9.5} totalVotes={5050} />
</div>
</div>








</>


    );


}

export default Ratings_card;