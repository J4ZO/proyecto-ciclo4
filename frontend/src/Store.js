import { createContext, useReducer } from 'react';

export const Store = createContext(); // Crea el contexto de react, para no usar redux

const initialState = { // Se inicializa el carrito de compras
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    cart: {
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        cartItems: localStorage.getItem('cartItems') // Verifica si exiten elementos
            ? JSON.parse(localStorage.getItem('cartItems')) // si es asi los guarda
            : [],
    },
};
function reducer(state, action) { // Se utiliza un hook reduce
    switch (action.type) {
        case 'CART_ADD_ITEM':
            // En caso de que se añada un item al carro
            const newItem = action.payload; // Es el itema a añadir
            const existItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            ); // Verifica si el item existe
            const cartItems = existItem // Si existe, revisa si ya esta en el carro
                ? state.cart.cartItems.map((item) =>
                    item._id === existItem._id ? newItem : item
                ) // Actualiza el item que se tiene con el nuevo item
                : [...state.cart.cartItems, newItem]; // Añade el nuevo item al final del array
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Guarda los elementos para que no se borren con la recarga
            return { ...state, cart: { ...state.cart, cartItems } }; // Actualiza el carrito en base a cartItems
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id
            );
            localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Guarda los elementos para que no se borren con la recarga
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case 'USER_SIGNIN':
            return { ...state, userInfo: action.payload };
        case 'USER_SIGNOUT':
            return {
                ...state,
                userInfo: null,
                cart: {
                    cartItems: [],
                    shippingAddress: {},
                },
            };
        case 'SAVE_SHIPPING_ADDRESS':
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: action.payload,
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