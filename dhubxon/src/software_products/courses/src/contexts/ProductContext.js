import React, { createContext, useState, useEffect } from "react";
import logo from "../img/pngwing.com (1).png";
import logo2 from "../img/matlab.png";
import logo3 from "../img/camastasia.png";
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const data = [
    {
      id: 1,
      title: "Adobe Photoshop",
      category: "Design and Multimedia",
      description: "Adobe Photoshop is a powerful graphic editing software known for its extensive features, allowing users to manipulate and enhance images and create stunning visual designs with precision and creativity.",
      price: 8.95,
      rating: { rate: 3.9, count: 120 },
      image: logo,
    },
    // Add more products as needed
    {
      id: 2,
      title: "Matlab",
      category: "Data Analysis",
      description: "Data analysis is the process of examining, cleaning, transforming, and interpreting data to extract meaningful insights, patterns, and trends, aiding informed decision-making.",
      price: 59.99,
      rating: { rate: 4.5, count: 80 },
      image: logo2,
    },
    {
      id: 3,
      title: "Camtasia:",
      category: "Video editing",
      description: "It is commonly used for capturing screen recordings, creating video tutorials, and editing videos.",
      price: 79.95,
      rating: { rate: 4.2, count: 150 },
      image: logo3,
    },
  ];





  // products state
  const [products, setProducts] = useState([]);
  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      // const response = await fetch("https://fakestoreapi.com/products");
      // const data = await response.json();
     
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
