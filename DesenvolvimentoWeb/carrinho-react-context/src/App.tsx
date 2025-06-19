import React, { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import { ProductList } from './components/ProductList/ProductList';
import { CartSummary } from './components/CartSummary/CartSummary';
import { CartPage } from './components/CartPage/CartPage';
import './App.css';

function App() {
  const [showCartPage, setShowCartPage] = useState(false);

  return (
    <CartProvider>
      <div className="App">
        <header className="App-header">
          <h1>Fatec E-Commerce</h1>
          <div className="header-controls">
            <CartSummary />
            <button className="nav-button" onClick={() => setShowCartPage(!showCartPage)}>
              {showCartPage ? 'Ver Produtos' : 'Ir para o Carrinho'}
            </button>
          </div>
        </header>
        <main>
          {showCartPage ? <CartPage /> : <ProductList />}
        </main>
      </div>
    </CartProvider>
  );
}

export default App;