// import React, { useContext } from "react";
// import { Link } from "react-router-dom";

// import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";

// import { CartContext } from "../contexts/CartContext";

// const CartItem = ({ item }) => {
//   const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);
//   // destructure item
//   const { id, title, image, price, amount } = item;

//   return (
//     <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-blue-500">
//       <div className="w-full min-h-[150px] flex items-center gap-x-4">
//         {/* image */}
//         <Link to={`/product/${id}`}>
//           <img className="max-w-[80px]" src={image} alt="" />
//         </Link>
//         <div className="w-full flex flex-col">
//           {/* title and remove icon */}
//           <div className="flex justify-between mb-2">
//             {/* title */}
//             <Link
//               to={`/product/${id}`}
//               className="text-sm uppercase font-medium max-w-[240px] text-blue-500 hover:underline"
//             >
//               {title}
//             </Link>
//             {/* remove icon */}
//             <div
//               onClick={() => removeFromCart(id)}
//               className="text-xl cursor-pointer"
//             >
//               <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
//             </div>
//           </div>
//           <div className="flex gap-x-2 h-[36px] text-sm">
//             {/* quantity */}
//             <div className="flex flex-1 max-w-[100px] items-center h-full border text-blue-500 font-medium">
//               <div onClick={()=>decreaseAmount(id)} className="h-full flex-1 flex justify-center items-center cursor-pointer">
//                 <IoMdRemove />
//               </div>
//               <div className="h-full flex justify-center items-center px-2">
//                 {amount}
//               </div>
//               <div onClick={()=>increaseAmount(id)} className="h-full flex flex-1 justify-center items-center cursor-pointer">
//                 <IoMdAdd />
//               </div>
//             </div>
//             {/* item price */}
//             <div className="flex flex-1 justify-around items-center text-blue-500">
//               $ {price}
//             </div>
//             {/* final price */}
//             <div className="flex flex-1 justify-end items-center text-blue-500 font-medium">{`$ ${parseFloat(
//               price * amount
//             ).toFixed(2)}`}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartItem;



import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io"; // Keep only the close icon for removal functionality

import { CartContext } from "../contexts/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);
  // Destructure item
  const { id, title, image, price, amount } = item;

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-blue-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        {/* Image */}
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={image} alt={title} />
        </Link>
        <div className="w-full flex flex-col">
          {/* Title and remove icon */}
          <div className="flex justify-between mb-2">
            {/* Title */}
            <Link
              to={`/product/${id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-blue-500 hover:underline"
            >
              {title}
            </Link>
            {/* Remove icon */}
            <div
              onClick={() => removeFromCart(id)}
              className="text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            {/* Quantity display without the buttons */}
            <div className="flex items-center h-full text-blue-500 font-medium">
              <div className="px-2">
                Qty: {amount} {/* Display amount without modification options */}
              </div>
            </div>
            {/* Item price */}
            <div className="flex justify-around items-center text-blue-500">
              $ {price}
            </div>
            {/* Final price */}
            <div className="flex justify-end items-center text-blue-500 font-medium">
              {`$ ${parseFloat(price * amount).toFixed(2)}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
