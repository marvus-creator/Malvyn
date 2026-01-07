
import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, className = "", icon }) => {
  return (
    <div className={`bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 transition-colors duration-300 ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-6">
          {icon && <div className="text-blue-600 dark:text-blue-400">{icon}</div>}
          {title && <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  );
};
