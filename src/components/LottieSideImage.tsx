import React from 'react';
import Lottie from 'lottie-react';
import heroAnimationData from '../assets/hero-animation-new.json';

interface LottieSideImageProps {
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

// Remove the unused lazy component since we're handling loading manually

const LottieSideImage: React.FC<LottieSideImageProps> = ({ 
  className = '', 
  loop = true, 
  autoplay = true 
}) => {
  // Use the animation data directly to avoid loading state flickering
  const animationData = heroAnimationData;

  if (!animationData) {
    return (
      <div className={`w-full h-full ${className} flex items-center justify-center`}>
        <div className="text-muted-foreground">Animation unavailable</div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full bg-gradient-to-br from-indigo-50/40 to-blue-50/40 rounded-lg ${className}`}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        className="w-full h-full"
        style={{
          width: '100%',
          height: '100%',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid meet'
        }}
      />
    </div>
  );
};

export default LottieSideImage;
