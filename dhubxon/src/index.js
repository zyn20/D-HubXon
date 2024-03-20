

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import EditClientProfile from "./pages/ClientEditProfile";
import Root from "./Root";
import Community from "./community/pages/Community";
import reportWebVitals from "./reportWebVitals";
import FreelancerHome from "./pages/Home";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Fullviewjob from "./components/Freelancer/separate_components/Fullviewjob";
import ProposalSubmission from "./pages/ProposalSubmission";
import EditFreelancerProfile from "./pages/EditFreelancerProfile";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Forget_Pass from "./pages/Forget_Pass";
import PostProject from "./pages/PostProject";
import VerifyOTP from "./pages/VerifyOTP";
import VerifyOTP_forgetpassword from "./pages/VerifyOTP_ForgetPassword";
import Protected from "./components/Auth/Protected";
import GeneralProtected from "./components/Auth/GeneralProtected";
import ProductProvider from "./courses/src/contexts/ProductContext";
import SidebarProvider from "./courses/src/contexts/SidebarContext";
import CartProvider from "./courses/src/contexts/CartContext";
import ClientDashboard from "./pages/ClientDashboard";
import AddCourses from "./pages/AddCourses";
import SignupPage from "./pages/Signup";
import MainPage from "./pages/mainPage";
import Check_ from "./pages/Check_user";
import Complete_home from "./courses/src/complete_home";
import Complete_products from "./courses/src/complete_products";
import UpdatePassword from "./pages/UpdatePassword";
import ProductProvid from "./software_products/courses/src/contexts/ProductContext";
import SidebarProvid from "./software_products/courses/src/contexts/SidebarContext";
import CartProvid from "./software_products/courses/src/contexts/CartContext";
import MyJobs from './components/Freelancer/Myjobs';
import Chat from './pages/Chat'
import Progress from './pages/Progress';
import Software_home from "./software_products/courses/src/complete_home";
import Software_products from "./software_products/courses/src/complete_products";
import Coursecard from "./components/Freelancer/courses_cards/Cards_page"
import AddPost from "./pages/AddPost"
import CardPage from "./components/Freelancer/courses_cards/Cards_page";
import Checkout from "./courses/src/components/Checkout";
import MembersTable from "./components/Freelancer/courses_cards/PurchaseDetail";
import Pricing from "./pages/PricingHealth";
import PricingFreelance from "./pages/PricingFreelance";
import Proposal from "./pages/ProposalCard";
import TableComponent from "./pages/Allproposals";
import TableComponentOne from "./pages/Onproposal";

const currentUser = true;

const ProtectedRoute = ({ children }) => {
  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <MainPage />,
      },

      { path: "/homepage", element: <MainPage /> },//general Path
      { path: "login", element: <Login /> },//general Path
      { path: "signup", element: <SignupPage /> },//general Path
      { path: "/forgetPassword", element: <Forget_Pass /> },//general Path
      { path: "verify", element: <VerifyOTP /> },//general Path
      { path: "verify_forgetOTP", element: <VerifyOTP_forgetpassword /> }, //general Path
      { path: "/cart", element: <Checkout /> },

      
      //For Only One Time Accessable
      {
        path: "update_password",
        element: (
          <GeneralProtected
            component={<UpdatePassword />}
          />
        ),
      },

      
      
      // { path: "update_password", element: <UpdatePassword /> },
     

    {path:"/softwareproducts",
    element:<Software_home/>},
    {path:"/softwareproductsone/:id",
    element:<Software_products/>},
    {path:"/coursecard",
    element:<CardPage/>},
    {path:"/proposals",
    element:<Proposal/>},
    {path:"/allproposals",
    element:<TableComponent/>},
    {path:"/oneproposal",
    element:<TableComponentOne/>},



    {path:"/productstable",
    element:<MembersTable/>},
    

//////////////////////////////////////////////////For Freelancer/////////////////////////////////////////////////////////////////


{
  path: "freelancer/chat",
  element: (
    <Protected component={<Chat />} allowableuser="freelancer" />
  ),
},


{
  path: "freelancer/pricing-healthcare",
  element: (
    <Protected component={<Pricing />} allowableuser="freelancer" />
  ),
},


{
  path: "freelancer/pricing-freelance-services",
  element: (
    <Protected component={<PricingFreelance />} allowableuser="freelancer" />
  ),
},

{
  path: "/freelancer/viewcourses",
  element: (
    <Protected component={<AddCourses />} allowableuser="freelancer" />
  ),
},


{
  path: "/freelancer/set-profile",
  element: (
    <Protected component={<EditFreelancerProfile />} allowableuser="freelancer" />
  ),
},
   



{
  path: "/freelancer/courses",
  element: (
    <Protected component={<Coursecard />} allowableuser="freelancer" />
  ),
},
{
  path: "freelancer/viewjob",
  element: (
    <Protected component={<Fullviewjob />} allowableuser="freelancer" />
  ),
},
   
    
    {
      path: "/freelancer/",
      element: (
        <Protected
          component={<FreelancerDashboard />}
          allowableuser="freelancer"
        />
      ),
    },

    {
      path: "/freelancer/proposalsubmission",
      element: (
        <Protected
          component={<ProposalSubmission />}
          allowableuser="freelancer"
        />
      ),
    },

    {
      path: "/freelancer/community",
      element: (
        <Protected
          component={<Community IDENTIFIER="all"/>}
          allowableuser="freelancer"
        />
      ),
    },

    
{
  path: "/freelancer/community/myposts",
  element: (
    <Protected component={<Community  IDENTIFIER="one"/>} allowableuser="freelancer" />
  ),
},

    {
      path: "/freelancer/addpost",
      element: (
        <Protected
          component={<AddPost />}
          allowableuser="freelancer"
        />
      ),
    },

    {
      path: "freelancer/my-jobs",
      element: (
        <Protected
          component={<MyJobs />}
          allowableuser="freelancer"
        />
      ),
    },
    {
      path: "freelancer/search-jobs",
      element: (
        <Protected
          component={<Home />}
          allowableuser="freelancer"
        />
      ),
    },

   

   
/////////////////////////////////////////////////////////////////For Client/
{
  path: "/client/explore-courses",
  element: (
    <Protected component={<Complete_home />} allowableuser="client" />
  ),
},

{
  path: "/client/",
  element: (
    <Protected component={<ClientDashboard />} allowableuser="client" />
  ),
},
{
  path: "/client/postproject",
  element: (
    <Protected component={<PostProject />} allowableuser="client" />
  ),
} ,


{
  path: "/client/set-profile",
  element: (
    <Protected component={<EditClientProfile />} allowableuser="client" />
  ),
},
{
  path: "/client/chat",
  element: (
    <Protected component={<Chat />} allowableuser="client" />
  ),
},

{
  path: "/client/progress",
  element: (
    <Protected component={<Progress />} allowableuser="client" />
  ),
},
    
    {path:"/client/progress",
    element: <Progress/>},



      //For Client
      {
        path: "/product/:id",
        element: (
          <Protected component={<Complete_products />} allowableuser="client" />
        ),
      },
      {
        path: "/client/explore-courses",
        element: (
          <Protected component={<Complete_home />} allowableuser="client" />
        ),
      },
     
      
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

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
    
  
);
reportWebVitals();
