import React from 'react';
import Lottie from 'lottie-react';
import heroAnimation from '../assets/hero-animation-new.json';

interface LottieSideImageProps {
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieSideImage: React.FC<LottieSideImageProps> = ({ 
  className = '', 
  loop = true, 
  autoplay = true 
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Lottie
        animationData={heroAnimation}
        loop={loop}
        autoplay={autoplay}
        className="w-full h-full"
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default LottieSideImage;
