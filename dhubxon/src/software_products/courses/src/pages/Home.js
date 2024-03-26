import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
// import { ProductContext } from "../../../../courses/src/contexts/ProductContext";
import Product from '../components/Product'
import Hero from '../components/Hero'



const Home = () => {
  // get products from product context
  const { products } = useContext(ProductContext);

  console.log(products);

  // get only men's and women's clothing category
  const filteredProducts = products.filter((item) => {
    return (
      item.category === "Graphics Designing" || item.category === "Web Development" || item.category === "Digital Marketing" || item.category === "AI" || item.category === "UML" || item.category === "Writing"
    );
  });

  return (
    <div>
      <Hero />
      <section className="py-20">
        <div className="container mx-auto">
         


        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center text-blue-500">
  Diverse Learning Experiences
  <br />
  Crafted by Expert Freelancers
</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.map((product) => {
              return (
                <Product product={product} key={product.id}/>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
