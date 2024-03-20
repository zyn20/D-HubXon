import Header from "../components/Login_auth_Components/Header";
import Signup from "../components/Login_auth_Components/Signup";

export default function SignupPage(){
    return(
    
        
      <div className="bg-[#E1E1E1] h-screen flex flex-col justify-center items-center">
      <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-md max-w-md w-full">
        <Header
          heading="Join Our Community Today"
          paragraph=" Have an account?"
          linkName="Login"
          linkUrl="/login"
        />
        <Signup />
      </div>
    </div>
    )
}
