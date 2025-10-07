import React, { useState, useEffect, Suspense } from 'react';
import Lottie from 'lottie-react';

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
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load animation data when component mounts
    import('../assets/hero-animation-new.json')
      .then(data => {
        setAnimationData(data.default);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Failed to load animation:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className={`w-full h-full ${className} flex items-center justify-center`}>
        <div className="animate-pulse bg-gradient-to-r from-violet-200 to-purple-200 rounded-lg w-full h-full flex items-center justify-center">
          <div className="text-violet-600 font-medium">Loading animation...</div>
        </div>
      </div>
    );
  }

  if (!animationData) {
    return (
      <div className={`w-full h-full ${className} flex items-center justify-center`}>
        <div className="text-muted-foreground">Animation unavailable</div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Lottie
        animationData={animationData}
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
