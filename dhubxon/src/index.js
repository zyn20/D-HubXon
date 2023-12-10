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
      element: <Protected  component={<FreelancerHome/>}  allowableuser="freelancer" /> },
      {path:"/freelancer/addcourse",
      element: <Protected  component={<AddCourses/>}  allowableuser="freelancer" /> },
      {path:"freelancer/viewjob",
      element: <Protected  component={<Fullviewjob/>} allowableuser="freelancer"/> },
    {path: "/freelancer/postproject", element: <Protected  component={<PostProject/>} allowableuser="freelancer"/> },
    {path:"/freelancer/setprofile",
    element: <Protected  component={<SetupProfile/>}allowableuser="freelancer"/> },
    {path:"/freelancer/dashboard",
    element: <Protected  component={<FreelancerDashboard/>}allowableuser="freelancer"/> },
    {path:"/freelancer/proposalsubmission",
    element: <Protected  component={<ProposalSubmission/>}allowableuser="freelancer"/> },
    {path:"check",
    element: <Protected  component={<Check_/>}/> },
    {path:"/freelancer/community",
    element: <Protected  component={<Community/>}allowableuser="freelancer"/> },
    {path:"freelancer/home",
    element: <Home/> },






//For Client
    {path:"/product/:id",
    element: <Protected  component={<Complete_products/>} allowableuser="client"/>  },
    {path:"/client/explore-courses",
    element: <Protected  component={<Complete_home/>} allowableuser="client"/>  },
    {path:"/client/dashboard",
    element: <Protected  component={<ClientDashboard/>}allowableuser="client"/> },
    {path:"/client/postproject",
    element: <Protected  component={<PostProject/>}allowableuser="client"/> },
   

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

