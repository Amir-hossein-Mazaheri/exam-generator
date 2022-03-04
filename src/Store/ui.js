import { createSlice } from "@reduxjs/toolkit";

const ui = createSlice({
  name: "ui",
  initialState: {
    modalVisibility: false,
    isModalLoading: false,
  },
  reducers: {
    SHOW_MODAL: (store, action) => {
      store.modalVisibility = true;
    },
    HIDE_MODAL: (store, action) => {
      store.modalVisibility = false;
    },
    TOGGLE_MODAL_LOADING: (store, action) => {
      store.isModalLoading = action.payload.status;
    },
  },
});

export default ui.reducer;

export const { SHOW_MODAL, HIDE_MODAL, TOGGLE_MODAL_LOADING } = ui.actions;
