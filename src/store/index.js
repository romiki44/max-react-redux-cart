import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './cart-slice';
import uiSliceReducer from './ui-slice';

const store = configureStore({
  reducer: { ui: uiSliceReducer, cart: cartSliceReducer },
});

export default store;
