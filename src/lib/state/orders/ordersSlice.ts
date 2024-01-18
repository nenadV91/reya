import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Order = {
  id: number;
  market: string;
  action: string;
  orderType: string;
  size: number;
  executionPrice: number;
  rpnl: number;
  fees: number;
  time: number;
};

const initialState = [] as Order[];

export const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {
    loadOrders: (state, action: PayloadAction<Order[]>) => {
      state = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.push(action.payload);
    },
    removeOrder: (state, action: PayloadAction<Order>) => {
      state = state.filter((o) => o.id !== action.payload.id);
    },
    reset: () => initialState,
  },
});

export const { loadOrders, addOrder, removeOrder, reset } = orders.actions;
export default orders.reducer;
