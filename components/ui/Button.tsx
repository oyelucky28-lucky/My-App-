
import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    leftIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', leftIcon, children, ...props }, ref) => {
        const baseClasses = "inline-flex items-center justify-center rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200";

        const variantClasses = {
            primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
            secondary: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500',
            danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
            ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-indigo-500',
        };

        const sizeClasses = {
            sm: 'px-3 py-1.5 text-xs',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base',
        };

        return (
            <button
                className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
                ref={ref}
                {...props}
            >
                {leftIcon && <span className="mr-2 -ml-1 h-5 w-5">{leftIcon}</span>}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
