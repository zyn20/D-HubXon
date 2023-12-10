import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends, faUsers, faStore, faPlay, faClock, faCalendarAlt, faGamepad, faImages, faVideo, faComments, faHandHoldingUsd, faChalkboardTeacher, faBook, faHandsHelping } from "@fortawesome/free-solid-svg-icons";
import profilepic from '../../assets/d.jpg';
import "./leftBar.scss";

const Leftbar = () => {
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={profilepic} alt="" />
            <span>Zain</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faUserFriends} />
            <span>Freelancers</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faUsers} />
            <span>Collaborations</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faStore} />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faPlay} />
            <span>Watch</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faClock} />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Events</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faGamepad} />
            <span>Gaming</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faImages} />
            <span>Gallery</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faVideo} />
            <span>Videos</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faComments} />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <FontAwesomeIcon icon={faHandHoldingUsd} />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faChalkboardTeacher} />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faBook} />
            <span>Courses</span>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faHandsHelping} />
            <span>Help & Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
