import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,  // Initialize total price to 0
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id && item.uniqueId === newItem.uniqueId);

      if (existingItem) {
        existingItem.quantity += 1;  // Increase quantity if the item already exists in the cart
      } else {
        state.items.push({ ...newItem, quantity: 1 });  // Add new item if not already in the cart
      }

      // Update total price (rounding to two decimal places)
      state.totalPrice = Math.round((state.totalPrice + newItem.price) * 100) / 100;
    },
    removeSingleItem: (state, action) => {
      const { id, uniqueId } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id && item.uniqueId === uniqueId);

      if (itemIndex !== -1) {
        const itemToRemove = state.items[itemIndex];
        state.totalPrice = Math.round((state.totalPrice - itemToRemove.price * itemToRemove.quantity) * 100) / 100;
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    updateItemQuantity: (state, action) => {
      const { id, uniqueId, newQuantity } = action.payload;
      const item = state.items.find(item => item.id === id && item.uniqueId === uniqueId);

      if (item) {
        // Update total price based on quantity change, rounding to two decimal places
        state.totalPrice = Math.round((state.totalPrice + (newQuantity - item.quantity) * item.price) * 100) / 100;
        item.quantity = newQuantity;
      }
    },
  },
});

export const { addToCart, removeSingleItem, clearCart, updateItemQuantity } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
