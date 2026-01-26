import React from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const MyOrders = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const {url, token} = React.useContext(StoreContext);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`${url}/api/order/userOrders`, {}, {headers: {token}});
                if (response.data.success) {
                    setData(response.data.orders);
                } else {
                    console.error("Failed to fetch orders");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        }
        
        if (token) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [token, url]);

  if (loading) {
    return (
      <div className='my-orders'>
        <div className="my-orders-loading">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      {data.length === 0 ? (
        <div className="my-orders-empty">
          <h3>No Orders Yet</h3>
          <p>You haven't placed any orders yet. Start exploring our menu!</p>
        </div>
      ) : (
        <div className='container'>
          {data.map((order, index) => (
            <div key={index} className='my-orders-order'>
              <p>{order.items.map((item, idx) => {
                if (idx === order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + ", ";
                }
              })}</p>
              <p>${order.amount.toFixed(2)}</p>
              <p>Items: {order.items.reduce((total, item) => total + item.quantity, 0)}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button>Track Order</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders