// utils/colorConversion.js
export function convertColorToHex(color) {
    // Create a dummy element to apply the color
    const el = document.createElement('div');
    el.style.color = color;
    document.body.appendChild(el);
  
    // Get the computed RGB value
    const rgbColor = window.getComputedStyle(el).color;
  
    // Remove the dummy element
    document.body.removeChild(el);
  
    // Convert RGB to Hex
    const rgbValues = rgbColor.match(/\d+/g);
    if (rgbValues) {
      return (
        '#' +
        ((1 << 24) + (parseInt(rgbValues[0]) << 16) + (parseInt(rgbValues[1]) << 8) + parseInt(rgbValues[2]))
          .toString(16)
          .slice(1)
      );
    }
    return color;
  }