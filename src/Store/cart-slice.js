import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { carts: false },
    reducers: {
        addProducts(state, action) {
            let array = state.carts;
            console.log(array);
            
            if(!array){
                let flag = 0;
                if(!array){
                    let array2 = []
                    array2.push({product: action.payload.product, quantity: action.payload.quantity});
                    state.carts = array2                    
                }
            }else{
                console.log("we are here")
                let flag = 0;
                let array2 = state.carts;
                console.log(action.payload)
                for(let i=0;i<array2.length;i++){
                    if(flag){
                        break
                    }
                    if(array2[i].product._id === action.payload.product._id){
                        // array2.push({products: action.payload})
                        array2[i].quantity = array2[i].quantity + action.payload.quantity;
                        flag++;
                    }
                }
                if(flag === 0){
                    array2.push({product: action.payload.product, quantity: action.payload.quantity});
                }
            }
        } , 
        deleteProducts(state, action) {
            console.log(state)
            let arraySample = state.carts.filter((item) => {
                return item._id !== action.payload._id
            })    
            state.carts = arraySample
        },
        changeProducts(state, action) {
            state.carts = action.payload
        }
        
    }
    })

export const cartActions = cartSlice.actions;

export default cartSlice;