import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataOrder: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderProduct: (state, action) => {
      state.dataOrder = action.payload;
    },
    
    increaseQty: (state, action) => {
      const { itemId } = action.payload;
      const selectedItem = state.dataOrder.find((item) => item.id === itemId);
      if (selectedItem) {
        selectedItem.qty += 1;
      }
    },
    decreaseQty: (state, action) => {
      const { itemId } = action.payload;
      const selectedItem = state.dataOrder.find((item) => item.id === itemId);
      if (selectedItem && selectedItem.qty > 1) {
        selectedItem.qty -= 1;
      }
    },
    removeAllOrders: (state) => {
      state.dataOrder = [];
    },
    removeSelectedOrder: (state, action) => {
      const { itemId } = action.payload;
      state.dataOrder = state.dataOrder.filter((item) => item.id !== itemId);
    },
  },
});

export const {
  orderProduct,
  increaseQty,
  decreaseQty,
  removeAllOrders,
  removeSelectedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
