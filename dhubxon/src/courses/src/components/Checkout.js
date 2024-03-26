import React, { useContext, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../components/CartItem";
import { CartContext } from "../contexts/CartContext";
import Header from "./Header";
import Modal from "./Modal";
import Swal from 'sweetalert2';

const Checkout = () => {
  const { cart, clearCart, total } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate credit card number
    const creditCardNo = event.target.elements.creditCardNo.value;
    if (!isValidCreditCard(creditCardNo)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Credit Card Number',
        text: 'Please enter a valid credit card number.',
      });
      return;
    }

    // Validate name
    const name = event.target.elements.name.value.trim();
    if (!isValidName(name)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Name',
        text: 'Please enter a valid name with at least 4 characters and no symbols.',
      });
      return;
    }

    // Extracting form data
    const { address, postalCode } = event.target.elements;

    // Construct an array of items with their id, amount, and price
    const items = cart.map(item => ({
      id: item.id,
      amount: item.amount,
      price: item.price,
    }));

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'Authentication is required to complete the purchase.',
      });
      setIsModalOpen(false);
      return;
    }

    let requestBody = {
      name,
      address: address.value,
      postalCode: postalCode.value,
      creditCardNo,
      total,
      items,
      token,
    };

    // Show loading screen
    Swal.fire({
      title: 'Processing your purchase...',
      html: 'Please wait',
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

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
      Swal.close(); // Close the loading screen
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Purchase has been successful",
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          clearCart();
          setIsModalOpen(false);
          window.location.reload();
        }
      });
    } catch (error) {
      console.error('Error making purchase:', error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  };

  // Function to validate credit card number using regex
  const isValidCreditCard = (creditCardNo) => {
    const regex = /^[0-9]{16}$/;
    return regex.test(creditCardNo);
  };

  // Function to validate name using regex
  const isValidName = (name) => {
    const regex = /^[A-Za-z\s]{4,}$/;
    return regex.test(name);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-20 ">
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
