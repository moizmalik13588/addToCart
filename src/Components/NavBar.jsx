import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo_light from '../assets/logo-black.png';  // Optional, if you want to keep logo references
import logo_dark from '../assets/logo-white.png';  // Optional
// Removed the imports related to theme toggle
import { selectCartItems } from '../redux/cartSlice';

const NavBar = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const cartItems = useSelector(selectCartItems);
  const [showCartButton, setShowCartButton] = useState(false);

  const menuToggle = () => {
    const menuItems = document.getElementById("menu-options");
    if (menuItems) {
      menuItems.classList.toggle('open');
    } else {
      console.error('Element with ID "menu-options" not found');
    }
  };

  const handleLinkClick = (category) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      setShowCartButton(true);
    } else {
      setShowCartButton(false);
    }
  }, [cartItems]);

  return (
    <div className="navbar sticky-top">
      <div>
        <Link 
          to="/" 
          className="left" 
          style={{ textDecoration: 'none', color: 'inherit' }}
          onClick={() => setActiveCategory('')}
        >
          <h3>Shoppy</h3>
        </Link>
      </div>
      {/* <div id="menu-options" className="middle d-flex align-items-center justify-content-center gap-5">
        <Link
          to="/category/apple"
          className="options ms-3"
          style={{
            textDecoration: 'none',
            color: activeCategory === 'apple' ? '#007bff' : 'inherit',
            fontWeight: activeCategory === 'apple' ? 'bold' : 'normal',
          }}
          onClick={() => handleLinkClick('apple')}
        >
          <h5>Apple</h5>
        </Link>
        <Link
          to="/category/samsung"
          className="options ms-3"
          style={{
            textDecoration: 'none',
            color: activeCategory === 'samsung' ? '#007bff' : 'inherit',
            fontWeight: activeCategory === 'samsung' ? 'bold' : 'normal',
          }}
          onClick={() => handleLinkClick('samsung')}
        >
          <h5>Samsung</h5>
        </Link>
        <Link
          to="/category/huawei"
          className="options ms-3"
          style={{
            textDecoration: 'none',
            color: activeCategory === 'huawei' ? '#007bff' : 'inherit',
            fontWeight: activeCategory === 'huawei' ? 'bold' : 'normal',
          }}
          onClick={() => handleLinkClick('huawei')}
        >
          <h5>Huawei</h5>
        </Link>
      </div> */}

      <div className="right">
        <Link to="/cart">
          <button
            type="button"
            className={`btn btn-primary position-relative ms-3 cart-button ${showCartButton ? 'show' : ''}`}
          >
            <span className="material-symbols-outlined">
              shopping_bag
            </span>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartItems.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </Link>
        <span onClick={menuToggle} className="menu material-symbols-outlined">
          menu
        </span>
      </div>
    </div>
  );
};

export default NavBar;
