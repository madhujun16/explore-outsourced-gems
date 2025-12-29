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
    <div className={`absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-br from-indigo-50/30 to-blue-50/30 overflow-visible ${className}`}>
      <Lottie
        animationData={rippleAnimation}
        loop={loop}
        autoplay={autoplay}
        className="w-full h-full"
        style={{
          width: '100%',
          height: '100%',
          willChange: 'auto',
          transform: 'translateZ(0)',
          filter: 'brightness(1.2) saturate(1.5) opacity(1) contrast(1.3)',
          mixBlendMode: 'normal'
        }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid meet'
        }}
      />
    </div>
  );
};

export default LottieBackground;
