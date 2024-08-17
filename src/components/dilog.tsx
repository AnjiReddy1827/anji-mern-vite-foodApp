import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { AppDispatch } from "../redux/store";
import { fetchAdedCart, fetchTotalPrice } from "../redux/config";

interface DialogDemoProps {
  show: boolean; // Show state to control the visibility of the modal
  onClose: () => void;
}

const DialogDemo: React.FC<DialogDemoProps> = ({ show, onClose }) => {
  const apiURL = import.meta.env.VITE_API_URL;
  const { addedCart, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch: AppDispatch = useDispatch();

  const handleNewOrder = async () => {
    onClose();
    const response = await axios.delete(`${apiURL}/deleteAllItems`);
    if (response.status === 200) {
      dispatch(fetchAdedCart());
      dispatch(fetchTotalPrice());
    }
  };
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body className=" bg-gray-400 flex flex-col">
        <h2 className="text-2xl font-bold text-black">Order Confirmed</h2>
        <label className="text-xs text-gray-800">
          We hope you enjoy your food!
        </label>
        <div className="bg-orange-200 p-3">
          {addedCart.map((items: any) => (
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
                </div>
              </div>
              <p className="text-xs font-bold font-sans text-black">
                $ {(items.price * items.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <p className="font-bold text-black text-xs">Order Total</p>
            <p className="font-bold text-black text-2xl">${totalPrice}</p>
          </div>
        </div>
        <Button
          className="mt-2 py-2 text-xs gap-1 text-white font-bold bg-orange-600 border border-solid border-chocolate rounded-3xl shadow-md"
          onClick={handleNewOrder}
        >
          Start New Order
        </Button>
      </Modal.Body>
      {/* <Button variant="secondary" onClick={onClose}>
          Close
        </Button> */}
    </Modal>
  );
};

export default DialogDemo;
