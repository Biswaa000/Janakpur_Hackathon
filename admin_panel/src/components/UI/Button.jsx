import React from 'react';
import { colors } from '../../utils/colors';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: `bg-${colors.primary[600]} text-white hover:bg-${colors.primary[700]} focus:ring-${colors.primary[500]}`,
    secondary: `bg-white text-${colors.primary[600]} border border-${colors.primary[300]} hover:bg-${colors.primary[50]} focus:ring-${colors.primary[200]}`,
    danger: `bg-${colors.status.danger} text-white hover:bg-red-600 focus:ring-red-500`,
    success: `bg-${colors.status.success} text-white hover:bg-sky-600 focus:ring-sky-500`,
    warning: `bg-${colors.status.warning} text-white hover:bg-amber-600 focus:ring-amber-500`,
    ghost: `bg-transparent text-${colors.primary[600]} hover:bg-${colors.primary[50]} focus:ring-${colors.primary[200]}`,
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;