import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTimes, faClock, faDollarSign, faUser } from '@fortawesome/free-solid-svg-icons';
import './rightbar.scss';


const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span className="title">Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <FontAwesomeIcon icon={faUser} className="profileIcon" />
              <span className="userName">Abdullah</span>
            </div>
            <div className="buttons">
              <button className="followButton"><FontAwesomeIcon icon={faUserPlus} /> Follow</button>
              <button className="dismissButton"><FontAwesomeIcon icon={faTimes} /> Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <FontAwesomeIcon icon={faUser} className="profileIcon" />
              <span className="userName">Fahad</span>
            </div>
            <div className="buttons">
              <button className="followButton"><FontAwesomeIcon icon={faUserPlus} /> Follow</button>
              <button className="dismissButton"><FontAwesomeIcon icon={faTimes} /> Dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span className="title">Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="activityImage"
              />
              <p>
                <span className="activityUser">Watson</span> asking for Funds
              </p>
            </div>
            <span className="activityTime">10 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="activityImage"
              />
              <p>
                <span className="activityUser">Eva Lefie</span> updated her profile
              </p>
            </div>
            <span className="activityTime">5 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="activityImage"
              />
              <p>
                <span className="activityUser">John</span> funded 100$ for LLM chatbot
              </p>
            </div>
            <span className="activityTime">1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="activityImage"
              />
              <p>
                <span className="activityUser">Lilly</span> asking for Health donations
              </p>
            </div>
            <span className="activityTime">7 min ago</span>
          </div>
        </div>
        <div className="item">
          <span className="title">Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="onlineImage"
              />
              <div className="onlineIndicator" />
              <span className="userName">Jane Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
                className="onlineImage"
              />
              <div className="onlineIndicator" />
              <span className="userName">Jane Doe</span>
            </div>
          </div>
          {/* Continue adding more online friends entries */}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
