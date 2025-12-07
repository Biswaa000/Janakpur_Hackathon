import React from 'react';
import { colors } from '../../utils/colors';

const Card = ({ children, className = '', padding = true, variant = 'default' }) => {
  const variants = {
    default: `bg-${colors.bg.card} `,
    elevated: `bg-${colors.bg.card}  shadow-lg`,
    subtle: `bg-${colors.bg.secondary}`,
  };
  
  return (
    <div 
      className={`
        rounded-xl shadow-sm
        ${variants[variant]}
        ${padding ? 'p-6' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;