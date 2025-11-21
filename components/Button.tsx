import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-3 font-mono font-bold text-sm md:text-base transition-all duration-200 border-2 border-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
  
  const variants = {
    primary: "bg-neo-yellow hover:bg-yellow-400 text-black shadow-neo hover:shadow-neo-lg",
    secondary: "bg-neo-blue hover:bg-blue-400 text-white shadow-neo hover:shadow-neo-lg",
    outline: "bg-white hover:bg-gray-50 text-black shadow-neo hover:shadow-neo-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};