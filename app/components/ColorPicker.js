// components/ColorPicker.js
import React from 'react';

const ColorPicker = ({ label, color, setColor }) => {
    return (
        <div className="form-control mb-2">
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
          <input 
            type="color" 
            value={color} 
            onChange={(e) => setColor(e.target.value)} 
            className="input input-bordered w-full"
          />
        </div>
      );
};

export default ColorPicker;