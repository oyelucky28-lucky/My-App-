import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    change?: string;
    changeType?: 'increase' | 'decrease';
    className?: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, change, changeType, className }) => {
    return (
        <div className={cn("bg-slate-800 p-6 rounded-lg shadow-md", className)}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-400">{title}</p>
                    <p className="text-2xl font-bold text-slate-50">{value}</p>
                </div>
                <div className="bg-indigo-500/20 text-indigo-400 p-3 rounded-full">
                    {icon}
                </div>
            </div>
            {change && (
                <p className="mt-2 text-xs text-slate-400 flex items-center">
                    <span className={cn('font-semibold', {
                        'text-green-500': changeType === 'increase',
                        'text-red-500': changeType === 'decrease',
                    })}>
                        {change}
                    </span>
                    <span className="ml-1">vs last month</span>
                </p>
            )}
        </div>
    );
};

export default Card;