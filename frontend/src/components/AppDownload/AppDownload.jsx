import React from 'react'
import "./AppDownload.css"
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className="app-download" id='app-download'>
        <p>Download DineFlow App for the best experience!</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
        <p className='app-download-text'>Experience the convenience of ordering your favorite meals on the go with the DineFlow mobile app. Download now and enjoy exclusive app-only offers!</p>
    </div>
  )
}

export default AppDownload