import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingBook = state.find((book) => book.id === action.payload.id);
      if (existingBook) {
        existingBook.quantity += 1; // Increment quantity if book already exists
      } else {
        state.push({ ...action.payload, quantity: 1 }); // Add with quantity 1
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((book) => book.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1); // Remove book from cart
      }
    },
    decreaseQuantity: (state, action) => {
      const existingBook = state.find((book) => book.id === action.payload);
      if (existingBook) {
        if (existingBook.quantity > 1) {
          existingBook.quantity -= 1; // Decrease quantity
        } else {
          return state.filter((book) => book.id !== action.payload); // Remove if quantity is 1
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity } = CartSlice.actions;
export default CartSlice.reducer;
