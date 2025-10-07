import React from 'react';
import Lottie from 'lottie-react';
import rippleAnimation from '../assets/ripple-animation.json';

interface LottieBackgroundProps {
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieBackground: React.FC<LottieBackgroundProps> = ({ 
  className = '', 
  loop = true, 
  autoplay = true 
}) => {
  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <Lottie
        animationData={rippleAnimation}
        loop={loop}
        autoplay={autoplay}
        className="w-full h-full object-cover"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
};

export default LottieBackground;
