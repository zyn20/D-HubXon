import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Root from './Root'
import reportWebVitals from './reportWebVitals';
import FreelancerHome from './pages/Home';
import { RouterProvider , createBrowserRouter, createRoutesFromElements,Route} from 'react-router-dom';
import Fullviewjob from './components/Freelancer/separate_components/Fullviewjob';
import ProposalSubmission from './pages/ProposalSubmission';
import SetupProfile from './pages/SetupProfile';
import FreelancerDashboard from './pages/FreelancerDashboard';
import EditProfile from './pages/EditProfile';
import LoginPage from './pages/Login';
import LLogin_ from './pages/LLogin';

import SignupPage from './pages/Signup';
import Check_ from './pages/Check_user';
const router = createBrowserRouter([
  {
    path: '/',
    element:<Root/>,
    children:[
      {
        path:"",
        element: <FreelancerHome/>
      },
      {path:"freelancerdashboard",
      element:<FreelancerHome/>},
      {path:"jobview",
    element:<Fullviewjob/>},
    {path:"setprofile",
    element:<SetupProfile/>},
    {path:"dash",
    element:<FreelancerDashboard/>},
    ,
    {path:"login",
    element:<LoginPage/>},
    {path:"signup",
    element:<SignupPage/>},
    {path:"proposalsubmission",
    element: <ProposalSubmission/>},
    {path:"editprofile",
    element: <EditProfile/>},
    {path:"check",
    element: <Check_/>},
    {path:"verify",
    element: <LLogin_/>}

    ]
  }
])






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
);
reportWebVitals();
