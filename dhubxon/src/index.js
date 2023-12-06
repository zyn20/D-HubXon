import { Navigate } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EditClientProfile from './pages/ClientEditProfile';

import Root from './Root'
import Community from './community/pages/Community';
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
import ClientDashboard from './pages/ClientDashboard';

import SignupPage from './pages/Signup';
import MainPage from './pages/mainPage'
import Check_ from './pages/Check_user';
import Complete_home from "./courses/src/complete_home";
import Complete_products from "./courses/src/complete_products";

const currentUser = true;

const ProtectedRoute = ({ children }) => {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element:(
      <ProtectedRoute>
        <Root/>
      </ProtectedRoute>
    )
   ,
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
  
    {path:"/community",
    element: <Community/>},
    {path:"cd",
    element: <ClientDashboard/>},
    {path:"edt",
    element: <EditClientProfile/>},

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

