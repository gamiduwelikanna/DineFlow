import React from 'react';
import { assets } from '../../assets/assets';

const Add = () => {
  return (
    <div className="add">
      <form className="flex-col">
        {/* Image Upload */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={assets.upload_area} alt="Upload Area" />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Product Name */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
