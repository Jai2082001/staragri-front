import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import profileSlice from './profile-slice'

const store = configureStore({reducer: {profile: profileSlice.reducer, cart: cartSlice.reducer}})


export default store