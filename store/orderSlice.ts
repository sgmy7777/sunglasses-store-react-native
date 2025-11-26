import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<{ items: CartItem[]; total: number; paymentMethod: string }>) => {
      const newOrder: Order = {
        id: Date.now().toString(),
        items: action.payload.items,
        total: action.payload.total,
        paymentMethod: action.payload.paymentMethod,
        status: 'pending',
          createdAt: new Date().toISOString(),
      };
      state.orders.push(newOrder);
      state.currentOrder = newOrder;
    },
    completeOrder: (state, action: PayloadAction<string>) => {
      const order = state.orders.find(o => o.id === action.payload);
      if (order) {
        order.status = 'completed';
        state.currentOrder = order;
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const { createOrder, completeOrder, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
