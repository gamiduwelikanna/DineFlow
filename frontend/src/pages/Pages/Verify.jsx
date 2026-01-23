import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import './Verify.css'

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const { url, token, loadCartData, setCartItems } = React.useContext(StoreContext);
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');

  const verifyPayment = async () => {
    console.log('Starting verification...', { success, orderId });
    try {
      const response = await axios.get(url + '/api/order/verify', {
        params: { success, orderId }
      });
      console.log('Verification response:', response.data);
      
      if (response.data.success) {
        setMessage('Payment Verified! Redirecting...');
        console.log('Clearing cart...');
        // Clear cart immediately in frontend
        setCartItems({});
        // Wait a bit for backend to complete, then refresh cart data
        if (token) {
          await new Promise(resolve => setTimeout(resolve, 500));
          await loadCartData(token);
          console.log('Cart reloaded from backend');
        }
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setMessage('Payment Failed. Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error("Verification error:", error);
      setMessage('Verification Failed. Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      {message ? (
        <div>
          <h2>{message}</h2>
        </div>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  )
}

export default Verify