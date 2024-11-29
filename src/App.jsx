import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Product from './Components/Product';
import Cart from './Components/Cart';
import './App.css';

function App() {
  const currentTheme = localStorage.getItem('currentTheme');
  const [theme, setTheme] = useState(currentTheme ? currentTheme : 'light');
  const [showCartIcon, setShowCartIcon] = useState(false);

  useEffect(() => {
    localStorage.setItem('currentTheme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className={`containr ${theme}`}>
        <NavBar theme={theme} setTheme={setTheme} showCartIcon={showCartIcon} />
        <Routes>
          <Route path="/" element={<Product setShowCartIcon={setShowCartIcon} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:category" element={<Product setShowCartIcon={setShowCartIcon} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
