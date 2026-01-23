import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Pages/verify'

const App = () => {

  const [showLoginPopup, setShowLoginPopup] = React.useState(false);
  
  return (
    <>
    {showLoginPopup? <LoginPopup setShowLogin={setShowLoginPopup} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLoginPopup} />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/place-order' element={<PlaceOrder/>}/>
          <Route path='/verify' element={<Verify/>}/>
          
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App