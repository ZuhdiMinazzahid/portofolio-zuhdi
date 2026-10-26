import React from 'react';

/**
 * Reusable Card Component
 * @param {'default' | 'elevated' | 'glass' | 'interactive'} variant
 */
export default function Card({
  children,
  className = '',
  variant = 'default',
  hoverEffect = false,
  padding = 'default',
  onClick,
  ...props
}) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    default: 'p-6 sm:p-7',
    lg: 'p-8 sm:p-10',
  };

  const variantStyles = {
    default: 'bg-dark-900/90 border border-white/10',
    elevated: 'bg-dark-850 border border-white/10 shadow-xl',
    glass: 'bg-dark-900/60 backdrop-blur-xl border border-white/10',
    interactive:
      'bg-dark-900/80 backdrop-blur-md border border-white/10 hover:border-brand-accent/50 hover:shadow-glow transition-all duration-300 cursor-pointer',
  };

  const hoverClasses = hoverEffect
    ? 'hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-glow transition-all duration-300'
    : '';

  return (
    <div
      className={`rounded-2xl relative overflow-hidden ${variantStyles[variant] || variantStyles.default} ${
        paddingStyles[padding] || paddingStyles.default
      } ${hoverClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
