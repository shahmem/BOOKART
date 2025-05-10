import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "AIzaSyAZeCJXokas2EqiZyXEQIU_zSgIKl4qkl0";
// Async thunk for fetching books

const BookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    category: "",
    searchTerm: "",
    sortOrder: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ category, searchTerm, sortOrder }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=${API_KEY}&maxResults=40&startIndex=0`
      );
      let books = response.data.items;
      // console.log(books);

      if (searchTerm) {
        books = books.filter((book) =>
          book.volumeInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (sortOrder === "priceLowHigh") {
        books.sort(
          (a, b) =>
            (a.saleInfo?.listPrice?.amount || 999) -
            (b.saleInfo?.listPrice?.amount || 999)
        );
      } else if (sortOrder === "priceHighLow") {
        books.sort(
          (a, b) =>
            (b.saleInfo?.listPrice?.amount || 0) -
            (a.saleInfo?.listPrice?.amount || 0)
        );
      } else if (sortOrder === "newest") {
        books.sort(
          (a, b) =>
            new Date(b.volumeInfo.publishedDate) -
            new Date(a.volumeInfo.publishedDate)
        );
      }

      return books || [];
    } catch (error) {
      return rejectWithValue("Failed to fetch books. Please try again.");
    }
  }
);

export default BookSlice.reducer;
