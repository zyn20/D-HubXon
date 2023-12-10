import { Navigate } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EditClientProfile from './pages/ClientEditProfile';
import CardPage from './components/Freelancer/courses_cards/Cards_page';
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
import ProductProvid from "./software_products/courses/src/contexts/ProductContext";
import SidebarProvid from "./software_products/courses/src/contexts/SidebarContext";
import CartProvid from "./software_products/courses/src/contexts/CartContext";

import ClientDashboard from './pages/ClientDashboard';
import AddCourses from "./pages/AddCourses"
import SignupPage from './pages/Signup';
import MainPage from './pages/mainPage';
import Check_ from './pages/Check_user';
import Complete_home from "./courses/src/complete_home";
import Complete_products from "./courses/src/complete_products";
import MyJobs from './components/Freelancer/Myjobs';
import Chat from './pages/Chat'
import Progress from './pages/Progress';
import Software_home from "./software_products/courses/src/complete_home";
import Software_products from "./software_products/courses/src/complete_products";

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
    // {path:"login",
    // {path:"/course_card",
    // element:<CardPage/>},
    {path:"/softwareproducts",
    element:<Software_home/>},
    {path:"/softwareproductsone/:id",
    element:<Software_products/>},
    {path:"/product/:id",
    element:<Complete_products/>},
    {path:"/postproject",
    element:<PostProject/>},
    {path:"setprofile",
    element:<SetupProfile/>},
    {path:"dash",
    element:<FreelancerDashboard/>},
    {path:"/login",
    element:<Login/>},
    {path:"signup",
    element:<SignupPage/>},

    
    {path:"freelancer/chat",
    element:<Chat/>},
    
    

//For Freelancer
{path:"/freelancer/set-profile",
element: <EditProfile/>},
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






//For Client/
    {path:"/product/:id",
    element: <Complete_products/> },
    {path:"/client/explore-courses",
    element: <Complete_home/>  },
    {path:"/client/",
    element: <ClientDashboard/> },
    {path:"/client/postproject",
    element: <PostProject/>},
    ,
    {path:"/client/set-profile",
    element: <EditClientProfile/>},
    ,
    {path:"/client/chat",
    element: <Chat/>},
    ,
    {path:"/client/progress",
    element: <Progress/>},
   
    {path:"freealancer/home",
    element: <Complete_home/>},

    ]
  }
])








const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductProvider>
    <ProductProvid>
      <SidebarProvider>
      <SidebarProvid>
        <CartProvider>
        <CartProvid>
          <RouterProvider router={router}>
            <Root />
          </RouterProvider>
          </CartProvid>
        </CartProvider>
        </SidebarProvid>
      </SidebarProvider>
      </ProductProvid>
    </ProductProvider>
    
  </React.StrictMode>
);
reportWebVitals();

