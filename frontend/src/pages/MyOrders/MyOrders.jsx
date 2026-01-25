import React from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const MyOrders = () => {
    const [data, setData] = React.useState([]);
    const {url, token} = React.useContext(StoreContext);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.post(`${url}/api/order/userOrders`, {}, {headers: {token}});
                if (response.data.success) {
                    setData(response.data.orders);
                } else {
                    console.error("Failed to fetch orders");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
        
        if (token) {
            fetchOrders();
        }
    }, [token, url]);

    React.useEffect(() => {
        console.log('Fetched orders:', data);
    }, [data]); 

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
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
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders