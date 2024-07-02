// components/BlurToggle.js
import React from 'react';

const BlurToggle = ({ blur, setBlur }) => {
    return (
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Blur Effect</span>
            <input 
              type="checkbox" 
              checked={blur} 
              onChange={(e) => setBlur(e.target.checked)} 
              className="toggle toggle-primary" 
            />
          </label>
        </div>
      );
};

export default BlurToggle;