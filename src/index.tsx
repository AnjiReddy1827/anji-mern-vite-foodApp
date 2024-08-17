import React, { useState, useEffect } from "react";
import ProductList from "./components/productList";
import Cart from "./components/cart";
import LoadingAnimation from "./components/loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { fetchAdedCart, fetchTotalPrice } from "./redux/config";
import { AppDispatch } from "./redux/store";
import axios from "axios";
import { Item } from "./components/productList";
import { VITE_API_URL } from "./api";

const apiURL = VITE_API_URL;

const Products: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dataItems, setDataItems] = useState<Item[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const { loading: cartLoading } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/items`);
        setDataItems(response.data);
        dispatch(fetchAdedCart());
        dispatch(fetchTotalPrice());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="bg-black p-8 flex justify-evenly flex-col md:flex-row">
      {loading || cartLoading ? (
        <div className="h-screen flex items-center justify-center">
          <LoadingAnimation />
        </div>
      ) : (
        <>
          <div className="flex items-center md:items-start flex-col">
            <h2 className="text-3xl text-white font-extrabold flex flex-col items-start mb-5">
              Desserts
            </h2>
            <ProductList dataItems={dataItems} />
          </div>
          <Cart />
        </>
      )}
    </div>
  );
};

export default Products;
