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
  const [verified, setVerified] = React.useState(false);

  const verifyPayment = async () => {
    if (verified) return; // Prevent multiple calls
    
    console.log('Starting verification...', { success, orderId });
    try {
      const response = await axios.get(url + '/api/order/verify', {
        params: { success, orderId }
      });
      console.log('Verification response:', response.data);
      
      if (response.data.success) {
        setVerified(true);
        setMessage('Payment Verified! Redirecting...');
        console.log('Clearing cart...');
        // Clear cart immediately in frontend
        setCartItems({});
        // Wait a bit for backend to complete, then refresh cart data
        try {
          if (token && loadCartData) {
            await new Promise(resolve => setTimeout(resolve, 500));
            await loadCartData(token);
            console.log('Cart reloaded from backend');
          } else {
            console.log('No token available, skipping cart reload');
          }
        } catch (cartError) {
          console.error('Error reloading cart:', cartError);
        }
        
        // Navigate after a delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Navigating to /myorders');
        navigate('/myorders', { replace: true });
      } else {
        setMessage('Payment Failed. Redirecting...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error("Verification error:", error);
      setMessage('Verification Failed. Redirecting...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      navigate('/', { replace: true });
    }
  }

  useEffect(() => {
    if (success && orderId && !verified) {
      verifyPayment();
    }
  }, [success, orderId]);

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