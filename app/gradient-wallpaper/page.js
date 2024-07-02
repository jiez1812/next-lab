'use client';
import { useState, useRef, useEffect } from 'react';
import ColorPicker from '../components/ColorPicker';
import WallpaperPreview from '../components/WallpaperPreview';
import BlurToggle from '../components/BlurToggle';
import DownloadButton from '../components/DownloadButton';

export default function Home() {
  // Color States
  const [color1, setColor1] = useState('#ff0000');
  const [color2, setColor2] = useState('#00ff00');
  const [color3, setColor3] = useState('');
  const [useThirdColor, setUseThirdColor] = useState(false);

  // Gradient States
  const [transitionPosition1, setTransitionPosition1] = useState(33);
  const [transitionPosition2, setTransitionPosition2] = useState(67);
  const [gradientDirection, setGradientDirection] = useState('to right');

  // Effect States
  const [blur, setBlur] = useState(false);

  // Download Dimensions 
  const [downloadWidth, setDownloadWidth] = useState(1920); // Fallback default
  const [downloadHeight, setDownloadHeight] = useState(1080); // Fallback default

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDownloadWidth(window.screen.width);
      setDownloadHeight(window.screen.height);
    }
  }, []);

  // Ref for Wallpaper Preview
  const wallpaperRef = useRef(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Custom Gradient Wallpaper Maker
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Controls Section */}
        <div>
          {/* Color Inputs */}
          <ColorPicker label="Color 1" color={color1} setColor={setColor1} />
          <ColorPicker label="Color 2" color={color2} setColor={setColor2} />

          {/* Third Color Toggle and Input */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Use Third Color</span>
              <input
                type="checkbox"
                checked={useThirdColor}
                onChange={(e) => setUseThirdColor(e.target.checked)}
                className="toggle toggle-primary"
              />
            </label>
          </div>
          {useThirdColor && (
            <ColorPicker label="Color 3" color={color3} setColor={setColor3} />
          )}

          {/* Transition Position Sliders */}
          <div className="form-control">
            <label htmlFor="transition-position-1" className="label">
              <span className="label-text">Transition Position 1</span>
            </label>
            <input
              id="transition-position-1"
              type="range"
              min="0"
              max="100"
              value={transitionPosition1}
              onChange={(e) => setTransitionPosition1(parseInt(e.target.value, 10))}
              className="range range-primary"
            />
            <span className="text-sm">{transitionPosition1}%</span>
          </div>

          {useThirdColor && (
            <div className="form-control">
              <label htmlFor="transition-position-2" className="label">
                <span className="label-text">Transition Position 2</span>
              </label>
              <input
                id="transition-position-2"
                type="range"
                min="0"
                max="100"
                value={transitionPosition2}
                onChange={(e) => setTransitionPosition2(parseInt(e.target.value, 10))}
                className="range range-primary"
              />
              <span className="text-sm">{transitionPosition2}%</span>
            </div>
          )}

          {/* Gradient Direction Dropdown */}
          <div className="form-control">
            <label htmlFor="gradient-direction" className="label">
              <span className="label-text">Gradient Direction</span>
            </label>
            <select
              id="gradient-direction"
              value={gradientDirection}
              onChange={(e) => setGradientDirection(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="to right">Horizontal (Left to Right)</option>
              <option value="to left">Horizontal (Right to Left)</option>
              <option value="to bottom">Vertical (Top to Bottom)</option>
              <option value="to top">Vertical (Bottom to Top)</option>
              <option value="to top right">Diagonal (Top Left to Bottom Right)</option>
              <option value="to bottom right">Diagonal (Top Right to Bottom Left)</option>
            </select>
          </div>

          {/* Blur Toggle */}
          <BlurToggle blur={blur} setBlur={setBlur} />
        </div>

        {/* Wallpaper Preview Section */}
        <div className="relative"> 
          <div ref={wallpaperRef}>
            <WallpaperPreview
              color1={color1}
              color2={color2}
              color3={useThirdColor ? color3 : null}
              blur={blur}
              transitionPosition1={transitionPosition1}
              transitionPosition2={transitionPosition2}
              gradientDirection={gradientDirection}
            />
          </div>
          {/* Download Button */}
          <div className="absolute bottom-4 right-4">
            <DownloadButton
              wallpaperRef={wallpaperRef}
              blur={blur}
              downloadWidth={downloadWidth}
              downloadHeight={downloadHeight}
            />
          </div>
        </div>
      </div>

      {/* Download Dimensions (Moved outside) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"> 
        <div className="form-control">
          <label htmlFor="download-width" className="label">
            <span className="label-text">Download Width (px)</span>
          </label>
          <input
            type="number"
            id="download-width"
            value={downloadWidth}
            onChange={(e) => setDownloadWidth(parseInt(e.target.value, 10) || 0)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label htmlFor="download-height" className="label">
            <span className="label-text">Download Height (px)</span>
          </label>
          <input
            type="number"
            id="download-height"
            value={downloadHeight}
            onChange={(e) => setDownloadHeight(parseInt(e.target.value, 10) || 0)}
            className="input input-bordered w-full"
          />
        </div>
      </div>
    </div>
  );
}