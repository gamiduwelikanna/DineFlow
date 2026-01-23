import React from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const {getTotalCartAmount,token, food_list, cartItems, url} = React.useContext(StoreContext);
  const navigate = useNavigate();

  const[data,setData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    streetName: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  })

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setData({...data, [name]: value});
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    console.log(orderItems);
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }
    try {
      let response = await axios.post(url + "/api/order/place", orderData, {headers: {token}});
      if (response.data.success) {
        const {session_url} = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Failed to process order. Please try again.");
    }
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input name='firstName' onChange={changeHandler} value={data.firstName} type="text" placeholder='First Name' required />
          <input name='lastName' onChange={changeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
        </div>
        <input name='email' onChange={changeHandler} value={data.email} type='email' placeholder='Email' required />
        <input name='phoneNumber' onChange={changeHandler} value={data.phoneNumber} type='text' placeholder='Phone Number' required />
        <input name='streetName' onChange={changeHandler} value={data.streetName} type='text' placeholder='Street Name' required />
        <div className='multi-fields'>
          <input name='city' onChange={changeHandler} value={data.city} type='text' placeholder='City' required />
          <input name='state' onChange={changeHandler} value={data.state} type='text' placeholder='State' required />
        </div>
        <div className='multi-fields'>
          <input name='zipCode' onChange={changeHandler} value={data.zipCode} type='text' placeholder='Zip Code' required />
          <input name='country' onChange={changeHandler} value={data.country} type='text' placeholder='Country' required />
        </div>
      </div>
      <div className="place-order-right">
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
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder