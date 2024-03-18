import React from 'react';
import './communityhome.scss';
import Stories from '../../stories/Stories';
import Share from '../share/Share';
import Posts from '../posts/Posts';
import DefaultSidebar from './Sidebar';

const CommunityHome = ({ IDENTIFIER }) => {
  console.log('Value of FOR in COMMUNITY MAIN PAGE2:', IDENTIFIER);

  return (
    <div className="flex">
      <div className="sticky left-0 top-0 h-screen overflow-y-auto">
      <DefaultSidebar  />
      </div>
      <div className="flex-grow p-4 ml-[15vw] overflow-y-auto"> {/* Ensure this container scrolls independently */}
        <Posts IDENTIFIER={IDENTIFIER} />
      </div>
    </div>
  );
};

export default CommunityHome;
