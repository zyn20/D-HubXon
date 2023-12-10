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
import Home from './pages/Home';
import PostProject from './pages/PostProject'

import Protected from './components/Auth/Protected';

import ProductProvider from "./courses/src/contexts/ProductContext";
import SidebarProvider from "./courses/src/contexts/SidebarContext";
import CartProvider from "./courses/src/contexts/CartContext";
import ClientDashboard from './pages/ClientDashboard';
import AddCourses from "./pages/AddCourses"
import SignupPage from './pages/Signup';
import MainPage from './pages/mainPage'
import Check_ from './pages/Check_user';
import Complete_home from "./courses/src/complete_home";
import Complete_products from "./courses/src/complete_products";
import MyJobs from './components/Freelancer/Myjobs';

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
        element: <MainPage/>
      },
     
//For All
      {path:"/homepage",
    element:<MainPage/>},
    {path:"login",
    element:<Login/>},
    {path:"signup",
    element:<SignupPage/>},
    
    

//For Freelancer
      {path:"freelancerdashboard",
      element: <FreelancerHome/>},
      {path:"/freelancer/courses",
      element: <AddCourses/> },
      {path:"freelancer/viewjob",
      element: <Fullviewjob/>},
    {path: "/freelancer/postproject", element: <PostProject/> },
    {path:"/freelancer/setprofile",
    element: <SetupProfile/> },
    {path:"/freelancer/",
    element: <FreelancerDashboard/> },
    {path:"/freelancer/proposalsubmission",
    element: <ProposalSubmission/> },
    {path:"check",
    element:<Check_/> },
    {path:"/freelancer/community",
    element: <Community/> },
    {path:"freelancer/my-jobs",
    element: <MyJobs/> },
    {path:"freelancer/search-jobs",
    element: <Home/> },






//For Client
    {path:"/product/:id",
    element: <Complete_products/> },
    {path:"/client/explore-courses",
    element: <Complete_home/>  },
    {path:"/client/dashboard",
    element: <ClientDashboard/> },
    {path:"/client/postproject",
    element: <PostProject/>},
   

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

