import React from "react";
import { useDispatch, useSelector } from "react-redux";
import increase from "../../public/assets/images/icon-increment-quantity.svg";
import decrease from "../../public/assets/images/icon-decrement-quantity.svg";
import cartImg from "../../public/assets/images/icon-add-to-cart.svg";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchAdedCart,
  fetchTotalPrice,
} from "../redux/config";
import axios from "axios";

// Define the Item interface
export interface Item {
  _id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}
interface ProductListProps {
  dataItems: Item[];
}

const ProductList: React.FC<ProductListProps> = ({ dataItems }) => {
  console.log(decrease, "uu");
  const dispatch: AppDispatch = useDispatch();
  const {  addedCart } = useSelector(
    (state: RootState) => state.cart
  );
  const apiURL = import.meta.env.VITE_API_URL;

  const handleAddCart = async (item: Item) => {
    if (item._id === undefined || item._id === null) {
      console.error("Item ID is missing");
      return;
    }
    const cartItem = {
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: 1,
    };
    try {
      const response = await axios.post(`${apiURL}/addToCart`, cartItem);
      if (response) {
        dispatch(fetchAdedCart());
        dispatch(fetchTotalPrice());
      }
    } catch (error) {
      console.error("Error post data:", error);
    }
  };

  const handleQuantityChange = async (item: Item, increase: boolean) => {
    const id = item._id;
    const cartItem = addedCart.find((cartItem) => cartItem.id === id);

    if (!cartItem) return;

    const newQuantity = increase
      ? cartItem.quantity + 1
      : Math.max(cartItem.quantity - 1, 0);

    const updatedItem = {
      quantity: newQuantity,
    };

    try {
      const response = await axios.put(
        `${apiURL}/updateQuantity/${id}`,
        updatedItem
      );

      if (response.status === 200) {
        dispatch(fetchAdedCart());
        dispatch(fetchTotalPrice());
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get<Item[]>(`${apiURL}/items`);
  //       setDataItems(response.data);
  //       dispatch(fetchAdedCart());
  //       dispatch(fetchTotalPrice());
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [apiURL]);

  return (
    <div className="grid gap-16 grid-rows-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {dataItems.map((item) => {
        const cartItem = addedCart.find((cartItem) => cartItem.id === item._id);
        const quantity = cartItem ? cartItem.quantity : 0;

        return (
          <div className="flex flex-col items-start w-full" key={item._id}>
            <div className="relative w-40 h-40">
              <img
                className="w-full h-full rounded-2xl object-cover"
                src={item.image}
                alt={item.name}
              />
              {quantity > 0 ? (
                <button className="flex items-center text-xs gap-1 font-bold absolute bottom-[-18px] left-5 px-4 py-2 bg-orange-600 border border-solid border-chocolate rounded-3xl shadow-md">
                  <img
                    className="h-2 w-2 text-red cursor-pointer"
                    src={decrease}
                    onClick={() => handleQuantityChange(item, false)}
                    alt="Decrease"
                  />
                  <p className="px-4">{quantity}</p>
                  <img
                    className="h-2 w-2 text-red cursor-pointer"
                    src={increase}
                    onClick={() => handleQuantityChange(item, true)}
                    alt="Increase"
                  />
                </button>
              ) : (
                <button
                  onClick={() => handleAddCart(item)}
                  className="flex items-center text-xs gap-1 font-bold absolute bottom-[-18px] left-3 px-4 py-2 bg-white border border-solid border-chocolate rounded-3xl shadow-md"
                >
                  <img className="h-4 w-4" alt="Add to cart" src={cartImg} />
                  Add to cart
                </button>
              )}
            </div>
            <div className="flex items-start flex-col mt-7">
              <p className="text-gray-300 font-sans font-semibold text-xs">
                {item.category}
              </p>
              <p className="text-white font-sans font-bold text-sm">
                {item.name}
              </p>
              <p className="text-orange-600 font-sans font-bold text-sm">
                $ {item.price}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
