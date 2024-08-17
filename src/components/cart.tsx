import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import emptyCart from "../../public/assets/images/illustration-empty-cart.svg";
import { RootState } from "../redux/store";
import AddedCart from "./adedCart";
import DialogDemo from "./dilog";

const Cart:React.FC = () => {
  const [order, setOrder] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { addedCart, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    setOrder(totalPrice > 0 ? false : true);
  }, [totalPrice]);

  const handleConfirmOrderClick = () => {
    setShowModal(true); // Open the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal when needed
  };

  return (
    <div className="w-full mt-3 md:mt-0 md:w-80 h-full bg-white rounded-lg p-4 flex flex-col justify-between">
      <h2 className="text-orange-500 text-2xl font-bold">Your Cart (0)</h2>
      {order ? (
        <div className="flex flex-col items-center top-5">
          <img
            className="w-20 h-28 mt-4 mb-2"
            src={emptyCart}
            alt="Empty Cart"
          />
          <p className="text-xs text-chocolate font-bold">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          <AddedCart cartItems={addedCart} />
          <button
            className="mt-2 py-2 text-xs gap-1 text-white font-bold bg-orange-600 border border-solid border-chocolate rounded-3xl shadow-md"
            onClick={handleConfirmOrderClick}
          >
            Confirm Order
          </button>

          <DialogDemo show={showModal} onClose={handleCloseModal} />
        </>
      )}
    </div>
  );
};

export default Cart;
