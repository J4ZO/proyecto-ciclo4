import { createContext, useReducer } from 'react';

export const Store = createContext(); // Crea el contexto de react, para no usar redux

const initialState = { // Se inicializa el carrito de compras
    cart: {
        cartItems: [],
    },
};
function reducer(state, action) { // Se utliza un hook reduce
    switch (action.type) {
        case 'CART_ADD_ITEM':
            // En caso de que se añada un item al carro
            return {
                ...state,
                cart: {
                    ...state.cart, // Cambia su estado
                    cartItems: [...state.cart.cartItems, action.payload],
                },
            };
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch }; // El dispacth recibe y envía un objeto que describe los cambios que queremos hacer
    return <Store.Provider value={value}>{props.children} </Store.Provider>; // permite que los componentes que lo consumen se suscriban a los cambios del contexto
}