import { createSlice } from "@reduxjs/toolkit";

const CounterSlice = createSlice({
  name: "color",
  initialState: { value: 'green' },
  reducers: {
    change: (state) => {
      state.value = 'blue';
    }
  }
});

export const { change } = CounterSlice.actions;

export default CounterSlice.reducer;
