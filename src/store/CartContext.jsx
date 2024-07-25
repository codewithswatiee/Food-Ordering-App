// Context allows us to spread data into all the other components thats needed
import { createContext, useReducer } from "react";
// The code below alone is not about managing state or changing any values or trigring any update, instead it's just about spreading data to components
const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {}
}); 

// Reducer Function
function cartReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        // update the state to add item
        // state.item.push(action.item); This is not a good idea as you should never mutate the existing state because push make changes to the existing array which is stored in the memory and so it will change the state value before the cartReducer is done executing.


        const existingCartItemIndex  = state.items.findIndex((item) => {
            return item.id === action.item.id;
        });
        const updatedItems = [...state.items];
        if(existingCartItemIndex > -1){
            // if the item is already in the cart, then we need to update the quantity
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;

        } else{
            // if the item is not in the cart, then we need to add it to the cart
            updatedItems.push({...action.item, quantity: 1});
        }
        return {...state, items: updatedItems};
    }

    if(action.type === 'REMOVE_ITEM'){
        // remove an item from the state

        const existingCartItemIndex  = state.items.findIndex((item) => {
            return item.id === action.id;
        });

        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];
        if(existingCartItem.quantity === 1){
            
            updatedItems.splice(existingCartItemIndex, 1);
        } else{
            const updatedItem  = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {...state, items: updatedItems};
    }

    return state;
}

// this function is wrapped around other components to make this context availabe to them and which will make them do the actual data and state management.
// This function makes that data stateful
export function CartContextProvider({children}) {
    // mention here how your state should look like!
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: []}); 
    function addItem(item){
        dispatchCartAction({
            type: 'ADD_ITEM',
            item,
        })
    };

    function removeItem(id){
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id,
        })
    }

    const CartContext = {
        items: cart.items,
        addItem,
        removeItem,
    };

    return(
        // This bellow component gives access to all the properties inside the context.
        <CartContext.Provider value={CartContext}>{children}</CartContext.Provider>

    )
}

export default CartContext;

