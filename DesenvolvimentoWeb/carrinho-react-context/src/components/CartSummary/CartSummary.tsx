import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import './styles.css';

export const CartSummary = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('CartSummary deve ser usado dentro de um CartProvider');
  }

  const { totalItems } = context;

  return (
    <div className="cart-summary">
      <span>Carrinho ({totalItems})</span>
    </div>
  );
};