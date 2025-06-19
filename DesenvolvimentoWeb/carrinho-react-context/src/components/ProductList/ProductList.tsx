import React, { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { productList } from '../../data/products';
import './styles.css';

export const ProductList = () => {
  const context = useContext(CartContext);
  const [feedback, setFeedback] = useState<string>('');

  if (!context) {
    throw new Error('ProductList deve ser usado dentro de um CartProvider');
  }

  const { addItemToCart } = context;

  const handleAddToCart = (product: typeof productList[0]) => {
    addItemToCart(product);
    setFeedback(`"${product.name}" foi adicionado ao carrinho!`);
    setTimeout(() => setFeedback(''), 2000); // Limpa a mensagem após 2 segundos
  };

  return (
    <div className="product-list-container">
      <h2>Nossos Produtos</h2>
      {feedback && <div className="feedback-message">{feedback}</div>}
      <div className="product-grid">
        {productList.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Preço: R$ {product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>
    </div>
  );
};