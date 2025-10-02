import React from 'react';
import logoImage from '@/assets/novalsquad-logo.png';

interface NovalSquadLogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const NovalSquadLogo: React.FC<NovalSquadLogoProps> = ({ 
  className = '', 
  showTagline = false, 
  variant = 'light',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-16',
    md: 'h-20',
    lg: 'h-24'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoImage} 
        alt="NovalSquad Logo" 
        className={`${sizeClasses[size]} hover:scale-105 transition-transform duration-200 object-contain`}
      />
    </div>
  );
};

export default NovalSquadLogo;
