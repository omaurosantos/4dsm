import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import './styles.css';

export const CartPage = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('CartPage deve ser usado dentro de um CartProvider');
  }

  const { cartItems, removeItemFromCart, adjustQuantity, cartTotal } = context;

  return (
    <div className="cart-page-container">
      <h2>Seu Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Preço Unitário: R$ {item.price.toFixed(2)}</p>
                  <p>Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="item-controls">
                  <div className="quantity-adjust">
                    <button onClick={() => adjustQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => adjustQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeItemFromCart(item.id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total do Carrinho: R$ {cartTotal.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};