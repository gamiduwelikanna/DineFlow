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

      </div>
    </div>
  )
}

export default Cart