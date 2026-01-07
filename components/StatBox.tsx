
import React from 'react';

interface StatBoxProps {
  label: string;
  value: string;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'blue' | 'green' | 'red' | 'orange';
}

export const StatBox: React.FC<StatBoxProps> = ({ label, value, subtext, trend, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    red: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
    orange: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors duration-300">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</p>
        <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h4>
      </div>
      {subtext && (
        <div className="mt-3 flex items-center gap-1">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colorClasses[color]}`}>
            {subtext}
          </span>
        </div>
      )}
    </div>
  );
};
