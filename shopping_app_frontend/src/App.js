import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';

/**
 * PUBLIC_INTERFACE
 * App
 * A lightweight app shell providing routing to all key pages
 * and rendering a persistent top navigation bar.
 */
function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} ShopLite</p>
      </footer>
    </div>
  );
}

export default App;
