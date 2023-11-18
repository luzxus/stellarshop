import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { CartItem } from '../components/Cart/Cart'

// Define a type for the slice state
interface CartState {
  products: CartItem[]
}

// Define the initial state using that type
const initialState: CartState = {
  products: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity += action.payload.quantity
      } else {
        state.products.push(action.payload)
      }
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload,
      )
    },
    resetCart: (state) => {
      state.products = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cartState.products

export default cartSlice.reducer
