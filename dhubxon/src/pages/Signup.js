import Header from "../components/Login_auth_Components/Header";
import Signup from "../components/Login_auth_Components/Signup";

export default function SignupPage(){
    return(
    
        
      <div className="bg-blue-100 h-screen flex flex-col justify-center items-center">
      <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-md max-w-md w-full">
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet?"
          linkName="Signup"
          linkUrl="/signup"
        />
        <Signup />
      </div>
    </div>
    )
}
