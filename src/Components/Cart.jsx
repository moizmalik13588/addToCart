import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeSingleItem, updateItemQuantity, selectCartItems, selectCartTotalPrice } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleRemoveItem = (id, uniqueId) => {
    dispatch(removeSingleItem({ id, uniqueId }));
  };

  const handleQuantityChange = (id, uniqueId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateItemQuantity({ id, uniqueId, newQuantity }));
    }
  };

  const incrementQuantity = (item) => {
    handleQuantityChange(item.id, item.uniqueId, item.quantity + 1);
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      handleQuantityChange(item.id, item.uniqueId, item.quantity - 1);
    }
  };

  return (
    <div className='container my-5'>
      {cartItems.length === 0 ? (
        <div className='text-center'>
          <h1>Your Cart is Empty</h1>
          <Link to="/" className="btn btn-warning">Continue Shopping...</Link>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.uniqueId} className='card mb-3 bg-dark text-light'>
              <div className='row g-0'>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                  <img
                    src={item.imgSrc}
                    className='img-fluid p-4'
                    alt={item.title}
                  />
                </div>
                <div className='col-md-8 d-flex justify-content-between align-items-center'>
                  <div className="card-body text-light text-center text-md-start">
                    <h5 className='card-title'>{item.title}</h5>
                    <p className='card-text'>{item.description}</p>
                    <div className='bu-main d-flex justify-content-center align-items-center'>
                      <button className='btn btn-primary my-1'>PKR {item.price}</button>
                      <button className="btn btn-warning my-1 mx-2">Buy Now</button>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.uniqueId)}
                        className="btn btn-danger my-1"
                      >
                        Remove
                      </button>
                    </div>
                    <div className='d-flex justify-content-center align-items-center mt-2'>
                      <label htmlFor={`quantity-${item.uniqueId}`} className='me-2'>Quantity:</label>
                      <button
                        onClick={() => decrementQuantity(item)}
                        className='btn btn-secondary'
                        style={{ padding: '0 10px' }}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id={`quantity-${item.uniqueId}`}
                        value={item.quantity}
                        min="1"
                        className='form-control text-center mx-2'
                        style={{ width: '60px', height: '30px' }}
                        onChange={(e) => handleQuantityChange(item.id, item.uniqueId, parseInt(e.target.value))}
                      />
                      <button
                        onClick={() => incrementQuantity(item)}
                        className='btn btn-secondary'
                        style={{ padding: '0 10px' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className='text-center mt-4'>
            <h3 className='prize'>Total Price: PKR {totalPrice}</h3>
            <button onClick={() => dispatch(clearCart())} className="btn btn-warning mt-3 mb-3">
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
