import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: {
    isOpen: false,
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    open: (state) => {
      state.menu.isOpen = true;
    },
    close: (state) => {
      state.menu.isOpen = false;
    },
    toggle: (state) => {
      state.menu.isOpen = !state.menu.isOpen;
    },
  },
});

export const { open, close, toggle } = uiSlice.actions;

export const selectMenuState = (store) => store.ui.menu.isOpen;

export default uiSlice.reducer;
