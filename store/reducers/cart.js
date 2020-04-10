import { ADD_TO_CART, REMOVE_FROM_CART, ADD_ORDER, DELETE_PRODUCT } from '../actions/types';

import CartItem from "../../models/cart-item";

const initialState ={
    items: {},
    totalAmount: 0   
};

export default (state=initialState, action) =>{
    switch (action.type) {
        case ADD_TO_CART:
            const addedProd = action.product;
            const prodPrice = addedProd.price;
            const prodTitle = addedProd.title;
            let updatedORnewCartItem;

            if(state.items[addedProd.id]){
                //already have the item in the cart
                updatedORnewCartItem = new CartItem(
                    state.items[addedProd.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProd.id].sum + prodPrice
                );
            }else{
                updatedORnewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
            }
            return{ 
                ...state, 
                items:{ ...state.items, [addedProd.id] : updatedORnewCartItem},
                totalAmount: state.totalAmount + prodPrice
            };  
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;
            if(currentQty > 1){
                // need to reduce it , not erase it
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                updatedCartItems ={...state.items, [action.pid]: updatedCartItem};
            }else{
                updatedCartItems ={...state.items};
                delete updatedCartItems[action.pid];
            }
            return{
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            };
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if(!state.items[action.pid]){
                return state;
            }
            const updatedItems = {...state.items};
            const itemTotal = state.items[action.pid].sum;
            delete updatedItems[action.pid]
            return{
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
        default:
            return state;
    }
}