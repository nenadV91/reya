import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import orderData from "./data.json";

export type Order = {
  id: number;
  market: string;
  pool: string;
  action: string;
  orderType: string;
  size: number;
  executionPrice: number;
  rpnl: number;
  fees: number;
  time: number;
};

const initialState = orderData as Order[];

export const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    loadOrders: (state, action: PayloadAction<Order[]>) => {
      return action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.push(action.payload);
      return state;
    },
    removeOrder: (state, action: PayloadAction<Order>) => {
      return state.filter((o) => o.id !== action.payload.id);
    },
    reset: () => initialState,
  },
});

export const { loadOrders, addOrder, removeOrder, reset } = orders.actions;
export default orders.reducer;
