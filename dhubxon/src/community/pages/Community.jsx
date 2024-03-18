import React from "react";
import CommunityHome from "../components/home/CommunityHome";
import Navbar from "../../components/Freelancer/Navbar_Freelancer";

const Community = ({ IDENTIFIER }) => {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div>
        <div style={{ flex: 6 }}>
          <CommunityHome IDENTIFIER={IDENTIFIER} />
        </div>
      </div>
    </>
  );
};

export default Community;
