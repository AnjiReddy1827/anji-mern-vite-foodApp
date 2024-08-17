import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
export interface AddedCart {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
type TotalPrice = any;
export interface CartState {
  addedCart: AddedCart[];
  items: CartItem[];
  totalPrice: TotalPrice;
  loading: boolean;
  error: string | null;
}
const initialState: CartState = {
  addedCart: [],
  items: [],
  totalPrice: 0,
  loading: false,
  error: null,
};

export const fetchAdedCart = createAsyncThunk(
  "addToCart/fetchItems",
  async () => {
    const response = await axios.get<AddedCart[]>(`${apiURL}/cartItems`);
    return response.data;
  }
);
export const fetchTotalPrice = createAsyncThunk(
  "totalPrice/fetchItems",
  async () => {
    const response = await axios.get<TotalPrice>(`${apiURL}/totalPrice`);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      console.log(item, "pp");
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    removeItem: (state, action: PayloadAction<any>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdedCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAdedCart.fulfilled,
        (state, action: PayloadAction<AddedCart[]>) => {
          state.addedCart = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAdedCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart items";
      })
      .addCase(fetchTotalPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTotalPrice.fulfilled, (state, action) => {
        state.totalPrice = action.payload.totalPrice;
        state.loading = false;
      })
      .addCase(fetchTotalPrice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart items";
      });
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
