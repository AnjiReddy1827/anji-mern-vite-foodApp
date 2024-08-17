import React from "react";
import removeImage from "/assets/images/icon-remove-item.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AppDispatch } from "../redux/store";
import { fetchAdedCart, fetchTotalPrice } from "../redux/config";
import axios from "axios";
import { VITE_API_URL } from "../api";

const apiURL = VITE_API_URL;

// export interface CartItems {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// }
// interface AddedCartProps {
//   cartItems: CartItems[];
// }
export interface CartItem {
  id: string;
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const AddedCart: React.FC<any> = ({ cartItems }) => {
  const dispatch: AppDispatch = useDispatch();
  const { totalPrice } = useSelector((state: RootState) => state.cart);

  const handleDelete = async (items: CartItem) => {
    if (items.id === undefined || items.id === null) {
      console.error("Item ID is missing");
      return;
    }
    try {
      const response = await axios.delete(`${apiURL}/itemsDelete/${items.id}`);
      if (response) {
        dispatch(fetchAdedCart());
        dispatch(fetchTotalPrice());
      }
    } catch (error) {
      console.log(error, "delete error");
    }
  };

  return (
    <div>
      {cartItems.map((items: CartItem) => (
        <div
          key={items.id}
          className="flex flex-row justify-between items-center border-b border-solid border-gray-200 gap-2 mb-2"
        >
          <div className="flex flex-col gap-2 mb-2">
            <p className="text-xs font-bold text-black">{items.name}</p>
            <div className="flex flex-row gap-5">
              <p className="text-orange-400 text-xs font-bold font-sans">
                {items.quantity}x
              </p>
              <p className="text-xs font-bold font-sans text-chocolate">
                @ ${items.price.toFixed(2)}
              </p>
              <p className="text-xs font-bold font-sans text-chocolate">
                ${(items.price * items.quantity).toFixed(2)}
              </p>
            </div>
          </div>
          <img
            src={removeImage}
            onClick={() => handleDelete(items)}
            className="cursor-pointer w-4 h-4 border text-bold border-solid border-chocolate rounded-2xl text-chocolate p-1"
          />
        </div>
      ))}
      <div className="flex justify-between items-center">
        <p className="font-bold text-black text-xs">Order Total</p>
        <p className="font-bold text-black text-2xl">${totalPrice}</p>
      </div>
    </div>
  );
};
export default AddedCart;
