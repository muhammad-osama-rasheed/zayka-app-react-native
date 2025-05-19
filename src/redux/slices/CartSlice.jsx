import {createSlice} from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    deleteFromCart: (state, action) => {
      return state.filter(state => state._id !== action.payload._id);
    },
    increamentQuantity: (state, action) => {
      state = state.map(item => {
        if (item._id === action.payload._id) {
          item.quantity++;
        }
        return item;
      });
    },
    decreamentQuantity: (state, action) => {
      state = state.map(item => {
        if (item.quantity !== 1) {
          if (item._id === action.payload._id) {
            item.quantity--;
          }
        }
        return item;
      });
    },
    clearCart: state => {
      return [];
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  clearCart,
  increamentQuantity,
  decreamentQuantity,
} = CartSlice.actions;
export default CartSlice.reducer;
