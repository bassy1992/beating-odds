import React from 'react';

interface FoundationLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const FoundationLogo: React.FC<FoundationLogoProps> = ({
  size = 'md',
  showText: _showText = true,
  className = '',
}) => {
  const logoSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  return <img src="/assets/logo6.jpeg" alt="Beating Odds Foundation" className={`${logoSizes[size]} object-contain shrink-0 ${className}`} id="foundation-brand-logo" />;
};
