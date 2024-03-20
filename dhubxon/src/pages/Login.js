import Header from "../components/Login_auth_Components/Header";
import Login from "../components/Login_auth_Components/Login";
import Layout from '../Root'

export default function LoginPage() {
  return (

    <div className="bg-[#E1E1E1] h-screen flex flex-col justify-center items-center">
      <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-md max-w-md w-full">
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet?"
          linkName="Signup"
          linkUrl="/signup"
        />
        <Login />
      </div>
    </div>

  );
}


