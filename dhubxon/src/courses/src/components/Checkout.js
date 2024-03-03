
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../components/CartItem";
import { CartContext } from "../contexts/CartContext";
import Header from "./Header";
import Modal from "./Modal"; // Adjust the path as needed

const Checkout = () => {
  const { cart, clearCart, total } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Log ID and selected quantity of each product
    cart.forEach(item => {
      console.log(`ID: ${item.id}, Quantity: ${item.amount},Price: ${item.price}`);
    });
  
    // Extracting form data
    const { name, address, postalCode, creditCardNo } = event.target.elements;
  
    // Construct an array of items with their id and amount
    const items = cart.map(item => ({
      id: item.id,
      amount: item.amount,
      price:item.price,
    }));
  
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication is required to complete the purchase.');
      setIsModalOpen(false);
      return;
    }
  
    let requestBody = {
      name: name.value,
      address: address.value,
      postalCode: postalCode.value,
      creditCardNo: creditCardNo.value,
      total,
      items, // Include the items array in the request body
      token, // Include the token directly in the request body
    };
  
    // Sending the purchase request
    try {
      const response = await fetch('http://127.0.0.1:5000/client/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Purchase successful:', data);
      alert('Purchase successful!');
      clearCart();
      setIsModalOpen(false); // Close the modal upon successful purchase
      window.location.reload();
    } catch (error) {
      console.error('Error making purchase:', error);
      alert('An error occurred during the purchase.');
    }
  };
  


  return (
    <>
      <Header />
      <div className="container mx-auto py-20 ">
        {/* Your existing code */}
        <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
      <div className="mb-4">
        {cart.length > 0 ? (
          cart.map((item) => <CartItem item={item} key={item.id} />)
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <button onClick={clearCart} className="flex items-center gap-2 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-150 ease-in-out">
            <FiTrash2 className="text-xl" />
            Clear Cart
          </button>
        </div>
        <div className="font-semibold text-xl">
          Subtotal: ${parseFloat(total).toFixed(2)}
        </div>
      </div>
        <div className="mt-6">
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-primary flex justify-center items-center text-white p-3 rounded w-full max-w-sm mx-auto font-medium hover:bg-primary-dark transition duration-150 ease-in-out"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h2 className="text-lg font-semibold">Payment Information</h2>
      <input name="name" type="text" placeholder="Name" className="border p-2" required />
      <input name="address" type="text" placeholder="Address" className="border p-2" required />
      <input name="creditCardNo" type="text" placeholder="Credit Card Number" className="border p-2" required />
      <input name="postalCode" type="text" placeholder="Postal Code" className="border p-2" required />
      <div className="font-semibold text-xl">Total: ${parseFloat(total).toFixed(2)}</div>
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition duration-150 ease-in-out"
      >
        Submit Payment
      </button>
    </form>
      </Modal>
    </>
  );
};

export default Checkout;
