import React, { useState } from 'react'
import CommunityNavbar from '../components/navbar/CommunityNavbar'
import Leftbar from '../components/leftBar/Leftbar';
import RightBar from '../components/rightBar/RightBar';
import CommunityHome from '../components/home/CommunityHome';

const Community = ({ IDENTIFIER }) => {
  // You can directly access IDENTIFIER here
  console.log("Value of IDENTIFIER in COMMUNITY MAIN PAGE1:", IDENTIFIER);

  return (
    <>
      <CommunityNavbar />
      <div>
        {/* <Leftbar/> */}
        <div style={{ flex: 6 }}>
          {/* Pass IDENTIFIER as a prop to CommunityHome */}
          <CommunityHome IDENTIFIER={IDENTIFIER} />
        </div>
        {/* <RightBar/> */}
      </div>
    </>
  )
}

export default Community;
