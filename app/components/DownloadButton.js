// components/DownloadButton.js
import React from 'react';
import html2canvas from 'html2canvas-pro';

const DownloadButton = ({ wallpaperRef, blur, downloadWidth, downloadHeight }) => {
  const downloadImage = async () => {
    const canvas = await html2canvas(wallpaperRef.current);

    // Create an off-screen canvas with the desired dimensions
    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = downloadWidth;
    resizedCanvas.height = downloadHeight;

    // Get the 2D context of the resized canvas
    const resizedCtx = resizedCanvas.getContext('2d');

    // Apply blur to the resized canvas context
    if (blur) {
      resizedCtx.filter = 'blur(10px)';
    }

    // Draw the original canvas onto the resized canvas
    resizedCtx.drawImage(canvas, 0, 0, downloadWidth, downloadHeight); 

    // Create the download link using the resized canvas
    const link = document.createElement('a');
    link.href = resizedCanvas.toDataURL('image/png');
    link.download = 'wallpaper.png';
    link.click();
  };

  return (
    <button onClick={downloadImage} className="btn btn-primary">
      Download Wallpaper
    </button>
  );
};

export default DownloadButton;