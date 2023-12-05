import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Root from './Root'

import reportWebVitals from './reportWebVitals';
import FreelancerHome from './pages/Home';
import { RouterProvider , createBrowserRouter, createRoutesFromElements,Route} from 'react-router-dom';
import Fullviewjob from './components/Freelancer/separate_components/Fullviewjob';
import ProposalSubmission from './pages/ProposalSubmission';
import SetupProfile from './pages/SetupProfile';
import FreelancerDashboard from './pages/FreelancerDashboard';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import VerifyOTP from './pages/Verify';
import PostProject from './pages/PostProject'

import Protected from './components/Auth/Protected';

import ProductProvider from "./courses/src/contexts/ProductContext";
import SidebarProvider from "./courses/src/contexts/SidebarContext";
import CartProvider from "./courses/src/contexts/CartContext";

import SignupPage from './pages/Signup';
import MainPage from './pages/mainPage'
import Check_ from './pages/Check_user';
import Complete_home from "./courses/src/complete_home";
import Complete_products from "./courses/src/complete_products";





const router = createBrowserRouter([
  {
    path: '/',
    element:<Root/>,
    children:[
      {
        path:"",
        element: <Complete_home/>
      },
      {path:"freelancerdashboard",
      element: <Protected  component={<FreelancerHome/>}/> },
      {path:"jobview",
      element: <Protected  component={<Fullviewjob/>}/> },
    {path:"/homepage",
    element: <Protected  component={<MainPage/>}/> },
    {path:"/product/:id",
    element: <Protected  component={<Complete_products/>}/> },
   
    {path: "/postproject", element: <Protected  component={<PostProject/>}/> },


    {path:"setprofile",
    element: <Protected  component={<SetupProfile/>}/> },
    {path:"dash",
    element: <Protected  component={<FreelancerDashboard/>}/> },
    {path:"login",
    element:<Login/>},
    {path:"signup",
    element:<SignupPage/>},
    {path:"proposalsubmission",
    element: <Protected  component={<ProposalSubmission/>}/> },
    {path:"editprofile",
    element: <Protected  component={<EditProfile/>}/> },
    {path:"check",
    element: <Protected  component={<Check_/>}/> },
    {path:"verify",
    element: <Protected  component={<VerifyOTP/>}/> },

    ]
  }
])








const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductProvider>
      <SidebarProvider>
        <CartProvider>
          <RouterProvider router={router}>
            <Root />
          </RouterProvider>
        </CartProvider>
      </SidebarProvider>
    </ProductProvider>
  </React.StrictMode>
);
reportWebVitals();

