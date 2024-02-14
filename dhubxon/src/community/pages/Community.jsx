import React from 'react'
import CommunityNavbar from '../components/navbar/CommunityNavbar'
import Leftbar from '../components/leftBar/Leftbar';
import RightBar from '../components/rightBar/RightBar';
import CommunityHome from '../components/home/CommunityHome';

const Community = () => {
  return (
    <>
    <CommunityNavbar/>
    <div >
        {/* <Leftbar/> */}
        <div style={{flex: 6}}>
        <CommunityHome/>
        </div>
        {/* <RightBar/> */}
    </div>
    </>
  )
}
export default Community;