import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Root from './Root'
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import { RouterProvider , createBrowserRouter, createRoutesFromElements,Route} from 'react-router-dom';
import Fullviewjob from './components/Freelancer/separate_components/Fullviewjob';
import ProposalSubmission from './pages/ProposalSubmission';
import SetupProfile from './pages/SetupProfile';
import FreelancerDashboard from './pages/FreelancerDashboard';
import EditProfile from './pages/EditProfile';
const router = createBrowserRouter([
  {
    path: '/',
    element:<Root/>,
    children:[
      {
        path:"",
        element: <Home/>
      },

      {path:"jobview",
    element:<Fullviewjob/>},
    {path:"setprofile",
    element:<SetupProfile/>},
    {path:"dash",
    element:<FreelancerDashboard/>},
    {path:"proposalsubmission",
    element: <ProposalSubmission/>},
    {path:"editprofile",
    element: <EditProfile/>},
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
