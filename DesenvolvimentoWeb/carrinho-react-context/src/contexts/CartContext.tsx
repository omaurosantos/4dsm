import React, { createContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '../types';

// --- Tipos para o Contexto e Reducer ---
type CartState = {
  cartItems: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'ADJUST_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType extends CartState {
  addItemToCart: (product: Product) => void;
  removeItemFromCart: (id: number) => void;
  adjustQuantity: (id: number, quantity: number) => void;
  totalItems: number;
  cartTotal: number;
}

// --- Criação do Contexto ---
export const CartContext = createContext<CartContextType | undefined>(undefined);

// --- Reducer para gerenciar o estado do carrinho ---
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, cartItems: action.payload };

    case 'ADD_ITEM': {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
      };
    }

    case 'ADJUST_QUANTITY': {
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ).filter(item => item.quantity > 0), // Remove se a quantidade for 0
      };
    }

    default:
      return state;
  }
};

// --- Provedor do Contexto ---
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

  // Carregar do localStorage na inicialização
  useEffect(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(storedCart) });
    }
  }, []);

  // Salvar no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addItemToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItemFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const adjustQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'ADJUST_QUANTITY', payload: { id, quantity } });
  };

  const totalItems = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    cartItems: state.cartItems,
    addItemToCart,
    removeItemFromCart,
    adjustQuantity,
    totalItems,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};