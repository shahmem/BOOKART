import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../Slice/CartSlice';
import booksReducer from '../Slice/BookSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
    // user: userReducer,
  }
});

export default store;