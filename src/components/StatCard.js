import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  const colorClasses = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger'
  };

  return (
    <div className="card group hover:border-primary/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-secondary text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{value}</p>
          <div className="flex items-center space-x-1 mt-2">
            {changeType === 'positive' ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-danger" />
            )}
            <span className={`text-sm font-medium ${
              changeType === 'positive' ? 'text-success' : 'text-danger'
            }`}>
              {change}
            </span>
            <span className="text-text-muted text-sm">vs 上月</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${color}/10 to-${color}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard; 