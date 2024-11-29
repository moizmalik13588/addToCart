import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart, selectCartItems } from '../redux/cartSlice';

const Product = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);  // Assuming data.products contains the product array
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (item) => {
    const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);
  
    if (itemInCart) {
      setMessage("Item already added to the cart!!!");
      setTimeout(() => setMessage(''), 3000); 
    } else {
      const uniqueId = '_' + Math.random().toString(36).substr(2, 9);
      
      // Ensure the image URL is valid before using startsWith
      const imageUrl = item.image && item.image.startsWith('http') 
        ? item.image 
        : `https://dummyjson.com${item.image}`;  // Fallback URL if image is not an absolute URL
  
      // Round the price to two decimal places
      const price = Math.round(item.price * 100) / 100;
  
      const product = {
        id: item.id,
        title: item.title,
        description: item.description,
        price,  // Use the rounded price
        imgSrc: item.thumbnail,  // Use the sanitized image URL
        quantity: 1,
        uniqueId,
      };
  
      dispatch(addToCart(product));  // Dispatch action to add to cart
      setMessage("Item added to the cart!!!");
      setTimeout(() => setMessage(''), 3000);  
    }
  };
  
  
  const filteredProducts = category
    ? products.filter(product => product.category.toLowerCase() === category.toLowerCase())
    : products;

  return (
    <div className="container my-3">
      {message && <div className="alert alert-info text-center sticky-top">{message}</div>}
      <div className="row">
        {filteredProducts.map((item) => (
          <div key={item.id} className='col-md-6 col-lg-4 mb-5'>
            <div className='card bg-dark' style={{ width: '18rem' }}>
              <div className='p-3 d-flex justify-content-center align-items-center'>
                <img src={item.thumbnail} className='card-img-top' alt={item.title} style={{ width: '200px', height: '200px', borderRadius: '10px' }} />
              </div>
              <div className='card-body text-light text-center'>
                <h5 className='card-title'>{item.title}</h5>
                <p className='card-text'>{item.description}</p>
                <button className="btn btn-primary price">PKR {item.price}</button>
                <button onClick={() => handleAddToCart(item)} className="btn btn-warning mx-1 blue">Add To Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
