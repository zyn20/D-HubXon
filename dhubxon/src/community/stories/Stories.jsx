import React from "react";
import "./stories.scss";
import img4 from '../assets/a.jpg';
import img5 from '../assets/d.jpg';
import img7 from '../assets/f.jpg';
import img8 from '../assets/g.jpg';
import img9 from '../assets/b.jpg';

const Stories = () => {
  const stories = [
    {
      id: 1,
      name: "Ali",
      img: img4,
    },
    {
      id: 2,
      name: "Ahmad",
      img: img5,
    },
    {
      id: 3,
      name: "Rizwan",
      img: img7,
    },
    {
      id: 4,
      name: "Anwar",
      img: img8,
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img src={img9} alt="" />
        <span>Zain</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
