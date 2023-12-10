import React from 'react'
import "./communityhome.scss"
import Stories from '../../stories/Stories'
import Share from '../share/Share'
import Posts from "../posts/Posts"

const CommunityHome = () => {
  return (
    <div className='home'>
      <Stories/>
      <Share/>
      <Posts/>
 
        </div>
  )
}

export default CommunityHome