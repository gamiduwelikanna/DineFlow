import React from 'react'
import "./Orders.css"
import axios from 'axios'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const Orders = ({url}) => {
  const [orders, setOrders] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const fetchAllOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${url}/api/order/list`)
      if (response.data.success) {
        setOrders(response.data.orders)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      })
      if (response.data.success) {
        toast.success('Order status updated successfully')
        await fetchAllOrders()
      }
    } catch (error) {
      toast.error('Failed to update order status')
    }
  }

  React.useEffect(() => {
    fetchAllOrders()
  }, [])  
  
  if (loading) {
    return (
      <div className="order add">
        <div className="order-loading">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="order add">
      <div className="order-header">
        <h3>Order Page</h3>
        <p className="order-count">Total Orders: {orders.length}</p>
      </div>
      
      {orders.length === 0 ? (
        <div className="empty-state">
          <img src={assets.parcel_icon} alt="" />
          <h4>No Orders Yet</h4>
          <p>Orders will appear here once customers place them.</p>
        </div>
      ) : (
        <div className='order-list'>
          {orders.map((order,index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item,index)=>{
                    if (index===order.items.length-1) {
                      return item.name + " x " + item.quantity
                    }
                    else {
                      return item.name + " x " + item.quantity + ", "
                    }
                  })}
                </p>
                <p className='order-item-name'>{order.address.firstName} {order.address.lastName}</p>
                <div className='order-item-address'>
                  <p>{order.address.streetName},</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.zipCode}, {order.address.country}</p>
                </div>
                <p className='order-item-phone'>📞 {order.address.phoneNumber}</p>
                <p className='order-date'>🕐 {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}</p>
              </div>
              <p>Items: {order.items.reduce((total, item) => total + item.quantity, 0)}</p>
              <p>${order.amount.toFixed(2)}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Order Placed">Order Placed</option>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders