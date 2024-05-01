import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";

const Complete_products = () => {
    return (
      <div className="overflow-hidden">
       <Header />
       <Sidebar />
       
                     <ProductDetails />
                     {/* <Footer />    */}
      </div>
    );
  };
  
  export default Complete_products;
  