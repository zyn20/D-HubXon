import Home from "./pages/Home";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Complete_home = () => {
    return (
      <div className="overflow-hidden">
      {/* <Header /> */}
              <Home />
          <Sidebar />
          
        
      </div>
    );
  };
  
  export default Complete_home;
  