import React from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'

const Cart = () => {
  const {cartItems, food_list,removeFromCart} = React.useContext(StoreContext)
   
  return (
    <div className="cart">
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
        <div className="cart-bottom">
          <div className='cart-total'></div>
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Sub Total</p>
            <p>{0}</p>
          </div>
          <hr/>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{2}</p>
          </div>
          <hr/>
          <div className="cart-total-details">
            <b>Total</b>
            <b>{0}</b>
          </div>
          <button>Proceed to Checkout</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If you have a promocode, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='promocode'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart