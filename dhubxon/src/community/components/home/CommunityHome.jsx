import React from 'react'
import "./communityhome.scss"
import Stories from '../../stories/Stories'
import Share from '../share/Share'
import Posts from "../posts/Posts"

const CommunityHome = ({IDENTIFIER}) => {
  console.log("Value of FOR in COMMUNITY MAIN PAGE2:",IDENTIFIER);

  return (
    <div className='home'>
      {/* <Stories/> */}
      {/* <Share/> */}
      <Posts IDENTIFIER={IDENTIFIER}/>
 
        </div>
  )
}

export default CommunityHome