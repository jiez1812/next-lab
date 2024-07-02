import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { convertColorToHex } from '../utils/colorConversion';

const WallpaperFrame = styled.div`
  width: 100%; 
  height: 400px;
  overflow: hidden; // Hide blur overflow
`;

const WallpaperDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
     background: ${({ $color1, $color2, $color3, $transitionPosition1, $transitionPosition2, $gradientDirection }) => {
      if ($color3) {
        // Three-color gradient
        return `linear-gradient(${$gradientDirection}, 
          ${$color1}, 
          ${$color2} ${$transitionPosition1}%, 
          ${$color3} ${$transitionPosition2}%)`;
      } else {
        // Two-color gradient (Corrected)
        return `linear-gradient(${$gradientDirection}, ${$color1} ${$transitionPosition1}%, ${$color2})`;
      }
    }};
    z-index: -1;
    filter: ${({ $blur }) => ($blur ? 'blur(10px)' : 'none')};
  }
`;


const WallpaperPreview = ({
  color1,
  color2,
  color3,
  blur,
  transitionPosition1,
  transitionPosition2,
  gradientDirection,
}) => {
  const [convertedColor1, setConvertedColor1] = useState(color1);
  const [convertedColor2, setConvertedColor2] = useState(color2);
  const [convertedColor3, setConvertedColor3] = useState(color3);

  useEffect(() => {
    setConvertedColor1(convertColorToHex(color1));
    setConvertedColor2(convertColorToHex(color2));
    if (color3) {
      setConvertedColor3(convertColorToHex(color3));
    }
  }, [color1, color2, color3]);

  return (
    <WallpaperFrame>
      <WallpaperDiv
        $color1={convertedColor1}
        $color2={convertedColor2}
        $color3={color3 ? convertedColor3 : null}
        $blur={blur}
        $transitionPosition1={transitionPosition1}
        $transitionPosition2={transitionPosition2}
        $gradientDirection={gradientDirection}
      />
    </WallpaperFrame>
  );
};

export default WallpaperPreview;