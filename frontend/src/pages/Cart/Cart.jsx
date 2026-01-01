import React from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {cartItems, food_list, removeFromCart, getTotalCartAmount} = React.useContext(StoreContext)
   
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = () => {
    if (getTotalCartAmount() > 0) {
      navigate('/place-order');
    } else {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    <div className="cart">
      {showMessage && (
        <div className="cart-empty-message">
          Your cart is empty. Add items to proceed!
        </div>
      )}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr/>
        <br/>
        {food_list.map((food) => {
          if (cartItems[food._id] > 0) {
            return (
              <div key={food._id} className="cart-items-title cart-items-item">
                <img src={food.image} alt={food.name} className="cart-item-image" />
                <p className="cart-item-title">{food.name}</p>
                <p className="cart-item-price">${food.price.toFixed(2)}</p>
                <p className="cart-item-quantity">{cartItems[food._id]}</p>
                <p className="cart-item-total">${(food.price * cartItems[food._id]).toFixed(2)}</p>
                <button className="cart-item-remove" onClick={() => removeFromCart(food._id)}>Remove</button>
              </div>
            )
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart