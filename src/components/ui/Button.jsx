import React from 'react';

/**
 * Reusable Button Component following Stitch design system
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'light'} variant
 * @param {'sm' | 'md' | 'lg'} size
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  onClick,
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  target,
  rel,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-container/50 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-primary-container text-on-secondary-fixed shadow-md hover:bg-primary-fixed-dim hover:shadow-mustard-btn hover:-translate-y-0.5',
    secondary:
      'bg-[#18181B] text-white shadow-sm hover:bg-[#2A2A2E] hover:-translate-y-0.5',
    outline:
      'bg-transparent border border-outline-variant text-on-surface hover:bg-surface-container-high',
    light:
      'bg-[#F3F3F5] text-[#1F1F24] hover:bg-[#E5E5E8] font-semibold',
    ghost:
      'bg-transparent text-secondary hover:text-white hover:bg-surface-container-high/40',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}
