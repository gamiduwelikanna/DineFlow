import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = ({setShowLogin}) => {

  const[menu,setMenu] = useState("menu");
  const[showMenu,setShowMenu] = useState(false);
  
  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className='logo'/></Link>
      <ul className={`navbar-menu ${showMenu ? 'active' : ''}`}>
        <Link to='/' onClick={()=>{setMenu("home"); setShowMenu(false);}} className={menu==="home"?"active":""}>home</Link>
        <a href='#explore-menu' onClick={()=>{setMenu("menu"); setShowMenu(false);}} className={menu==="menu"?"active":""}>menu</a>
        <a href='#app-download' onClick={()=>{setMenu("mobile-app"); setShowMenu(false);}} className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href='#footer' onClick={()=>{setMenu("contact"); setShowMenu(false);}} className={menu==="contact"?"active":""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt=""/>
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt=""/></Link>
          <div className="dot"></div>
        </div>
        <button onClick={()=>setShowLogin(true)}>Sign In</button>
        <div className={`hamburger ${showMenu ? 'active' : ''}`} onClick={()=>setShowMenu(!showMenu)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default Navbar