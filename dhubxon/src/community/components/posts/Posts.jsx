import React from 'react';
import Post from '../post/post';
import './posts.scss';
import img1 from '../../assets/model.jpg';
import img2 from '../../assets/a.jpg';
import img3 from '../../assets/b.jpg';
import img4 from '../../assets/c.jpg';
import img5 from '../../assets/d.jpg';

import img7 from '../../assets/f.jpg';
import img8 from '../../assets/g.jpg';
import img9 from '../../assets/d.jpg';
import img10 from '../../assets/a.jpg';
import img11 from '../../assets/d.jpg';
import img12 from '../../assets/c.jpg';
import img13 from '../../assets/g.jpg';

import img15 from '../../assets/f.jpg';

const Posts = () => {
  // Temporary data
  const posts = [
    {
      id: 1,
      name: 'Ali',
      userId: 1,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Working on the newly launched machine learning model. Excited for collaborations!',
      img: img1,
    },
    {
      id: 2,
      name: 'Ahmad',
      userId: 2,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc:
        'Looking for freelancers interested in contributing to a cutting-edge AI project. Let’s innovate together!',
      img: img2,
    },
    {
      id: 3,
      name: 'John',
      userId: 3,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Exploring collaboration opportunities in the field of machine learning and artificial intelligence.',
      img: img3,
    },
    {
      id: 4,
      name: 'Emma',
      userId: 4,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Freelance developers wanted! Join our team to build the next generation of AI applications.',
      img: img4,
    },
    {
      id: 5,
      name: 'Michael',
      userId: 5,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Collaborate with us on a project that leverages machine learning to solve real-world problems.',
      img: img5,
    },
    {
      id: 6,
      name: 'Sophia',
      userId: 6,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Excited to connect with fellow ML enthusiasts for discussions and projects.',
      img: null,
    },
    {
      id: 7,
      name: 'Robert',
      userId: 7,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Ready to collaborate on machine learning projects. Let’s push the boundaries together!',
      img: img7,
    },
    {
      id: 8,
      name: 'Laura',
      userId: 8,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'AI enthusiasts, assemble! Looking for collaborators to join a machine learning research initiative.',
      img: img8,
    },
    {
      id: 9,
      name: 'David',
      userId: 9,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Connecting with fellow developers and researchers in the AI community. Let’s share knowledge!',
      img: img9,
    },
    {
      id: 10,
      name: 'Sara',
      userId: 10,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'AI for good! Seeking collaborators for a project that aims to make a positive impact using ML.',
      img: img10,
    },
    {
      id: 11,
      name: 'Daniel',
      userId: 11,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Let’s explore the future of AI together. Open to collaborations and discussions on ML breakthroughs.',
      img: img11,
    },
    {
      id: 12,
      name: 'Grace',
      userId: 12,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'AI + Creativity! Join me in a project that blends machine learning with innovative design.',
      img: img12,
    },
    {
      id: 13,
      name: 'Nathan',
      userId: 13,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'In search of collaborators for a research initiative in natural language processing. Let’s build smarter AI!',
      img: img13,
    },
    {
      id: 14,
      name: 'Olivia',
      userId: 14,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'No image for this post. Exploring new ideas in machine learning. Join the conversation!',
      img: null,
    },
    {
      id: 15,
      name: 'Ethan',
      userId: 15,
      profilePic:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
      desc: 'Machine learning enthusiasts, unite! Let’s create something amazing together.',
      img: img15,
    },
  ];

  return (
    <div className="posts">
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
